import { App, Release, AppScreenshot } from '@/types/database';

export const INITIAL_RELEASES: Release[] = [
  {
    id: 'rel-crosspro-100',
    app_id: 'app-crosspro',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Modo Crucigramas Temáticos:** Docenas de crucigramas interactivos con pistas horizontales y verticales integradas.
- **Detector y Validador en Tiempo Real:** Detección automática de celdas resueltas y retroalimentación háptica.
- **Sistema de Pistas Inteligentes:** Revela letras o palabras cuando te encuentres bloqueado.
- **100% Offline-First:** Juega en cualquier lugar sin necesidad de conexión a internet.`,
    apk_file_url: '/apps/downloads/crosspro-v1.0.0.apk',
    apk_size_bytes: 48247736,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 140,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-barberpoint-100',
    app_id: 'app-barberpoint',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Agenda y Reserva en Tiempo Real:** Selección de fecha, horarios disponibles y barbero preferido.
- **Catálogo de Servicios & Precios:** Cortes clásicos, degradados fade, perfilado de barba y tratamientos capilares.
- **Historial y Confirmación de Citas:** Gestión de estados (Pendiente, Confirmada, Completada).
- **Diseño Ergonómico Dark/Gold:** Interfaz premium con temática barber shop y navegación intuitiva.`,
    apk_file_url: '/apps/downloads/barberpoint-v1.0.0.apk',
    apk_size_bytes: 51502104,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 165,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-pacepulse-100',
    app_id: 'app-pacepulse',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Rastreo GPS & Lienzo Táctico:** Visualización de ruta en tiempo real con trazado de recorrido animado.
- **Métricas de Rendimiento:** Ritmo actual (pace min/km), distancia recorrida, tiempo transcurrido y calorías quemadas.
- **Splits por Kilómetro:** Desglose detallado del ritmo promedio por cada kilómetro completado.
- **Modo Táctico Neón:** Interfaz atlética oscura optimizada para visibilidad bajo luz solar y bajo consumo de batería.`,
    apk_file_url: '/apps/downloads/pacepulse-v1.0.0.apk',
    apk_size_bytes: 48117032,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 220,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-speednova-100',
    app_id: 'app-speednova',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Velocímetro Reactivo Neón:** Medición en vivo de velocidad de descarga y subida con tacómetro cyberpunk animado.
- **Latencia & Jitter en Tiempo Real:** Prueba precisa de Ping (ms) y estabilidad de conexión contra servidores globales.
- **Historial Completo de Tests:** Registro detallado de mediciones por fecha, tipo de red (Wi-Fi/Móvil) y calidad de señal.
- **Análisis de Rendimiento:** Diagnóstico para streaming 4K, gaming online y videollamadas.`,
    apk_file_url: '/apps/downloads/speednova-v1.0.0.apk',
    apk_size_bytes: 47677936,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 340,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-mediagrab-100',
    app_id: 'app-mediagrab',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Descargas Multi-Calidad HD:** Detección de enlaces y descarga en resoluciones 1080p, 720p, 480p o audio MP3.
- **Cola y Gestor de Tareas:** Pausa, reanudación y monitoreo del progreso de descarga en segundo plano.
- **Biblioteca Multimedia Integrada:** Reproducción y previsualización de archivos descargados directamente desde la app.
- **Navegador y Capturador Rápido:** Pega enlaces directamente desde el portapapeles o comparte desde cualquier navegador.`,
    apk_file_url: '/apps/downloads/mediagrab-v1.0.0.apk',
    apk_size_bytes: 50731304,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 295,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-fitpulse-100',
    app_id: 'app-fitpulse',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Entrenamientos Personalizados:** Rutinas divididas por grupos musculares (Pecho, Espalda, Piernas, Core, Cardio).
- **Temporizador Guiado de Series & Descanso:** Avisos sonoros y hápticos durante el entrenamiento activo.
- **Registro de Métricas & Peso:** Gráfica interactiva de evolución de peso y calculadora de macronutrientes.
- **Diseño Dark Athletic:** Experiencia deportiva inmersiva con seguimiento de récords personales.`,
    apk_file_url: '/apps/downloads/fitpulse-v1.0.0.apk',
    apk_size_bytes: 48251956,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 195,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-chefcraft-100',
    app_id: 'app-chefcraft',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Recetario Gourmet Inteligente:** Cientos de recetas con filtros por dificultad, tiempo y tipo de dieta.
- **Modo Cocina Paso a Paso:** Pantalla guiada a pantalla completa con temporizador integrado para no quemar nada.
- **Lista de Compras Interactiva:** Añade ingredientes de cualquier receta con un solo toque y márcalos en el súper.
- **100% Offline-First:** Guarda tus recetas favoritas y consúltalas en la cocina sin necesidad de Wi-Fi.`,
    apk_file_url: '/apps/downloads/chefcraft-v1.0.0.apk',
    apk_size_bytes: 48405888,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 180,
    published_at: '2026-10-09T05:00:00Z',
    created_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'rel-swipegallery-104',
    app_id: 'app-swipegallery',
    version_name: '1.0.4',
    version_code: 5,
    platform: 'android',
    changelog: `### Novedades v1.0.4 (Hotfix & Bóveda Mejorada)
- **🔒 Bóveda Multimedia Blindada & Multi-Selección:** Corrección definitiva en el guardado de contenidos en la bóveda privada. Ahora puedes seleccionar múltiples fotos y videos a la vez desde la galería principal o importarlos en lote directamente dentro de la bóveda.
- **👉 Visor con Desplazamiento Horizontal (Swipe Gallery):** Abre cualquier foto o video y desliza suavemente hacia los lados para explorar toda tu galería sin tener que salir y volver a entrar.
- **🎬 Miniaturas de Video Instantáneas:** Detección de video y previsualización de fotogramas fluida en la cuadrícula de medios.
- **⚡ Rendimiento Optimizado:** Respuesta táctil inmediata y persistencia atómica segura.`,
    apk_file_url: '/apps/downloads/swipegallery-v1.0.4.apk',
    apk_size_bytes: 50613328,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 580,
    sha256_hash: '36d184c93f06ae158ab2a33c968e4f376c78eb3ef564387ff7b2333dc45a0998',
    published_at: '2026-10-09T09:55:00Z',
    created_at: '2026-10-09T09:55:00Z'
  },
  {
    id: 'rel-swipegallery-103',
    app_id: 'app-swipegallery',
    version_name: '1.0.3',
    version_code: 4,
    platform: 'android',
    changelog: `### Novedades v1.0.3
- **🔒 Bóveda Multimedia Oculta (Secret Vault):** Guarda fotos y videos privados protegidos bajo un PIN de seguridad de 4 dígitos. Los archivos se ocultan de la galería pública y de otras aplicaciones.
- **🎬 Miniaturas de Video Infalibles:** Extracción de fotogramas nativa de alto rendimiento con decodificación directa en hardware compatible con Scoped Storage de Android 10/11/12/13/14+.
- **⚡ Smart Clean Hub:** Limpieza inteligente de videos pesados y detección automática de capturas de pantalla antiguas (>30 días).
- **📅 Modo Mes a Mes:** Revisa y limpia tu galería por meses con barra de progreso y estado de verificación.
- **🎥 Reproducción In-App & Háptica:** Auto-play silenciado en tarjetas de Swipe y vibración sensorial en cada gesto.`,
    apk_file_url: '/apps/downloads/swipegallery-v1.0.3.apk',
    apk_size_bytes: 50433092,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 510,
    published_at: '2026-10-09T04:30:00Z',
    created_at: '2026-10-09T04:30:00Z'
  },
  {
    id: 'rel-swipegallery-101',
    app_id: 'app-swipegallery',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades v1.0.1
- **Miniaturas de Video Nativas:** Generación instantánea de fotogramas y miniaturas para todos los videos en la galería y el modo Swipe.
- **Nuevo Icono Oficial:** Icono de aplicación moderno integrado en el instalador y la tienda.
- **Visor Multimedia Mejorado:** Vista previa cinemática para videos con botón de reproducción directa.
- **Rendimiento Optimizado:** Carga de álbumes fluida y caché de miniaturas en memoria.`,
    apk_file_url: '/apps/downloads/swipegallery-v1.0.1.apk',
    apk_size_bytes: 49159149,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 380,
    published_at: '2026-09-30T00:15:00Z',
    created_at: '2026-09-30T00:15:00Z'
  },
  {
    id: 'rel-swipegallery-100',
    app_id: 'app-swipegallery',
    version_name: '1.0.0',
    version_code: 1,
    platform: 'android',
    changelog: `### Lanzamiento Oficial v1.0.0
- **Modo Swipe & Clean:** Desliza a la derecha para conservar y a la izquierda para eliminar fotos y videos acumulados.
- **Métricas de Almacenamiento:** Cálculo en tiempo real de espacio en MB/GB liberado.
- **Soporte de Álbumes:** Filtro por Cámara, WhatsApp, Capturas y Descargas.
- **Visor con Zoom Táctil:** Interfaz inmersiva a pantalla completa y apertura de videos.`,
    apk_file_url: '/apps/downloads/swipegallery-v1.0.0.apk',
    apk_size_bytes: 49062869,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 310,
    published_at: '2026-09-29T23:55:00Z',
    created_at: '2026-09-29T23:55:00Z'
  },
  {
    id: 'rel-myfiles-102',
    app_id: 'app-myfiles',
    version_name: '1.0.2',
    version_code: 3,
    platform: 'android',
    changelog: `### Novedades en v1.0.2
- **Acceso a Almacenamiento Real:** Lectura nativa y completa de la memoria interna del teléfono (/storage/emulated/0, Descargas, DCIM, Documentos, Música y Videos).
- **Estadísticas Nativa del Teléfono:** Medición en tiempo real del almacenamiento total, usado y libre del dispositivo mediante StatFs.
- **Navegador de Archivos Renovado:** Barra de accesos directos (Descargas, DCIM, Documentos, etc.) e íconos identificativos por tipo de archivo.
- **Gestión de Permisos:** Solicitud transparente de permisos de almacenamiento en Android 11+.`,
    apk_file_url: '/apps/downloads/myfiles-v1.0.2.apk',
    apk_size_bytes: 47400877,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 675,
    published_at: '2026-09-29T22:30:00Z',
    created_at: '2026-09-29T22:30:00Z'
  },
  {
    id: 'rel-myfiles-101',
    app_id: 'app-myfiles',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones en la nube.
- **Corrección de Errores:** Resuelto error en interpolación de caracteres y rutas.
- **Base de Datos Limpia:** Inicio 100% libre de datos residuales.`,
    apk_file_url: '/apps/downloads/myfiles-v1.0.1.apk',
    apk_size_bytes: 46734653,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 640,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-passwordbox-101',
    app_id: 'app-passwordbox',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Configuración Inicial Fluida:** Ya no solicita contraseñas por defecto; pide configurar tu clave maestra o biometría al iniciar.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque sin claves de prueba preinsertadas.`,
    apk_file_url: '/apps/downloads/passwordbox-v1.0.1.apk',
    apk_size_bytes: 52250204,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 1150,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-offlinenotes-101',
    app_id: 'app-offlinenotes',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Filtro de Etiquetas Mejorado:** Deselección dinámica de tags tocando de nuevo el chip para volver a 'Todos'.
- **Fijar Notas:** Soporte para destacar notas prioritarias en la parte superior.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Comprobación directa de nuevas versiones desde Ajustes.`,
    apk_file_url: '/apps/downloads/offlinenotes-v1.0.1.apk',
    apk_size_bytes: 50946326,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 910,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-stockmini-101',
    app_id: 'app-stockmini',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Acciones Rápidas de Stock:** Botones +1 / -1 directos en el listado para entradas y salidas express.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de productos de prueba.`,
    apk_file_url: '/apps/downloads/stockmini-v1.0.1.apk',
    apk_size_bytes: 67900000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 540,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-cotipro-101',
    app_id: 'app-cotipro',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Duplicar Cotizaciones:** Clonación con un solo toque manteniendo ítems y calculando nuevo consecutivo.
- **Ciclo de Estados:** Selector rápido de estado (Borrador, Enviada, Aprobada, Rechazada).
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Botón en Ajustes para validar nuevas versiones.`,
    apk_file_url: '/apps/downloads/cotipro-v1.0.1.apk',
    apk_size_bytes: 54726733,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 495,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-turnoapp-101',
    app_id: 'app-turnoapp',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de turnos ficticios.`,
    apk_file_url: '/apps/downloads/turnoapp-v1.0.1.apk',
    apk_size_bytes: 51328588,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 475,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-localmarket-101',
    app_id: 'app-localmarket',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de artículos de prueba.`,
    apk_file_url: '/apps/downloads/localmarket-v1.0.1.apk',
    apk_size_bytes: 48800000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 525,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-pocketcrm-102',
    app_id: 'app-pocketcrm',
    version_name: '1.0.2',
    version_code: 3,
    platform: 'android',
    changelog: `### Novedades en v1.0.2
- **WhatsApp Universal:** Protocolo de mensajería optimizado para compatibilidad con WhatsApp estándar y WhatsApp Business.
- **Acciones Rápidas Robustas:** Validación de números telefónicos y alertas informativas inmediatas si el teléfono no es válido o no está disponible.
- **Llamadas Directas Mejoradas:** Integración nativa con la app de llamadas del teléfono en segundo plano.`,
    apk_file_url: '/apps/downloads/pocketcrm-v1.0.2.apk',
    apk_size_bytes: 51069794,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 450,
    published_at: '2026-09-29T23:45:00Z',
    created_at: '2026-09-29T23:45:00Z'
  },
  {
    id: 'rel-pocketcrm-101',
    app_id: 'app-pocketcrm',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Acciones Directas:** Llamada telefónica y WhatsApp directo con un toque desde la ficha del prospecto.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de contactos demo.`,
    apk_file_url: '/apps/downloads/pocketcrm-v1.0.1.apk',
    apk_size_bytes: 51600000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 425,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-qrvault-101',
    app_id: 'app-qrvault',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Copia Rápida:** Botón directo al portapapeles desde el historial de escaneos.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.`,
    apk_file_url: '/apps/downloads/qrvault-v1.0.1.apk',
    apk_size_bytes: 68100000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 830,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-scandoc-102',
    app_id: 'app-scandoc',
    version_name: '1.0.2',
    version_code: 3,
    platform: 'android',
    changelog: `### Novedades en v1.0.2
- **Guardar en Descargas del Teléfono:** Botón directo para guardar el documento PDF en la carpeta pública Descargas (/storage/emulated/0/Download).
- **Acceso Inmediato:** El documento generado ahora es visible y editable desde cualquier explorador de archivos.
- **Optimización de Exportación:** Compilación PDF con copia de seguridad local.`,
    apk_file_url: '/apps/downloads/scandoc-v1.0.2.apk',
    apk_size_bytes: 87303770,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 715,
    published_at: '2026-09-29T23:40:00Z',
    created_at: '2026-09-29T23:40:00Z'
  },
  {
    id: 'rel-scandoc-101',
    app_id: 'app-scandoc',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Reordenamiento de Páginas:** Capacidad de reorganizar páginas escaneadas antes de generar el PDF.
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.`,
    apk_file_url: '/apps/downloads/scandoc-v1.0.1.apk',
    apk_size_bytes: 88200000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 690,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-habitflow-101',
    app_id: 'app-habitflow',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de hábitos demo.`,
    apk_file_url: '/apps/downloads/habitflow-v1.0.1.apk',
    apk_size_bytes: 50100000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 960,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-fueltrack-101',
    app_id: 'app-fueltrack',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de recargas demo.`,
    apk_file_url: '/apps/downloads/fueltrack-v1.0.1.apk',
    apk_size_bytes: 50800000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 610,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
  {
    id: 'rel-taskboard-101',
    app_id: 'app-taskboard',
    version_name: '1.0.1',
    version_code: 2,
    platform: 'android',
    changelog: `### Novedades en v1.0.1
- **Ícono Oficial HD:** Nuevo launcher icon adaptativo de alta resolución.
- **Verificador de Actualizaciones:** Nuevo botón en Ajustes para verificar versiones.
- **Base de Datos Limpia:** Arranque 100% libre de tareas ficticias.`,
    apk_file_url: '/apps/downloads/taskboard-v1.0.1.apk',
    apk_size_bytes: 50700000,
    min_os_version: 'Android 8.0 (API 26)',
    is_critical: false,
    download_count: 750,
    published_at: '2026-09-29T21:00:00Z',
    created_at: '2026-09-29T21:00:00Z'
  },
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
    apk_file_url: '/apps/downloads/stockmini-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/cotipro-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/qrvault-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/scandoc-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/pocketcrm-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/habitflow-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/passwordbox-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/taskboard-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/fueltrack-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/turnoapp-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/localmarket-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/offlinenotes-v1.0.0.apk',
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
    apk_file_url: '/apps/downloads/myfiles-v1.0.0.apk',
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
  }
];

export const INITIAL_SCREENSHOTS: Record<string, AppScreenshot[]> = {
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
    id: 'app-crosspro',
    slug: 'crosspro',
    name: 'CrossPro',
    tagline: 'Crucigramas y rompecabezas de palabras interactivos con pistas inteligentes',
    description: `### El Desafío Definitivo de Palabras y Crucigramas 🧩
**CrossPro** es un juego interactivo de palabras cruzadas diseñado para ejercitar tu agilidad mental y ampliar tu vocabulario con un diseño visual moderno y descansado para la vista.

#### Características Clave:
- **Cuadrículas Dinámicas & Adaptativas:** Tableros organizados por dificultad desde principiante hasta experto.
- **Pistas Horizontales y Verticales:** Navegación instantánea entre definiciones con un toque en la celda correspondiente.
- **Sistema de Pistas de Asistencia:** Revela letras o palabras completas cuando te encuentres bloqueado.
- **Validación Automática & Efectos Hápticos:** Reconocimiento al completar palabras con sutil respuesta sensorial.
- **100% Offline:** Juega en cualquier momento y lugar sin necesidad de datos móviles ni Wi-Fi.`,
    icon_url: '/apps/icons/crosspro.png',
    cover_image_url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&auto=format&fit=crop&q=80',
    category: 'Juegos',
    package_name: 'space.protondev.crosspro',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/CrossPro',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-barberpoint',
    slug: 'barberpoint',
    name: 'BarberPoint',
    tagline: 'Reserva de citas para barberías y estudios de corte con agenda en vivo',
    description: `### Tu Barbería de Confianza al Alcance de tus Manos 💈✂️
**BarberPoint** conecta a clientes con barberos profesionales y estilistas, permitiendo reservar turnos en tiempo real, seleccionar servicios personalizados y recibir confirmaciones al instante.

#### Características Clave:
- **Reserva en 3 Pasos:** Selecciona el servicio deseado, tu barbero favorito y el horario disponible en la agenda.
- **Catálogo de Servicios & Precios:** Cortes de tendencia (Fade, Taper, Clásico), perfilado de barba con toalla caliente y tintes.
- **Gestión de Citas:** Visualiza tus reservas activas, cancela o reprograma con total facilidad.
- **Diseño Luxury Dark & Gold:** Interfaz oscura elegante con acabados dorados y experiencia de usuario premium.
- **100% Local-First:** Tus citas y preferencias se guardan de forma segura y privada en tu dispositivo.`,
    icon_url: '/apps/icons/barberpoint.png',
    cover_image_url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&auto=format&fit=crop&q=80',
    category: 'Estilo de Vida',
    package_name: 'space.protondev.barberpoint',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/BarberPoint',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-pacepulse',
    slug: 'pacepulse',
    name: 'PacePulse',
    tagline: 'Rastreador GPS táctico para runners con mapa en vivo y métricas de ritmo',
    description: `### Potencia tus Carreras con Precisión Quirúrgica 🏃‍♂️⚡
**PacePulse** es el monitor GPS para corredores y atletas que buscan optimizar su ritmo de carrera (pace), registrar sus rutas en tiempo real y analizar su rendimiento en cada sesión de entrenamiento.

#### Características Clave:
- **Lienzo Táctico de Ruta:** Dibuja y sigue tu recorrido sobre un mapa de alto contraste con GPS de alta precisión.
- **Métricas Clave al Instante:** Ritmo actual (min/km), velocidad media, distancia total acumulada y calorías quemadas.
- **Análisis de Splits por Kilómetro:** Compara tu rendimiento kilómetro a kilómetro para mantener una cadencia constante.
- **Estética Cyber-Athletic:** Interfaz deportiva con acentos fluorescentes de alta visibilidad diurna y nocturna.
- **Privacidad Total:** Tus datos de geolocalización se procesan localmente sin telemetría intrusiva.`,
    icon_url: '/apps/icons/pacepulse.png',
    cover_image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&auto=format&fit=crop&q=80',
    category: 'Salud y Bienestar',
    package_name: 'space.protondev.pacepulse',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/PacePulse',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-speednova',
    slug: 'speednova',
    name: 'SpeedNova',
    tagline: 'Test de velocidad de internet cyberpunk con tacómetro reactivo y diagnóstico de red',
    description: `### Mide la Velocidad Real de tu Conexión en Segundos 🚀🌐
**SpeedNova** es un velocímetro de conectividad de inspiración Cyberpunk que evalúa la velocidad de descarga, subida, latencia (ping) y jitter de tu red Wi-Fi o datos móviles 4G/5G con precisión científica.

#### Características Clave:
- **Tacómetro Reactivo Neón:** Animaciones fluidas a 60fps con escala logarítmica y efectos de glow electromagnético.
- **Diagnóstico Integral:** Medición detallada de velocidad de descarga, subida, Ping (ms) y estabilidad de conexión.
- **Historial Completo de Pruebas:** Guarda tus mediciones anteriores categorizadas por Wi-Fi o datos móviles.
- **Indicadores de Idoneidad:** Evalúa al instante si tu conexión es óptima para streaming 4K, juegos competitivos o videollamadas.
- **Sin Publicidad Invasiva:** Experiencia limpia, directa y con consumo mínimo de recursos.`,
    icon_url: '/apps/icons/speednova.png',
    cover_image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&auto=format&fit=crop&q=80',
    category: 'Utilidades',
    package_name: 'space.protondev.speednova',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/SpeedNova',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-mediagrab',
    slug: 'mediagrab',
    name: 'MediaGrab',
    tagline: 'Descargador y organizador multimedia HD con selector de resolución y audio',
    description: `### Tus Videos y Audios Favoritos Guardados con Calidad Máxima 🎬📥
**MediaGrab** es un gestor de descargas multimedia universal que te permite obtener contenido en alta definición o extraer pistas de audio directamente a la memoria de tu dispositivo.

#### Características Clave:
- **Selector de Calidad Inteligente:** Elige entre 1080p Full HD, 720p HD, 480p o audio de alta fidelidad MP3.
- **Gestor de Tareas & Cola de Descargas:** Pausa, reanuda o prioriza descargas con barras de progreso detalladas.
- **Reproductor Multimedia Incorporado:** Visualiza videos o escucha pistas descargadas sin salir de la app.
- **Detección Rápida desde Portapapeles:** Copia un enlace y MediaGrab lo detectará automáticamente listo para descargar.
- **Almacenamiento Local Ordenado:** Organiza automáticamente tus descargas en carpetas específicas de fácil acceso.`,
    icon_url: '/apps/icons/mediagrab.png',
    cover_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    category: 'Multimedia',
    package_name: 'space.protondev.mediagrab',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/MediaGrab',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-fitpulse',
    slug: 'fitpulse',
    name: 'FitPulse',
    tagline: 'Entrenador físico personal, temporizadores de intervalos y registro de progreso',
    description: `### Construye tu Mejor Versión con Rutinas Guiadas 💪🏋️
**FitPulse** es tu compañero de gimnasio y acondicionamiento físico diario, diseñado para ayudarte a llevar el registro de tus series, descansos, repeticiones y evolución corporal.

#### Características Clave:
- **Planes de Entrenamiento por Grupo Muscular:** Pecho, Espalda, Piernas, Brazos, Core y rutinas HIIT.
- **Cronómetro de Series & Descansos:** Avisos acústicos y vibración háptica para no perder la concentración entre repeticiones.
- **Control de Peso & Medidas:** Gráfica interactiva de evolución corporal y calculadora integrada de macronutrientes.
- **Interfaz Dark Ergonomic:** Diseño deportivo de alto contraste pensado para usar con una sola mano en el gimnasio.
- **100% Offline:** Todo tu historial de levantamientos y récords personales se almacenan localmente.`,
    icon_url: '/apps/icons/fitpulse.png',
    cover_image_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    category: 'Salud y Bienestar',
    package_name: 'space.protondev.fitpulse',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/FitPulse',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-chefcraft',
    slug: 'chefcraft',
    name: 'ChefCraft',
    tagline: 'Recetario gourmet inteligente, modo cocina guiado y lista interactiva de compras',
    description: `### Domina la Cocina Gourmet con Asistencia Paso a Paso 👨‍🍳🍳
**ChefCraft** transforma la preparación de tus comidas diarias y recetas gourmet en una experiencia placentera y guiada, evitando errores y organizando tus compras de supermercado.

#### Características Clave:
- **Catálogo Gourmet con Filtros:** Filtra por tiempo de preparación, nivel de dificultad, tipo de cocina o ingredientes disponibles.
- **Modo Cocina Inmersivo:** Pantalla a pantalla completa de gran legibilidad con temporizador incorporado para cada etapa.
- **Lista de Compras Inteligente:** Agrega ingredientes de cualquier receta con un solo toque y márcalos conforme compras.
- **Ficha Nutricional y Porciones:** Ajuste dinámico de cantidades según el número de comensales.
- **100% Offline-First:** Consulta tus recetas y cocina sin necesidad de conexión a internet.`,
    icon_url: '/apps/icons/chefcraft.png',
    cover_image_url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&auto=format&fit=crop&q=80',
    category: 'Estilo de Vida',
    package_name: 'space.protondev.chefcraft',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/ChefCraft',
    status: 'published',
    created_at: '2026-10-09T05:00:00Z',
    updated_at: '2026-10-09T05:00:00Z'
  },
  {
    id: 'app-swipegallery',
    slug: 'swipegallery',
    name: 'SwipeGallery',
    tagline: 'Galería de fotos y videos con limpiador Swipe interactivo estilo Tinder',
    description: `### Tu Galería Rápida con Limpiador Inteligente por Deslizamiento
**SwipeGallery** combina una galería fluida y moderna de fotos y videos con un revolucionario limpiador visual tipo tarjeta: desliza a la **derecha** para conservar tus mejores recuerdos y a la **izquierda** para enviar a la papelera fotos duplicadas, borrosas o innecesarias.

#### Características Clave:
- **Limpiador Swipe & Clean:** Revisa cientos de fotos en minutos con gestos intuitivos y físicas suaves.
- **Contador de Espacio en Tiempo Real:** Visualiza exactamente cuántos Megabytes o Gigabytes vas a liberar antes de confirmar.
- **Explorador por Álbumes:** Limpieza granular por carpetas (Cámara, Descargas, WhatsApp, Capturas de pantalla).
- **Visor Multimedia Completo:** Zoom táctil interactivo, reproductor de video, detalles del archivo y compartir nativo.
- **100% Privado y Local:** Tus fotos nunca salen de tu dispositivo ni se suben a la nube.`,
    icon_url: '/apps/icons/swipegallery.png',
    cover_image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80',
    category: 'Fotografía',
    package_name: 'space.protondev.swipe_gallery',
    platforms: ['android'],
    github_url: 'https://github.com/Andresfev999/SwipeGallery',
    status: 'published',
    created_at: '2026-09-29T23:55:00Z',
    updated_at: '2026-09-29T23:55:00Z'
  },
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
    icon_url: '/apps/flowpdf/flowpdf_icon.png',
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
    video_url: '/apps/finup/finup_showcase.mp4',
    status: 'published',
    created_at: '2026-09-25T16:00:00Z',
    updated_at: '2026-09-25T17:49:00Z'
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
