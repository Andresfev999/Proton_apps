import { App, Release, AppScreenshot } from '@/types/database';

export const INITIAL_RELEASES: Release[] = [
  {
    id: 'rel-flowpdf-100',
    app_id: 'app-flowpdf',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0 (Lanzamiento Oficial)
- **Modo FLOW ⭐:** Lectura fluida y adaptativa que elimina el zoom horizontal en PDFs a múltiples columnas.
- **Portadas Reales con PdfRenderer:** Extracción automática de portadas de libros desde la primera página en alta resolución.
- **Controles de Lectura Permanentes:** Botones Anterior y Siguiente siempre visibles y ergonómicos en la parte inferior.
- **Panel "Aa" Instantáneo:** Personalización en vivo de tipografía (Literata/Inter), tamaño de fuente, interlineado y márgenes.
- **4 Temas de Lectura:** Claro, Papel/Sepia, Oscuro y AMOLED de alto contraste.
- **100% Offline-First:** Persistencia completa de libros, progreso, notas y marcadores sin conexión a internet.`,
    apk_file_url: '/apps/downloads/flowpdf-v1.0.0.apk',
    apk_size_bytes: 91864771, // 87.6 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 1420,
    sha256_hash: '933a5a3c3758cb2b6fbe1fa2dd452bdb5c9c6ace5216c46ef6988e2897953eb9',
    published_at: '2026-09-27T16:35:00Z',
    created_at: '2026-09-27T16:35:00Z'
  },
  {
    id: 'rel-finup-100',
    app_id: 'app-finup',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0 (Lanzamiento Oficial)
- **Dashboard Financiero Integral:** Resumen de ingresos, gastos totales y balance en tiempo real.
- **Asesor Inteligente Gemini 2.5 Flash:** Detección de patrones y recomendaciones automáticas de ahorro.
- **Gestión Avanzada de Deudas:** Control detallado de cuotas pendientes y amortizaciones.
- **Modo Oscuro DeepFi:** Paleta de alto contraste optimizada para pantallas móviles AMOLED.
- **Sincronización Cloud Supabase:** Seguridad criptográfica para tus movimientos y respaldos.`,
    apk_file_url: '/apps/downloads/finup-v1.0.0.apk',
    apk_size_bytes: 61984395, // 59.1 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 2840,
    sha256_hash: '46f6d55f1fb65538693386238aef017e894a3d39f2995ae8aea1c7c19d4ed224',
    published_at: '2026-09-25T22:42:00Z',
    created_at: '2026-09-25T22:42:00Z'
  },
  {
    id: 'rel-taskpulse-130',
    app_id: 'app-taskpulse',
    version_name: '1.3.0',
    version_code: 14,
    platform: 'android',
    changelog: `### Novedades en v1.3.0
- **Modo Oscuro Automático:** Detección de tema del sistema con soporte AMOLED profundo.
- **Sincronización en segundo plano:** Reducción del 45% en consumo de batería durante sync nocturno.
- **Exportación enriquecida:** Exporta tus métricas de productividad a PDF con gráficos vectoriales y CSV.
- **Widgets de escritorio:** Widget de racha diaria de tareas para Android 12+.`,
    apk_file_url: 'https://github.com/proton/task-pulse/releases/download/v1.3.0/task-pulse-v1.3.0.apk',
    apk_size_bytes: 25690112, // 24.5 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 3420,
    published_at: '2026-09-25T14:30:00Z',
    created_at: '2026-09-25T14:30:00Z'
  },
  {
    id: 'rel-taskpulse-120',
    app_id: 'app-taskpulse',
    version_name: '1.2.0',
    version_code: 12,
    platform: 'android',
    changelog: `### Novedades en v1.2.0
- Agrupación por etiquetas de proyectos.
- Sonidos hápticos configurables para finalización de Pomodoro.
- Corrección de bugs en notificaciones flotantes.`,
    apk_file_url: 'https://github.com/proton/task-pulse/releases/download/v1.2.0/task-pulse-v1.2.0.apk',
    apk_size_bytes: 23907532, // 22.8 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 5120,
    published_at: '2026-08-10T10:00:00Z',
    created_at: '2026-08-10T10:00:00Z'
  },
  {
    id: 'rel-protonmail-421',
    app_id: 'app-protonmail',
    version_name: '4.2.1',
    version_code: 421,
    platform: 'android',
    changelog: `### Novedades en v4.2.1 (Actualización Crítica)
- **Seguridad Urgente:** Parche criptográfico en negociación de llaves PGP efímeras.
- **Compatibilidad con Tablets:** Interfaz de doble panel adaptativa para pantallas grandes.
- **Búsqueda Indexada Local:** Encuentra correos sin descifrado en el servidor.`,
    apk_file_url: 'https://github.com/ProtonMail/proton-mail-android/releases/download/v4.2.1/protonmail-v4.2.1.apk',
    apk_size_bytes: 38797312, // 37 MB
    min_os_version: 'Android 9.0 (API 28)',
    is_critical: true,
    download_count: 15420,
    published_at: '2026-09-20T08:15:00Z',
    created_at: '2026-09-20T08:15:00Z'
  },
  {
    id: 'rel-protonpass-184',
    app_id: 'app-protonpass',
    version_name: '1.8.4',
    version_code: 84,
    platform: 'android',
    changelog: `### Novedades en v1.8.4
- **Autofill 2.0:** Integración mejorada con navegadores Chrome, Firefox y Brave en Android.
- **Monitoreo de Brechas:** Alertas inmediatas si tus correos aparecen en filtraciones públicas.
- **Generador de Passkeys:** Compatibilidad total con FIDO2 y WebAuthn.`,
    apk_file_url: 'https://github.com/ProtonPass/android-pass/releases/download/v1.8.4/protonpass-v1.8.4.apk',
    apk_size_bytes: 18874368, // 18 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 9810,
    published_at: '2026-09-18T12:00:00Z',
    created_at: '2026-09-18T12:00:00Z'
  },
  {
    id: 'rel-protonvpn-510',
    app_id: 'app-protonvpn',
    version_name: '5.1.0',
    version_code: 510,
    platform: 'android',
    changelog: `### Novedades en v5.1.0
- **Protocolo Stealth:** Evasión avanzada de censura gubernamental y cortafuegos estrictos.
- **NetShield Ad-blocker:** Bloqueo de malware y trackers a nivel de DNS.
- **Servidores 10Gbps:** Rendimiento optimizado para streaming en 4K.`,
    apk_file_url: 'https://github.com/ProtonVPN/android-vpn/releases/download/v5.1.0/protonvpn-v5.1.0.apk',
    apk_size_bytes: 32505856, // 31 MB
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 24900,
    published_at: '2026-09-22T09:40:00Z',
    created_at: '2026-09-22T09:40:00Z'
  }
];

export const INITIAL_SCREENSHOTS: Record<string, AppScreenshot[]> = {
  'app-taskpulse': [
    {
      id: 'sc-tp-1',
      app_id: 'app-taskpulse',
      image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      caption: 'Dashboard principal con seguimiento de hábitos en tiempo real',
      display_order: 1
    },
    {
      id: 'sc-tp-2',
      app_id: 'app-taskpulse',
      image_url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&auto=format&fit=crop&q=80',
      caption: 'Temporizador Pomodoro inmersivo con física de sonido relajante',
      display_order: 2
    },
    {
      id: 'sc-tp-3',
      app_id: 'app-taskpulse',
      image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
      caption: 'Estadísticas semanales y análisis de concentración',
      display_order: 3
    }
  ],
  'app-protonmail': [
    {
      id: 'sc-pm-1',
      app_id: 'app-protonmail',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      caption: 'Bandeja de entrada cifrada de extremo a extremo',
      display_order: 1
    },
    {
      id: 'sc-pm-2',
      app_id: 'app-protonmail',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      caption: 'Composición de mensajes con expiración automática',
      display_order: 2
    }
  ],
  'app-protonpass': [
    {
      id: 'sc-pp-1',
      app_id: 'app-protonpass',
      image_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&auto=format&fit=crop&q=80',
      caption: 'Bóveda de contraseñas con biometría integrada',
      display_order: 1
    },
    {
      id: 'sc-pp-2',
      app_id: 'app-protonpass',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      caption: 'Generador de alias de email para ocultar tu dirección real',
      display_order: 2
    }
  ],
  'app-protonvpn': [
    {
      id: 'sc-pv-1',
      app_id: 'app-protonvpn',
      image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
      caption: 'Mapa de conexión global a servidores de alta velocidad',
      display_order: 1
    }
  ],
  'app-finup': [
    {
      id: 'sc-fu-1',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/02_dashboard_principal.png',
      caption: 'Dashboard Principal: Visión panorámica de tus ingresos, gastos del mes y balance neto en tiempo real',
      display_order: 1
    },
    {
      id: 'sc-fu-2',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/03_movimientos.png',
      caption: 'Registro Rápido de Movimientos: Historial categorizado y filtros por fecha en 2 toques',
      display_order: 2
    },
    {
      id: 'sc-fu-3',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/05_presupuestos.png',
      caption: 'Presupuestos Mensuales: Control inteligente de límites de gasto para no quedarte en cero',
      display_order: 3
    },
    {
      id: 'sc-fu-4',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/07_metas_ahorro.png',
      caption: 'Metas de Ahorro: Visualiza tu progreso hacia tus sueños con motivación diaria',
      display_order: 4
    },
    {
      id: 'sc-fu-5',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/06_deudas_pasivos.png',
      caption: 'Plan Anti-Deudas: Control de pasivos, cuotas y plan de amortización progresiva',
      display_order: 5
    },
    {
      id: 'sc-fu-6',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/04_cuentas_billeteras.png',
      caption: 'Cuentas y Billeteras: Centraliza tus bancos, efectivo y cuentas en un solo lugar seguro',
      display_order: 6
    },
    {
      id: 'sc-fu-7',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/08_resumen_pro.png',
      caption: 'Análisis Financiero Avanzado: Consejos y reportes inteligentes para optimizar tu dinero',
      display_order: 7
    },
    {
      id: 'sc-fu-8',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/01_login_bienvenida.png',
      caption: 'Bienvenida DeepFi: Interfaz oscura AMOLED de alta gama diseñada para cuidar tus ojos',
      display_order: 8
    },
    {
      id: 'sc-fu-9',
      app_id: 'app-finup',
      image_url: '/apps/finup/screenshots/09_terminos_privacidad.png',
      caption: 'Privacidad y Seguridad: Tus datos financieros nunca se venden ni salen de tu control',
      display_order: 9
    }
  ],
  'app-flowpdf': [
    {
      id: 'sc-fp-1',
      app_id: 'app-flowpdf',
      image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      caption: 'Modo FLOW: Lectura adaptada al ancho del móvil con tipografía editorial Literata',
      display_order: 1
    },
    {
      id: 'sc-fp-2',
      app_id: 'app-flowpdf',
      image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
      caption: 'Biblioteca Personal: Lista vertical con portadas reales y progreso de lectura en tiempo real',
      display_order: 2
    },
    {
      id: 'sc-fp-3',
      app_id: 'app-flowpdf',
      image_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&auto=format&fit=crop&q=80',
      caption: 'Ajustes de Lectura "Aa": Control instantáneo de márgenes, temas Sepia/Oscuro y tamaño',
      display_order: 3
    }
  ]
};

export const INITIAL_APPS: App[] = [
  {
    id: 'app-flowpdf',
    slug: 'flowpdf',
    name: 'FlowPDF',
    tagline: 'Tus PDFs. Tu ritmo. Tu biblioteca personal tipo eReader',
    description: `### FlowPDF - Tu Biblioteca Personal para Leer Cómodamente 📖✨
**FlowPDF** transforma cualquier documento PDF en una experiencia de lectura cómoda, limpia y personalizable inspirada en los mejores eReaders del mundo.

Adiós al incómodo zoom horizontal constante y a los textos diminutos en pantallas de smartphone: con el **Modo Flow ⭐**, el texto de tus libros y artículos se extrae, limpia y reorganiza adaptándose fluidamente al ancho de tu teléfono.

#### 🌟 Características Principales:
- **⭐ Modo FLOW Adaptativo:** Reorganiza documentos PDF a múltiples columnas en un flujo continuo de texto tipo libro electrónico, respetando saltos de párrafo y eliminando cortes de línea molestos.
- **📄 Modo PDF Original:** Conmuta al instante entre el formato de lectura adaptado y el documento original con zoom fluido y doble toque.
- **🖼️ Portadas Reales Automáticas:** Motor nativo de renderizado que extrae la portada real de tu libro desde la página 1 para una biblioteca visualmente atractiva.
- **🔘 Botones Siempre a Mano:** Controles de navegación *Anterior* y *Siguiente* siempre visibles en la parte inferior para pasar de página cómodamente con tus pulgares.
- **🎨 Panel de Lectura "Aa" en Vivo:** Ajusta tamaño de fuente, interlineado, márgenes y tipografías (*Literata* editorial e *Inter* moderna) con cambios inmediatos en pantalla.
- **🌙 4 Temas de Descanso Visual:** Modos *Claro*, *Papel/Sepia*, *Oscuro* y *AMOLED* puro para no forzar la vista de día ni de noche.
- **🔖 Marcadores y Continuidad en < 3s:** Guarda tus páginas favoritas y retoma cualquier libro exactamente donde lo dejaste en menos de 3 segundos.
- **🔒 100% Privado y Offline:** Todos tus libros, notas y estadísticas se guardan en tu dispositivo local sin subir nada a la nube ni requerir cuentas.`,
    icon_url: '/apps/apps/flowpdf/flowpdf_icon.png',
    cover_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'com.flowpdf.app.flowpdf',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/FlowPDF.git',
    status: 'published',
    created_at: '2026-09-27T16:00:00Z',
    updated_at: '2026-09-27T16:45:00Z'
  },
  {
    id: 'app-finup',
    slug: 'finup',
    name: 'FinUp',
    tagline: 'Gestión financiera inteligente con Inteligencia Artificial (Gemini) y Supabase',
    description: `### FinUp - Gestión Financiera Inteligente 🚀💸
**FinUp** es una aplicación moderna y elegante para el control de finanzas personales diseñada bajo el concepto **DeepFi**. Combina una interfaz visual inmersiva con el poder de la Inteligencia Artificial para ayudarte a tomar mejores decisiones económicas.

Desarrollada nativamente en **Flutter**, ofrece rendimiento fluido y soporte multiplataforma.

#### ✨ Características Principales:
- **📊 Dashboard Interactivo & Salud Financiera:** Tarjetas de resumen con tus gastos totales, ingresos y saldo neto del periodo con mapa de gastos (Treemap).
- **🤖 Inteligencia Artificial (Google Gemini 2.5 Flash):** Asesor financiero inteligente que analiza tus patrones mensuales y genera reportes automáticos con consejos accionables.
- **💰 Gestión Integral de Deudas y Metas:** Seguimiento puntual de préstamos, cuotas pendientes y visualización de progreso de amortización.
- **🎨 Experiencia UX/UI Premium:** Paleta *Deep Blue* y *Neon Accent* para reducir fatiga visual y destacar métricas clave.
- **🔐 Backend Supabase & Local-First:** Sincronización continua de datos con cifrado y persistencia local reactiva.`,
    icon_url: '/apps/finup/finup_app_icon.png',
    cover_image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    category: 'Finanzas',
    package_name: 'com.finup.fin_up',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/FinUP-App.git',
    status: 'published',
    created_at: '2026-09-25T16:00:00Z',
    updated_at: '2026-09-25T17:49:00Z'
  },
  {
    id: 'app-taskpulse',
    slug: 'task-pulse',
    name: 'Task Pulse',
    tagline: 'Gestor ágil de micro-hábitos y productividad con sincronización biométrica',
    description: `### ¿Qué es Task Pulse?
**Task Pulse** es una herramienta diseñada para creadores y desarrolladores que necesitan mantener el flujo de trabajo sin distracciones. Combina la técnica Pomodoro con un rastreador de energía personal y sincronización descentralizada.

#### Características Clave:
- **Enfoque Profundo:** Sesiones configurables con tonos binaurales integrados.
- **Control de Rachas:** Gráficos de consistencia inspirados en contribuciones de GitHub.
- **Privacidad Local-First:** Todos tus datos residen en tu almacenamiento local cifrado hasta que decides sincronizar.
- **Soporte de Atajos:** Gestos rápidos para marcar tareas completadas desde la pantalla de bloqueo.`,
    icon_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'com.proton.taskpulse',
    platforms: ['android', 'ios'],
    play_store_url: 'https://play.google.com/store/apps/details?id=com.proton.taskpulse',
    app_store_url: 'https://apps.apple.com/app/task-pulse/id164923984',
    github_url: 'https://github.com/proton/task-pulse',
    status: 'published',
    created_at: '2026-08-01T12:00:00Z',
    updated_at: '2026-09-25T14:30:00Z'
  },
  {
    id: 'app-protonmail',
    slug: 'proton-mail',
    name: 'Proton Mail',
    tagline: 'Correo electrónico seguro con cifrado end-to-end suizo',
    description: `### Privacidad Suiza para tus Comunicaciones
Creado por científicos del CERN, **Proton Mail** protege tu correspondencia con cifrado automático de extremo a extremo. Nadie, ni siquiera Proton, puede leer tus correos ni vender tus datos para publicidad.

#### Funciones Principales:
- **Zero-Access Encryption:** Mensajes descifrados únicamente en tu dispositivo con tus llaves privadas.
- **Bandeja Inteligente:** Filtros antifraude y detección de rastreadores espía en imágenes incrustadas.
- **Correos con Expiración:** Envía mensajes confidenciales protegidos con contraseña que se eliminan solos.`,
    icon_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    category: 'Comunicación',
    package_name: 'ch.protonmail.android',
    platforms: ['android', 'ios'],
    play_store_url: 'https://play.google.com/store/apps/details?id=ch.protonmail.android',
    app_store_url: 'https://apps.apple.com/app/proton-mail/id977885770',
    github_url: 'https://github.com/ProtonMail/proton-mail-android',
    status: 'published',
    created_at: '2026-07-15T08:00:00Z',
    updated_at: '2026-09-20T08:15:00Z'
  },
  {
    id: 'app-protonpass',
    slug: 'proton-pass',
    name: 'Proton Pass',
    tagline: 'Gestor de contraseñas de alta seguridad con alias hide-my-email',
    description: `### Protección de Identidad y Credenciales
Protege tus cuentas digitales con **Proton Pass**. Diseñado con arquitectura de conocimiento cero para salvaguardar no solo tus contraseñas, sino también tus nombres de usuario y direcciones de correo electrónico contra rastreadores de datos.

#### Destacados:
- **Hide-my-email:** Crea alias aleatorios para registrarte en sitios web y evitar spam.
- **Autenticador 2FA Integrado:** Genera códigos TOTP directamente en la aplicación.
- **Bóvedas Compartidas:** Comparte accesos y contraseñas de manera segura con miembros de tu equipo o familia.`,
    icon_url: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    category: 'Seguridad',
    package_name: 'proton.android.pass',
    platforms: ['android', 'ios'],
    play_store_url: 'https://play.google.com/store/apps/details?id=proton.android.pass',
    app_store_url: 'https://apps.apple.com/app/proton-pass/id6443490629',
    github_url: 'https://github.com/ProtonPass/android-pass',
    status: 'published',
    created_at: '2026-07-20T10:00:00Z',
    updated_at: '2026-09-18T12:00:00Z'
  },
  {
    id: 'app-protonvpn',
    slug: 'proton-vpn',
    name: 'Proton VPN',
    tagline: 'Red Privada Virtual de alta velocidad sin registros y núcleo seguro',
    description: `### Navegación Libre y Cifrada sin Fronteras
**Proton VPN** rompe las barreras de la censura en internet mientras defiende tu dirección IP y privacidad frente a proveedores de telecomunicaciones y espías de red.

#### Características:
- **Secure Core:** Enruta tu tráfico a través de múltiples servidores en países con leyes de privacidad estrictas (Suiza, Islandia, Suecia).
- **Kill Switch Permanente:** Desconecta automáticamente el internet si el túnel VPN se interrumpe accidentalmente.
- **Sin Registros (No-Logs Auditado):** Ningún historial de navegación o tráfico es almacenado.`,
    icon_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=160&auto=format&fit=crop&q=80',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: 'Seguridad',
    package_name: 'ch.protonvpn.android',
    platforms: ['android', 'ios'],
    play_store_url: 'https://play.google.com/store/apps/details?id=ch.protonvpn.android',
    app_store_url: 'https://apps.apple.com/app/proton-vpn/id1437005085',
    github_url: 'https://github.com/ProtonVPN/android-vpn',
    status: 'published',
    created_at: '2026-06-10T14:00:00Z',
    updated_at: '2026-09-22T09:40:00Z'
  }
];

export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
