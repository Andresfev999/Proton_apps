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
      status,
      developer_email,
      developer_name,
      submission_notes
    } = body;

    if (!slug || !name || !tagline || !description || !icon_url || !package_name) {
      return NextResponse.json(
        { error: 'Campos requeridos incompletos (slug, name, tagline, description, icon_url, package_name son obligatorios)' },
        { status: 400 }
      );
    }

    const ADMIN_EMAIL = 'andresfev999@gmail.com';
    const isOwner = developer_email && developer_email.toLowerCase().trim() === ADMIN_EMAIL;
    // Si la sube el admin (Andrés), se aprueba de inmediato.
    // Si la sube otro desarrollador, queda en estado 'pending' (Pendiente de Aprobación).
    const resolvedStatus = isOwner ? (status || 'published') : 'pending';

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
      status: resolvedStatus,
      developer_email: developer_email || undefined,
      developer_name: developer_name || undefined,
      submission_notes: submission_notes || undefined
    });

    return NextResponse.json({ app: newApp }, { status: 201 });
  } catch (error) {
    console.error('Error creando app:', error);
    return NextResponse.json({ error: 'Error al registrar la aplicación' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, slug, status, review_notes, admin_email } = body;

    const ADMIN_EMAIL = 'andresfev999@gmail.com';
    if (!admin_email || admin_email.toLowerCase().trim() !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Acceso denegado. Solo el administrador (andresfev999@gmail.com) puede cambiar el estado de las aplicaciones.' },
        { status: 403 }
      );
    }

    const targetId = id || slug;
    if (!targetId || !status) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos (id o slug, y status son obligatorios)' },
        { status: 400 }
      );
    }

    const { updateAppStatus } = await import('@/lib/store');
    const updated = await updateAppStatus(targetId, status, review_notes);

    if (!updated) {
      return NextResponse.json({ error: 'Aplicación no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ success: true, app: updated });
  } catch (error) {
    console.error('Error actualizando estado de la app:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
