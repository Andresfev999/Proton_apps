-- ==============================================================================
-- PROTON APPS HUB: PostgreSQL / Supabase Database Schema
-- ==============================================================================

-- 1. Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enumerados
DO $$ BEGIN
    CREATE TYPE app_status AS ENUM ('published', 'beta', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tabla: apps
CREATE TABLE IF NOT EXISTS apps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    tagline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_url VARCHAR(500) NOT NULL,
    cover_image_url VARCHAR(500),
    category VARCHAR(80) NOT NULL,
    package_name VARCHAR(150) NOT NULL,
    platforms TEXT[] NOT NULL DEFAULT ARRAY['android'],
    play_store_url VARCHAR(500),
    app_store_url VARCHAR(500),
    github_url VARCHAR(500),
    status app_status NOT NULL DEFAULT 'published',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category);
CREATE INDEX IF NOT EXISTS idx_apps_status ON apps(status);

-- 4. Tabla: app_screenshots
CREATE TABLE IF NOT EXISTS app_screenshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(200),
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_screenshots_app_id ON app_screenshots(app_id, display_order ASC);

-- 5. Tabla: releases
CREATE TABLE IF NOT EXISTS releases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id UUID NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
    version_name VARCHAR(50) NOT NULL,
    version_code INTEGER NOT NULL,
    platform VARCHAR(30) NOT NULL DEFAULT 'android',
    changelog TEXT NOT NULL,
    apk_file_url VARCHAR(500) NOT NULL,
    apk_size_bytes BIGINT NOT NULL DEFAULT 0,
    min_os_version VARCHAR(100) DEFAULT 'Android 8.0 (API 26)',
    is_critical BOOLEAN NOT NULL DEFAULT FALSE,
    download_count BIGINT NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_app_platform_version UNIQUE (app_id, platform, version_code)
);

CREATE INDEX IF NOT EXISTS idx_releases_app_platform_code ON releases(app_id, platform, version_code DESC);

-- 6. Procedimiento para incremento atómico de descargas
CREATE OR REPLACE FUNCTION increment_release_download(p_release_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE releases 
    SET download_count = download_count + 1 
    WHERE id = p_release_id;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_apps_updated_at ON apps;
CREATE TRIGGER trigger_apps_updated_at
    BEFORE UPDATE ON apps
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- 8. Políticas de Seguridad RLS (Row Level Security)
ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública para aplicaciones y versiones
CREATE POLICY "Acceso de lectura público para apps" 
    ON apps FOR SELECT 
    USING (true);

CREATE POLICY "Acceso de lectura público para app_screenshots" 
    ON app_screenshots FOR SELECT 
    USING (true);

CREATE POLICY "Acceso de lectura público para releases" 
    ON releases FOR SELECT 
    USING (true);

-- Permitir modificaciones solo a usuarios autenticados (Admin)
CREATE POLICY "Permitir escritura solo a autenticados en apps" 
    ON apps FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Permitir escritura solo a autenticados en app_screenshots" 
    ON app_screenshots FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Permitir escritura solo a autenticados en releases" 
    ON releases FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);

-- ==============================================================================
-- DATOS SEMILLA (Seed Initial Data)
-- ==============================================================================

INSERT INTO apps (id, slug, name, tagline, description, icon_url, cover_image_url, category, package_name, platforms, play_store_url, github_url, status)
VALUES 
(
    '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    'finup',
    'FinUp',
    'Gestión financiera inteligente con Inteligencia Artificial (Gemini) y Supabase',
    'FinUp es una aplicación moderna y elegante para el control de finanzas personales diseñada bajo el concepto DeepFi con análisis inteligente de Google Gemini 2.5 Flash y sincronización con Supabase.',
    '/apps/finup/finup_app_icon.png',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    'Finanzas',
    'com.finup.fin_up',
    ARRAY['android'],
    null,
    'https://github.com/Andresfev999/FinUP-App.git',
    'published'
),
(
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'task-pulse',
    'Task Pulse',
    'Gestor ágil de micro-hábitos y productividad con sincronización biométrica',
    'Task Pulse te ayuda a mantener el foco con temporizadores pomodoro avanzados, seguimiento de rachas y sincronización segura de tareas locales y en la nube.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&auto=format&fit=crop&q=80',
    'Productividad',
    'com.proton.taskpulse',
    ARRAY['android', 'ios'],
    'https://play.google.com/store/apps/details?id=com.proton.taskpulse',
    'https://github.com/proton/task-pulse',
    'published'
),
(
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    'proton-mail',
    'Proton Mail Mobile',
    'Correo electrónico encriptado de extremo a extremo y privacidad absoluta',
    'Cliente oficial de correo con cifrado zero-access, bandejas protegidas con biometría y autodestrucción de mensajes.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    'Comunicación',
    'ch.protonmail.android',
    ARRAY['android', 'ios'],
    'https://play.google.com/store/apps/details?id=ch.protonmail.android',
    'https://github.com/ProtonMail/proton-mail-android',
    'published'
),
(
    'c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f',
    'proton-pass',
    'Proton Pass',
    'Gestor de contraseñas de alta seguridad con alias de correo ocultos',
    'Genera y autocompleta credenciales seguras, almacena tarjetas bancarias y genera notas cifradas sincronizadas al instante.',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    'Seguridad',
    'proton.android.pass',
    ARRAY['android', 'ios'],
    'https://play.google.com/store/apps/details?id=proton.android.pass',
    'https://github.com/ProtonPass/android-pass',
    'published'
)
ON CONFLICT (slug) DO NOTHING;

-- Releases iniciales
INSERT INTO releases (id, app_id, version_name, version_code, platform, changelog, apk_file_url, apk_size_bytes, min_os_version, is_critical, download_count)
VALUES
(
    '0e1f2a3b-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
    '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d',
    '1.0.0',
    1,
    'android',
    '### Novedades en v1.0.0 (Lanzamiento Oficial)\n- Dashboard Financiero Integral con balance en tiempo real.\n- Asesor Inteligente Gemini 2.5 Flash con recomendaciones de ahorro.\n- Control avanzado de deudas, cuotas y amortizaciones.\n- Modo Oscuro DeepFi optimizado para pantallas AMOLED.\n- Sincronización en la nube con Supabase.',
    '/downloads/finup-v1.0.0.apk',
    61984395, -- ~59.1 MB
    'Android 8.0 (API 26)',
    false,
    2840
),
(
    'd4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '1.3.0',
    14,
    'android',
    '### Novedades en v1.3.0\n- Nuevo modo oscuro automático con soporte AMOLED.\n- Sincronización en segundo plano optimizada para ahorro de batería.\n- Corrección en la exportación de reportes PDF y CSV.\n- Integración de widgets para la pantalla de inicio.',
    'https://storage.googleapis.com/proton-apps-repo/task-pulse/v1.3.0/task-pulse-v1.3.0.apk',
    25690112, -- ~24.5 MB
    'Android 8.0 (API 26)',
    false,
    1420
),
(
    'e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '1.2.0',
    12,
    'android',
    '### Novedades en v1.2.0\n- Soporte para etiquetas personalizadas en tareas.\n- Mejoras visuales en el temporizador Pomodoro.\n- Parches de seguridad menores.',
    'https://storage.googleapis.com/proton-apps-repo/task-pulse/v1.2.0/task-pulse-v1.2.0.apk',
    24117248, -- ~23 MB
    'Android 8.0 (API 26)',
    false,
    3890
),
(
    'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c',
    'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
    '4.2.1',
    421,
    'android',
    '### Novedades en v4.2.1 (Actualización Crítica)\n- Parche de seguridad urgente en el protocolo de handshake PGP.\n- Rediseño de la bandeja de entrada para tablets.\n- Desempeño acelerado al cargar hilos con más de 100 correos.',
    'https://storage.googleapis.com/proton-apps-repo/proton-mail/v4.2.1/proton-mail-v4.2.1.apk',
    38797312, -- ~37 MB
    'Android 9.0 (API 28)',
    true,
    12840
)
ON CONFLICT DO NOTHING;
