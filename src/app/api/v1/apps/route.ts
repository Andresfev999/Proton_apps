import { NextRequest, NextResponse } from 'next/server';
import { getApps, addApp } from '@/lib/store';
import { AppCategory, AppPlatform } from '@/types/database';

export async function GET() {
  try {
    const apps = await getApps();
    return NextResponse.json({ apps });
  } catch (error) {
    console.error('Error obteniendo apps:', error);
    return NextResponse.json({ error: 'Error al obtener aplicaciones' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      slug,
      name,
      tagline,
      description,
      icon_url,
      cover_image_url,
      category,
      package_name,
      platforms,
      play_store_url,
      app_store_url,
      github_url,
      status
    } = body;

    if (!slug || !name || !tagline || !description || !icon_url || !package_name) {
      return NextResponse.json(
        { error: 'Campos requeridos incompletos (slug, name, tagline, description, icon_url, package_name son obligatorios)' },
        { status: 400 }
      );
    }

    const newApp = await addApp({
      slug: slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
      name,
      tagline,
      description,
      icon_url,
      cover_image_url: cover_image_url || undefined,
      category: (category || 'Productividad') as AppCategory,
      package_name,
      platforms: (platforms && platforms.length > 0) ? platforms : ['android'] as AppPlatform[],
      play_store_url: play_store_url || undefined,
      app_store_url: app_store_url || undefined,
      github_url: github_url || undefined,
      status: status || 'published'
    });

    return NextResponse.json({ app: newApp }, { status: 201 });
  } catch (error) {
    console.error('Error creando app:', error);
    return NextResponse.json({ error: 'Error al registrar la aplicación' }, { status: 500 });
  }
}
