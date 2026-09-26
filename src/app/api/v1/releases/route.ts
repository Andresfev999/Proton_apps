import { NextRequest, NextResponse } from 'next/server';
import { addRelease } from '@/lib/store';
import { AppPlatform } from '@/types/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      app_id,
      version_name,
      version_code,
      platform,
      changelog,
      apk_file_url,
      apk_size_bytes,
      min_os_version,
      is_critical
    } = body;

    if (!app_id || !version_name || !version_code || !changelog || !apk_file_url) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos (app_id, version_name, version_code, changelog, apk_file_url)' },
        { status: 400 }
      );
    }

    const newRelease = await addRelease({
      app_id,
      version_name,
      version_code: parseInt(version_code, 10),
      platform: (platform || 'android') as AppPlatform,
      changelog,
      apk_file_url,
      apk_size_bytes: parseInt(apk_size_bytes, 10) || 20971520, // 20 MB por defecto
      min_os_version: min_os_version || 'Android 8.0 (API 26)',
      is_critical: Boolean(is_critical)
    });

    return NextResponse.json({ release: newRelease }, { status: 201 });
  } catch (error) {
    console.error('Error registrando release:', error);
    return NextResponse.json({ error: 'Error al publicar la versión' }, { status: 500 });
  }
}
