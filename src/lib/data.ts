import { App, Release, AppScreenshot } from '@/types/database';

export const INITIAL_RELEASES: Release[] = [
  {
    id: 'rel-stockmini-100',
    app_id: 'app-stockmini',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Kardex Automático:** Registro atómico de entradas, salidas y ventas.
- **Lector de Código de Barras:** Escaneo integrado con cámara para búsqueda instantánea.
- **Alertas de Stock Bajo:** Indicadores visuales de reposición urgente.
- **100% Offline-First:** Base de datos SQLite local sin conexión requerida.`,
    apk_file_url: 'https://github.com/Andresfev999/StockMini/releases/download/v1.0.0/stockmini-v1.0.0.apk',
    apk_size_bytes: 28400000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 520,
    published_at: '2026-09-28T02:00:00Z',
    created_at: '2026-09-28T02:00:00Z'
  },
  {
    id: 'rel-cotipro-100',
    app_id: 'app-cotipro',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Generador de Presupuestos:** Cotizaciones en segundos con ítems y cálculo de IVA.
- **Exportación PDF A4:** Diseño formal con encabezado empresarial y notas.
- **Compartir por WhatsApp:** Envío directo al cliente con un solo toque.`,
    apk_file_url: 'https://github.com/Andresfev999/CotiPro/releases/download/v1.0.0/cotipro-v1.0.0.apk',
    apk_size_bytes: 31200000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 480,
    published_at: '2026-09-28T02:15:00Z',
    created_at: '2026-09-28T02:15:00Z'
  },
  {
    id: 'rel-qrvault-100',
    app_id: 'app-qrvault',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Detector Inteligente:** Reconoce Wi-Fi, URL, Contacto vCard y Texto plano.
- **Generador de Códigos:** Crea y exporta códigos QR personalizados.
- **Bóveda Favoritos:** Guarda tus accesos frecuentes sin internet.`,
    apk_file_url: 'https://github.com/Andresfev999/QRVault/releases/download/v1.0.0/qrvault-v1.0.0.apk',
    apk_size_bytes: 24500000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 810,
    published_at: '2026-09-28T02:30:00Z',
    created_at: '2026-09-28T02:30:00Z'
  },
  {
    id: 'rel-scandoc-100',
    app_id: 'app-scandoc',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Escáner con Filtro B/N:** Limpieza de sombras y contraste de documento.
- **OCR en Dispositivo:** Reconocimiento de texto en español sin enviar a la nube.
- **Compilador PDF Multipágina:** Exporta y comparte en formato digital.`,
    apk_file_url: 'https://github.com/Andresfev999/ScanDoc/releases/download/v1.0.0/scandoc-v1.0.0.apk',
    apk_size_bytes: 39800000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 670,
    published_at: '2026-09-28T02:45:00Z',
    created_at: '2026-09-28T02:45:00Z'
  },
  {
    id: 'rel-pocketcrm-100',
    app_id: 'app-pocketcrm',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Pipeline de Ventas:** Prospecto, Conversación, Propuesta, Ganado y Perdido.
- **Acciones Rápidas:** Llamada y WhatsApp directo desde la ficha.
- **Historial de Interacciones:** Bitácora de acuerdos por cliente.`,
    apk_file_url: 'https://github.com/Andresfev999/PocketCRM/releases/download/v1.0.0/pocketcrm-v1.0.0.apk',
    apk_size_bytes: 26100000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 410,
    published_at: '2026-09-28T03:00:00Z',
    created_at: '2026-09-28T03:00:00Z'
  },
  {
    id: 'rel-habitflow-100',
    app_id: 'app-habitflow',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Visualizador de Rachas:** Contador de días consecutivos y mejor récord.
- **Barra de Progreso Semanal:** Vista compacta del cumplimiento de metas.
- **Registro Rápido:** Conmuta hábitos completados con un toque.`,
    apk_file_url: 'https://github.com/Andresfev999/HabitFlow/releases/download/v1.0.0/habitflow-v1.0.0.apk',
    apk_size_bytes: 23400000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 940,
    published_at: '2026-09-28T03:15:00Z',
    created_at: '2026-09-28T03:15:00Z'
  },
  {
    id: 'rel-passwordbox-100',
    app_id: 'app-passwordbox',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Cifrado AES-256:** Protección criptográfica completa de credenciales.
- **Bloqueo Biométrico:** Huella dactilar y reconocimiento facial nativo.
- **Medidor de Entropía:** Generador aleatorio de contraseñas de alta seguridad.`,
    apk_file_url: 'https://github.com/Andresfev999/PasswordBox/releases/download/v1.0.0/passwordbox-v1.0.0.apk',
    apk_size_bytes: 25100000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 1120,
    published_at: '2026-09-28T03:30:00Z',
    created_at: '2026-09-28T03:30:00Z'
  },
  {
    id: 'rel-taskboard-100',
    app_id: 'app-taskboard',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Tablero Kanban Móvil:** Columnas Pendiente, En Proceso y Terminado.
- **Checklist de Subtareas:** Desglose operativo con porcentaje de avance.
- **Filtro por Prioridad:** Insignias de urgencia alta, media y baja.`,
    apk_file_url: 'https://github.com/Andresfev999/TaskBoard/releases/download/v1.0.0/taskboard-v1.0.0.apk',
    apk_size_bytes: 24800000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 730,
    published_at: '2026-09-28T03:45:00Z',
    created_at: '2026-09-28T03:45:00Z'
  },
  {
    id: 'rel-fueltrack-100',
    app_id: 'app-fueltrack',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Rendimiento Automático:** Cálculo automático de km/L entre recargas de tanque.
- **Gráficos de Consumo:** Curva de eficiencia con librería fl_chart.
- **Control de Gastos:** Total de inversión mensual y odómetro acumulado.`,
    apk_file_url: 'https://github.com/Andresfev999/FuelTrack/releases/download/v1.0.0/fueltrack-v1.0.0.apk',
    apk_size_bytes: 27900000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 590,
    published_at: '2026-09-28T04:00:00Z',
    created_at: '2026-09-28T04:00:00Z'
  },
  {
    id: 'rel-turnoapp-100',
    app_id: 'app-turnoapp',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Calendario Semanal Interactivo:** Navegación por fechas y turnos del día.
- **Prevención de Solapamiento:** Validación estricta que impide doble reserva.
- **Recordatorios por WhatsApp:** Plantilla de mensaje lista para enviar al cliente.`,
    apk_file_url: 'https://github.com/Andresfev999/TurnoApp/releases/download/v1.0.0/turnoapp-v1.0.0.apk',
    apk_size_bytes: 28100000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 460,
    published_at: '2026-09-28T04:15:00Z',
    created_at: '2026-09-28T04:15:00Z'
  },
  {
    id: 'rel-localmarket-100',
    app_id: 'app-localmarket',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Catálogo y Carrito:** Selección rápida de artículos y filtros por categoría.
- **Checkout Formateado WhatsApp:** Mensaje con items, subtotal y dirección.
- **Gestión Offline:** Operación sin dependencia de servidores externos.`,
    apk_file_url: 'https://github.com/Andresfev999/LocalMarket/releases/download/v1.0.0/localmarket-v1.0.0.apk',
    apk_size_bytes: 25400000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 510,
    published_at: '2026-09-28T04:30:00Z',
    created_at: '2026-09-28T04:30:00Z'
  },
  {
    id: 'rel-offlinenotes-100',
    app_id: 'app-offlinenotes',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Soporte Markdown Completo:** Previsualización limpia de títulos, listas y citas.
- **Filtro por Tags:** Clasificación dinámica de notas por etiquetas temáticas.
- **Búsqueda Instantánea:** Indexación local en tiempo real sin nube ni trackers.`,
    apk_file_url: 'https://github.com/Andresfev999/OfflineNotes/releases/download/v1.0.0/offlinenotes-v1.0.0.apk',
    apk_size_bytes: 26800000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 890,
    published_at: '2026-09-28T04:45:00Z',
    created_at: '2026-09-28T04:45:00Z'
  },
  {
    id: 'rel-myfiles-100',
    app_id: 'app-myfiles',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Novedades en v1.0.0
- **Categorización Automática:** Documentos, fotos, audios y videos agrupados.
- **Explorador de Carpetas:** Navegación jerárquica fluida de directorios locales.
- **Apertura Nativa:** Apertura segura de archivos con aplicaciones del sistema.`,
    apk_file_url: 'https://github.com/Andresfev999/MyFiles/releases/download/v1.0.0/myfiles-v1.0.0.apk',
    apk_size_bytes: 23900000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 620,
    published_at: '2026-09-28T05:00:00Z',
    created_at: '2026-09-28T05:00:00Z'
  },
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
    id: 'app-stockmini',
    slug: 'stockmini',
    name: 'StockMini',
    tagline: 'Mini control de inventario, kardex y ventas para pequeños comercios',
    description: `### Control de Inventario Sin Complicaciones
**StockMini** está diseñada para pequeños negocios, abarrotes, tiendas y talleres que necesitan llevar el control de sus existencias, registrar entradas/salidas y saber exactamente cuándo reponer mercancía.

#### Características Clave:
- **Kardex Automático:** Cada ajuste o venta crea un movimiento con fecha, tipo y motivo.
- **Lector de Código de Barras Integrado:** Apunta con la cámara y accede al producto al instante.
- **Alertas de Stock Mínimo:** Distintivos de advertencia cuando un producto está por agotarse.
- **100% Offline-First:** Base de datos SQLite local para operar sin internet.`,
    icon_url: '/apps/icons/stockmini.png',
    cover_image_url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80',
    category: 'Negocios',
    package_name: 'space.protondev.stockmini',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/StockMini',
    status: 'published',
    created_at: '2026-09-28T02:00:00Z',
    updated_at: '2026-09-28T02:00:00Z'
  },
  {
    id: 'app-cotipro',
    slug: 'cotipro',
    name: 'CotiPro',
    tagline: 'Generador de cotizaciones y presupuestos en PDF con envío a WhatsApp',
    description: `### Presupuestos Profesionales en Segundos
**CotiPro** permite a contratistas, técnicos e independientes armar cotizaciones completas en el lugar de trabajo y compartirlas como documentos PDF formales por WhatsApp antes de que se enfríe el cliente.

#### Características Clave:
- **Cálculo Automático:** Subtotal, IVA o impuestos configurables y descuento comercial.
- **Exportación en Formato PDF A4:** Diseño ejecutivo con logo, términos y datos fiscales.
- **Envío Inmediato a WhatsApp:** Abre el chat del cliente con el resumen listo para enviar.
- **Directorio de Clientes:** Guarda clientes frecuentes para cotizar en menos de 1 minuto.`,
    icon_url: '/apps/icons/cotipro.png',
    cover_image_url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&auto=format&fit=crop&q=80',
    category: 'Negocios',
    package_name: 'space.protondev.cotipro',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/CotiPro',
    status: 'published',
    created_at: '2026-09-28T02:15:00Z',
    updated_at: '2026-09-28T02:15:00Z'
  },
  {
    id: 'app-qrvault',
    slug: 'qrvault',
    name: 'QR Vault',
    tagline: 'Escáner, organizador y generador privado de códigos QR y WiFi',
    description: `### Tu Bóveda Personal de Códigos QR
**QR Vault** no es solo un lector: es un organizador inteligente que detecta si el código es una red Wi-Fi, un link web, una tarjeta vCard o texto plano, permitiéndote guardarlo en tus favoritos offline.

#### Características Clave:
- **Reconocimiento Inteligente:** Conexión a Wi-Fi, apertura de links y llamadas en un toque.
- **Generador de QR Integrado:** Crea códigos para tus propias redes, enlaces o notas.
- **Bóveda de Favoritos:** Consulta tus códigos guardados sin conexión en cualquier momento.
- **Privacidad Absoluta:** Cero anuncios intrusivos y cero telemetría externa.`,
    icon_url: '/apps/icons/qrvault.png',
    cover_image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: 'Utilidades',
    package_name: 'space.protondev.qrvault',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/QRVault',
    status: 'published',
    created_at: '2026-09-28T02:30:00Z',
    updated_at: '2026-09-28T02:30:00Z'
  },
  {
    id: 'app-scandoc',
    slug: 'scandoc',
    name: 'ScanDoc',
    tagline: 'Escáner de documentos a PDF con OCR local y filtros de contraste',
    description: `### Digitalizador de Documentos con OCR en tu Celular
**ScanDoc** convierte la cámara de tu móvil en un escáner de alta fidelidad con filtros de realce de texto en blanco y negro, reconocimiento OCR local y ensamblador de PDF multipágina.

#### Características Clave:
- **Filtros de Procesamiento:** Blanco/negro de alto contraste, escala de grises y color mejorado.
- **OCR en el Dispositivo:** Reconoce texto impreso sin subir tus fotos a servidores externos.
- **Compilador PDF Multipágina:** Organiza páginas y compila en un documento ligero listo para compartir.`,
    icon_url: '/apps/icons/scandoc.png',
    cover_image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'space.protondev.scandoc',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/ScanDoc',
    status: 'published',
    created_at: '2026-09-28T02:45:00Z',
    updated_at: '2026-09-28T02:45:00Z'
  },
  {
    id: 'app-pocketcrm',
    slug: 'pocketcrm',
    name: 'PocketCRM',
    tagline: 'CRM de bolsillo para gestionar clientes, embudos de ventas y notas',
    description: `### Administra tus Prospectos y Cierra Más Tratos
**PocketCRM** es el embudo de ventas que cabe en tu bolsillo. Diseñado para emprendedores que atienden clientes por llamada o WhatsApp y necesitan no olvidar ningún seguimiento comercial.

#### Características Clave:
- **Etapas de Pipeline Visual:** Prospecto, Conversación, Propuesta, Ganado o Perdido.
- **Ficha 360° del Contacto:** Datos de contacto, valor proyectado y notas de seguimiento.
- **Acciones Rápidas Directas:** Llamada o chat de WhatsApp a un solo toque.
- **Base de Datos Local Segura:** Tus clientes y montos nunca salen de tu dispositivo.`,
    icon_url: '/apps/icons/pocketcrm.png',
    cover_image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    category: 'Negocios',
    package_name: 'space.protondev.pocketcrm',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/PocketCRM',
    status: 'published',
    created_at: '2026-09-28T03:00:00Z',
    updated_at: '2026-09-28T03:00:00Z'
  },
  {
    id: 'app-habitflow',
    slug: 'habitflow',
    name: 'HabitFlow',
    tagline: 'Rastreador minimalista de hábitos diarios, rachas y constancia semanal',
    description: `### Construye Hábitos Duraderos con Cero Fricción
**HabitFlow** te ayuda a mantener la disciplina diaria mediante un tablero de rachas visual y progreso semanal que premia tu constancia sin abrumarte con notificaciones invasivas.

#### Características Clave:
- **Contador de Rachas:** Visualiza tus días continuos y tu récord histórico.
- **Progreso Semanal Inteligente:** Monitorea tu cumplimiento con barras visuales intuitivas.
- **Check-in Instantáneo:** Registra tus actividades diarias en menos de 2 segundos.
- **100% Offline y Privado:** Sin registros, sin cuentas y sin fuga de información personal.`,
    icon_url: '/apps/icons/habitflow.png',
    cover_image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'space.protondev.habitflow',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/HabitFlow',
    status: 'published',
    created_at: '2026-09-28T03:15:00Z',
    updated_at: '2026-09-28T03:15:00Z'
  },
  {
    id: 'app-passwordbox',
    slug: 'passwordbox',
    name: 'PasswordBox',
    tagline: 'Bóveda de contraseñas con cifrado AES-256 local y biometría',
    description: `### Tus Claves Cifradas Fuera de la Nube
**PasswordBox** es la alternativa soberana a los gestores en la nube. Todas tus contraseñas se almacenan cifradas con **AES-256 CBC** en tu teléfono, desbloqueables únicamente con tu huella digital.

#### Características Clave:
- **Cifrado AES-256 Militar:** Base de datos blindada criptográficamente.
- **Autenticación Biométrica Nativa:** Desbloqueo rápido por huella o rostro.
- **Generador de Alta Entropía:** Crea contraseñas aleatorias e invulnerables al instante.
- **Protección de Portapapeles:** Copia credenciales con borrado automático de memoria.`,
    icon_url: '/apps/icons/passwordbox.png',
    cover_image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    category: 'Seguridad',
    package_name: 'space.protondev.passwordbox',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/PasswordBox',
    status: 'published',
    created_at: '2026-09-28T03:30:00Z',
    updated_at: '2026-09-28T03:30:00Z'
  },
  {
    id: 'app-taskboard',
    slug: 'taskboard',
    name: 'TaskBoard',
    tagline: 'Tablero Kanban ágil para organizar tareas y proyectos sin conexión',
    description: `### El Método Kanban Directo en tu Bolsillo
**TaskBoard** traslada la claridad y agilidad de un tablero visual estilo Trello al móvil de manera rápida, ligera y 100% offline para gestionar proyectos personales y tareas cotidianas.

#### Características Clave:
- **Columnas de Flujo:** Pendiente, En Proceso y Terminado para seguimiento visual.
- **Checklist de Subtareas:** Desglosa grandes metas en pasos accionables con barra de avance.
- **Insignias de Prioridad:** Identifica rápidamente lo urgente y lo importante.
- **Filtros por Estado:** Encuentra cualquier tarea en milisegundos.`,
    icon_url: '/apps/icons/taskboard.png',
    cover_image_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'space.protondev.taskboard',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/TaskBoard',
    status: 'published',
    created_at: '2026-09-28T03:45:00Z',
    updated_at: '2026-09-28T03:45:00Z'
  },
  {
    id: 'app-fueltrack',
    slug: 'fueltrack',
    name: 'FuelTrack',
    tagline: 'Control de consumo de combustible, rendimiento km/L y gastos de vehículo',
    description: `### Monitorea el Gasto Real de Combustible de tu Auto
**FuelTrack** te permite registrar cada carga en la gasolinera calculando automáticamente el rendimiento por litro (km/L), costo por kilómetro y proyecciones de gasto mensual.

#### Características Clave:
- **Cálculo de Eficiencia km/L:** Determina el consumo real con solo ingresar odómetro y litros.
- **Dashboard Estadístico con Gráficos:** Curvas de eficiencia impulsadas por fl_chart.
- **Historial Completo de Repostajes:** Bitácora detallada con montos, fechas y notas de servicio.
- **Operación Local:** No requiere datos móviles ni crear cuenta en gasolineras.`,
    icon_url: '/apps/icons/fueltrack.png',
    cover_image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80',
    category: 'Utilidades',
    package_name: 'space.protondev.fueltrack',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/FuelTrack',
    status: 'published',
    created_at: '2026-09-28T04:00:00Z',
    updated_at: '2026-09-28T04:00:00Z'
  },
  {
    id: 'app-turnoapp',
    slug: 'turnoapp',
    name: 'TurnoApp',
    tagline: 'Agenda de citas, reservas y recordatorios WhatsApp para profesionales',
    description: `### Tu Agenda de Clientes Sin Choques de Horario
**TurnoApp** organiza la agenda de barberías, salones de estética, consultorios y profesionales independientes con control anti-solapamiento y recordatorios por WhatsApp a un clic.

#### Características Clave:
- **Calendario Semanal Interactivo:** Vista fluida de citas y horarios programados.
- **Algoritmo Anti-Solapamiento:** Detecta conflictos de horario antes de guardar.
- **Recordatorios por WhatsApp:** Plantilla de mensaje con hora y servicio lista para enviar.
- **Gestión de Tarifas:** Configura catálogo de servicios con precio y duración.`,
    icon_url: '/apps/icons/turnoapp.png',
    cover_image_url: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&auto=format&fit=crop&q=80',
    category: 'Negocios',
    package_name: 'space.protondev.turnoapp',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/TurnoApp',
    status: 'published',
    created_at: '2026-09-28T04:15:00Z',
    updated_at: '2026-09-28T04:15:00Z'
  },
  {
    id: 'app-localmarket',
    slug: 'localmarket',
    name: 'LocalMarket',
    tagline: 'Catálogo de productos y toma de pedidos con checkout directo a WhatsApp',
    description: `### Vende por Catálogo y Recibe Pedidos Listos por WhatsApp
**LocalMarket** permite a restaurantes, cafeterías y tiendas de barrio exhibir sus productos, sumar artículos al carrito y enviar pedidos estructurados al WhatsApp del negocio.

#### Características Clave:
- **Catálogo Organizado por Categorías:** Comidas, bebidas, postres y acompañamientos.
- **Carrito de Compras Reactivo:** Cantidades, precios unitarios y cálculo de total en vivo.
- **Generador de Mensaje WhatsApp:** Pedido limpio con desglose, datos de envío y total.
- **Funcionamiento 100% Offline:** Funciona incluso en zonas con poca cobertura.`,
    icon_url: '/apps/icons/localmarket.png',
    cover_image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
    category: 'Negocios',
    package_name: 'space.protondev.localmarket',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/LocalMarket',
    status: 'published',
    created_at: '2026-09-28T04:30:00Z',
    updated_at: '2026-09-28T04:30:00Z'
  },
  {
    id: 'app-offlinenotes',
    slug: 'offlinenotes',
    name: 'OfflineNotes',
    tagline: 'Bloc de notas privado en Markdown con etiquetas y búsqueda instantánea',
    description: `### Notas en Markdown con Privacidad Total
**OfflineNotes** es tu libreta de pensamientos, apuntes de código y listas pendientes en formato Markdown, guardadas exclusivamente en tu móvil sin nube ni rastreadores.

#### Características Clave:
- **Editor y Visor Markdown:** Renderiza encabezados, negritas, listas y bloques de cita.
- **Sistema de Etiquetas (#Tags):** Organiza tus notas por temas con filtros dinámicos.
- **Fijado de Notas Clave:** Mantén tus prioridades siempre arriba en la lista.
- **Buscador Rápido:** Encuentra cualquier nota por título o fragmento de contenido.`,
    icon_url: '/apps/icons/offlinenotes.png',
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80',
    category: 'Productividad',
    package_name: 'space.protondev.offlinenotes',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/OfflineNotes',
    status: 'published',
    created_at: '2026-09-28T04:45:00Z',
    updated_at: '2026-09-28T04:45:00Z'
  },
  {
    id: 'app-myfiles',
    slug: 'myfiles',
    name: 'MyFiles',
    tagline: 'Gestor ligero y categorizado de archivos locales para Android',
    description: `### Explora y Organiza tu Almacenamiento Sin Basura
**MyFiles** ofrece una interfaz limpia y veloz para clasificar documentos, fotos, audios y videos, o navegar las carpetas del sistema sin anuncios ni permisos sospechosos.

#### Características Clave:
- **Resumen Visual de Almacenamiento:** Gráfico de espacio ocupado por categoría.
- **Categorías Automáticas:** Acceso directo a Documentos, Imágenes, Audio y Video.
- **Explorador de Carpetas Jerárquico:** Navegación tradicional con apertura nativa de archivos.
- **Ligero y Respetuoso:** Consume menos de 25MB y protege tu información local.`,
    icon_url: '/apps/icons/myfiles.png',
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80',
    category: 'Utilidades',
    package_name: 'space.protondev.myfiles',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/MyFiles',
    status: 'published',
    created_at: '2026-09-28T05:00:00Z',
    updated_at: '2026-09-28T05:00:00Z'
  },
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
