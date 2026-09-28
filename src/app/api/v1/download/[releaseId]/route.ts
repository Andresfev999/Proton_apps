import { NextRequest, NextResponse } from 'next/server';
import { getReleaseById, incrementDownload } from '@/lib/store';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ releaseId: string }> }
) {
  try {
    const { releaseId } = await params;
    const result = await getReleaseById(releaseId);

    if (!result || !result.release) {
      return NextResponse.json(
        { error: `Versión con id '${releaseId}' no encontrada` },
        { status: 404 }
      );
    }

    const { release } = result;

    // Incrementar conteo de descargas de forma atómica
    await incrementDownload(release.id);

    const searchParams = request.nextUrl.searchParams;
    const redirectParam = searchParams.get('redirect');

    if (redirectParam === 'false') {
      return NextResponse.json({
        success: true,
        download_url: release.apk_file_url,
        version_name: release.version_name,
        version_code: release.version_code
      });
    }

    // Si es una URL externa completa (https://...)
    if (release.apk_file_url.startsWith('http://') || release.apk_file_url.startsWith('https://')) {
      return NextResponse.redirect(release.apk_file_url, { status: 307 });
    }

    // Si es un archivo APK local (ej. /apps/downloads/cotipro-v1.0.0.apk o /downloads/cotipro-v1.0.0.apk)
    const cleanRelativePath = release.apk_file_url.replace(/^\/apps/, '').replace(/^\//, '');
    const filePath = path.join(process.cwd(), 'public', cleanRelativePath.replace(/^public\//, ''));

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const filename = path.basename(filePath);
      const fileStream = fs.createReadStream(filePath);

      // Conversión a ReadableStream Web estándar
      const webStream = new ReadableStream({
        start(controller) {
          fileStream.on('data', (chunk) => controller.enqueue(chunk));
          fileStream.on('end', () => controller.close());
          fileStream.on('error', (err) => controller.error(err));
        },
        cancel() {
          fileStream.destroy();
        }
      });

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.android.package-archive',
          'Content-Length': stats.size.toString(),
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // Fallback: Redirección estándar
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'protondev.space';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('192.168.');
    const proto = isLocal ? 'http' : 'https';
    const origin = `${proto}://${host}`;
    const pathWithBase = release.apk_file_url.startsWith('/apps')
      ? release.apk_file_url
      : `/apps${release.apk_file_url.startsWith('/') ? '' : '/'}${release.apk_file_url}`;
    
    return NextResponse.redirect(`${origin}${pathWithBase}`, { status: 307 });

  } catch (error) {
    console.error('Error procesando descarga:', error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la descarga" },
      { status: 500 }
    );
  }
}
