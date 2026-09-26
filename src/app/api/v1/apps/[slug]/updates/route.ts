import { NextRequest, NextResponse } from 'next/server';
import { getLatestRelease } from '@/lib/store';
import { formatBytes } from '@/lib/data';
import { AppPlatform } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const versionCodeParam = searchParams.get('version_code');
    const platformParam = (searchParams.get('platform') || 'android') as AppPlatform;

    if (!versionCodeParam) {
      return NextResponse.json(
        { error: "El parámetro query 'version_code' es requerido (ej: ?version_code=10)" },
        { status: 400 }
      );
    }

    const currentVersionCode = parseInt(versionCodeParam, 10);
    if (isNaN(currentVersionCode)) {
      return NextResponse.json(
        { error: "El parámetro 'version_code' debe ser un número entero válido" },
        { status: 400 }
      );
    }

    const result = await getLatestRelease(slug, platformParam);

    if (!result || !result.app) {
      return NextResponse.json(
        { error: `No se encontró la aplicación con slug '${slug}'` },
        { status: 404 }
      );
    }

    const { app, release } = result;

    if (!release) {
      return NextResponse.json(
        { error: `No hay versiones disponibles para la plataforma '${platformParam}'` },
        { status: 404 }
      );
    }

    const origin = request.nextUrl.origin;
    const hasUpdate = currentVersionCode < release.version_code;

    if (hasUpdate) {
      return NextResponse.json({
        has_update: true,
        is_critical: Boolean(release.is_critical),
        latest_version: release.version_name,
        latest_version_code: release.version_code,
        current_version_code: currentVersionCode,
        download_url: `${origin}/api/v1/download/${release.id}`,
        direct_apk_url: release.apk_file_url,
        store_url: platformParam === 'ios' ? app.app_store_url : app.play_store_url,
        file_size: formatBytes(release.apk_size_bytes),
        min_os_version: release.min_os_version,
        published_at: release.published_at,
        changelog: release.changelog
      });
    }

    return NextResponse.json({
      has_update: false,
      is_critical: false,
      latest_version: release.version_name,
      latest_version_code: release.version_code,
      current_version_code: currentVersionCode,
      message: "La aplicación ya cuenta con la versión más reciente."
    });

  } catch (error) {
    console.error('Error procesando update check:', error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la actualización" },
      { status: 500 }
    );
  }
}
