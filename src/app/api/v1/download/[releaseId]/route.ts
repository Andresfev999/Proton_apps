import { NextRequest, NextResponse } from 'next/server';
import { getReleaseById, incrementDownload } from '@/lib/store';

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

    // Determinar URL absoluta para la redirección (compatible con CDN externa o archivo local en public/)
    const targetUrl = release.apk_file_url.startsWith('http://') || release.apk_file_url.startsWith('https://')
      ? release.apk_file_url
      : new URL(release.apk_file_url, request.url).toString();

    // Redirección HTTP 307 al archivo APK
    return NextResponse.redirect(targetUrl, {
      status: 307
    });

  } catch (error) {
    console.error('Error procesando descarga:', error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la descarga" },
      { status: 500 }
    );
  }
}
