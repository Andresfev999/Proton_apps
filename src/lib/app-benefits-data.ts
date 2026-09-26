import { App } from '@/types/database';

export interface AppBenefitItem {
  title: string;
  description: string;
  result: string;
  icon: 'TrendingUp' | 'ShieldCheck' | 'Zap' | 'Clock' | 'DollarSign' | 'Lock' | 'EyeOff' | 'KeyRound' | 'Sparkles' | 'HeartHandshake' | 'Flame';
}

export interface AppAudienceItem {
  title: string;
  description: string;
  highlight: string;
}

export interface AppFaqItem {
  question: string;
  answer: string;
}

export interface AppBenefitsProfile {
  slug: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  trustPills: string[];
  problemTitle: string;
  problemDescription: string;
  beforeVsAfter: {
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };
  keyBenefits: AppBenefitItem[];
  dailyWorkflow: {
    stepNumber: string;
    title: string;
    description: string;
    timeCommitment: string;
  }[];
  targetAudience: AppAudienceItem[];
  faqs: AppFaqItem[];
  ctaHeadline: string;
  ctaSubtext: string;
}

export const APP_BENEFITS_CATALOG: Record<string, AppBenefitsProfile> = {
  finup: {
    slug: 'finup',
    heroBadge: 'Salud Financiera & Ahorro Inteligente',
    heroTitle: 'Toma el control de tu dinero y haz que tus ahorros crezcan sin estrés',
    heroSubtitle: 'Deja de preguntarte a dónde se fue tu sueldo al final del mes. FinUp te ayuda a eliminar gastos hormiga, liquidar deudas con un plan claro y tomar mejores decisiones con asesoría inteligente personalizada.',
    trustPills: ['100% Libre de Publicidad', 'Tus Datos se Quedan en tu Teléfono', 'Sin Suscripciones Ocultas', 'Funciona Sin Internet'],
    problemTitle: '¿Por qué ahorrar o controlar gastos suele ser tan frustrante?',
    problemDescription: 'La mayoría de personas no tienen problemas de ingresos, sino de visibilidad. Las hojas de cálculo son aburridas y complicadas, mientras que las apps de los bancos solo te muestran lo que ya gastaste, pero nunca te enseñan cómo mejorar tu bolsillo.',
    beforeVsAfter: {
      beforeTitle: 'Tu vida antes de FinUp',
      beforeItems: [
        'Fin de mes con la cuenta en cero y angustia constante.',
        'Gastos hormiga invisibles que se comen hasta el 30% de tu dinero.',
        'Desorden con pagos de tarjetas de crédito y préstamos.',
        'Hojas de Excel tediosas que abandonas a los 3 días.'
      ],
      afterTitle: 'Tu vida con FinUp en tu celular',
      afterItems: [
        'Claridad total: sabes exactamente cuánto puedes gastar cada día.',
        'Ahorro automático del 15% al 25% desde el primer mes.',
        'Plan anti-deudas motivador con mapa de progreso visual.',
        'Consejos claros y directos de tu asesor inteligente cada semana.'
      ]
    },
    keyBenefits: [
      {
        title: 'Tu Asesor Financiero Personal con IA',
        description: 'Un asistente inteligente analiza tus movimientos y te da consejos en palabras humanas: te dice qué recortar y cómo alcanzar tus metas más rápido.',
        result: 'Ahorro promedio del 20% sin sacrificios extremos',
        icon: 'Sparkles'
      },
      {
        title: 'Registro Rápido en 3 Segundos',
        description: 'Apunta un café, el supermercado o el transporte con 2 toques. Sin formularios eternos ni complicaciones que te hagan perder tiempo.',
        result: '0 fricción: crea el hábito sin esfuerzo diario',
        icon: 'Zap'
      },
      {
        title: 'Plan de Liquidación de Deudas',
        description: 'Organiza préstamos y tarjetas. Observa en tiempo real cómo cada abono reduce los intereses y te acerca a la libertad financiera.',
        result: 'Paz mental y reducción drástica de intereses',
        icon: 'DollarSign'
      },
      {
        title: 'Máxima Privacidad: Tu Dinero es Tuyo',
        description: 'A diferencia de otras aplicaciones, no vendemos tus datos a bancos ni aseguradoras. Tu información permanece cifrada y protegida en tu móvil.',
        result: 'Cero spam bancario y confidencialidad total',
        icon: 'ShieldCheck'
      },
      {
        title: 'Metas de Ahorro que Emocionan',
        description: 'Ponle nombre a tus sueños: tu próximo viaje, el enganche de tu casa o un fondo de emergencias. Mira tu progreso crecer día con día.',
        result: 'Motivación diaria con metas visuales claras',
        icon: 'TrendingUp'
      },
      {
        title: 'Modo DeepFi AMOLED para tu Vista',
        description: 'Interfaz en azul profundo de alta gama que no cansa tu vista cuando revisas tus números en la noche en la cama.',
        result: 'Experiencia visual premium y descanso visual',
        icon: 'Clock'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Descarga e Instala en 15 Segundos',
        description: 'Descarga el APK directo o escanea el QR con tu cámara. No requiere crear cuentas complejas ni trámites bancarios.',
        timeCommitment: '15 segundos'
      },
      {
        stepNumber: '02',
        title: 'Apunta tus Gastos al Momento',
        description: 'Cada vez que hagas una compra, anótala en un toque. La app clasifica todo de forma visual para que siempre tengas el mapa claro.',
        timeCommitment: '5 segundos por registro'
      },
      {
        stepNumber: '03',
        title: 'Revisa tu Diagnóstico Semanal',
        description: 'Tu asesor inteligente te presenta un balance claro de tu salud financiera y te felicita por tus metas cumplidas.',
        timeCommitment: '2 minutos a la semana'
      }
    ],
    targetAudience: [
      {
        title: 'Jóvenes Profesionales & Empleados',
        description: 'Que quieren dejar de vivir al día y buscan construir un fondo de emergencia sólido para su futuro.',
        highlight: 'Tranquilidad a fin de mes'
      },
      {
        title: 'Freelancers & Emprendedores',
        description: 'Con ingresos variables cada mes que necesitan ordenar cobros, gastos de negocio y ahorro personal.',
        highlight: 'Control total de flujos'
      },
      {
        title: 'Personas con Metas Claras',
        description: 'Que están planeando viajar, comprar un coche, independizarse o liberarse de deudas de tarjetas.',
        highlight: 'Metas cumplidas en tiempo récord'
      }
    ],
    faqs: [
      {
        question: '¿Tengo que ingresar mis claves de banco o tarjetas?',
        answer: 'Absolutamente NO. FinUp no solicita contraseñas bancarias ni tokens de seguridad. Tú mantienes el control total de los datos de forma 100% segura y privada.'
      },
      {
        question: '¿Tiene algún costo mensual o suscripción oculta?',
        answer: 'No. Puedes descargar FinUp de forma completamente gratuita desde este portal y comenzar a usar todas sus funciones principales de inmediato.'
      },
      {
        question: '¿Cómo instalo la aplicación en mi teléfono Android?',
        answer: 'Es muy sencillo: haz clic en "Descargar APK" (o escanea el código QR desde tu celular). Cuando termine la descarga, abre el archivo en tus notificaciones y confirma "Instalar". Si tu teléfono te pregunta, activa "Permitir desde esta fuente". ¡Queda lista en segundos!'
      },
      {
        question: '¿Puedo usar la aplicación sin conexión a internet?',
        answer: 'Sí. FinUp guarda tus movimientos localmente en tu teléfono, por lo que puedes registrar tus gastos en cualquier lugar sin depender de señal o datos móviles.'
      }
    ],
    ctaHeadline: 'Comienza a transformar tus finanzas hoy mismo',
    ctaSubtext: 'Descarga FinUp gratis en tu Android y siente la tranquilidad de tener el control de tu dinero.'
  },

  'task-pulse': {
    slug: 'task-pulse',
    heroBadge: 'Productividad & Enfoque Diario',
    heroTitle: 'Vence la procrastinación y logra en 4 horas lo que antes te tomaba todo el día',
    heroSubtitle: 'Diseñado para personas que quieren terminar sus tareas más importantes sin agotarse ni distraerse con el celular cada 5 minutos.',
    trustPills: ['Cero Distracciones', 'Técnica Pomodoro Científica', 'Sonidos de Concentración', '100% Privado'],
    problemTitle: '¿Sientes que el día pasa volando y casi no avanzaste en lo importante?',
    problemDescription: 'Vivimos rodeados de notificaciones, mensajes y urgencias ajenas. Sentarse a trabajar se ha vuelto una lucha constante contra la distracción, lo que provoca estrés, jornadas interminables y la culpa de posponer lo prioritario.',
    beforeVsAfter: {
      beforeTitle: 'Tu rutina habitual',
      beforeItems: [
        'Saltar entre 20 pestañas del navegador sin terminar ninguna.',
        'Revisar redes sociales cada 10 minutos por aburrimiento o cansancio.',
        'Listas de 40 pendientes acumulados que te generan ansiedad.',
        'Terminar el día exhausto pero sintiendo que no lograste nada.'
      ],
      afterTitle: 'Tu rutina con Task Pulse',
      afterItems: [
        'Bloques de enfoque inmersivos de 25 minutos con máxima concentración.',
        'Sonidos binaurales relajantes que aíslan el ruido ambiente.',
        'Rachas diarias que te motivan a ser constante sin quemarte.',
        'La satisfacción real de terminar temprano y disfrutar tu tiempo libre.'
      ]
    },
    keyBenefits: [
      {
        title: 'Bloques de Enfoque Profundo (Deep Work)',
        description: 'Temporizador Pomodoro calibrado con intervalos inteligentes de descanso para mantener tu mente fresca durante toda la jornada.',
        result: 'Doble de trabajo terminado en la mitad del tiempo',
        icon: 'Flame'
      },
      {
        title: 'Sonidos de Concentración Inmersivos',
        description: 'Audio ambiental y tonos binaurales científicamente diseñados para entrar en estado de flujo y acallar el ruido exterior.',
        result: 'Concentración instantánea sin distracciones',
        icon: 'Zap'
      },
      {
        title: 'Medidor de Energía Personal',
        description: 'Identifica en qué horas rinde más tu cerebro para colocar allí tus tareas más complejas y reservar tareas ligeras para la tarde.',
        result: 'Aprovecha tus picos biológicos de concentración',
        icon: 'TrendingUp'
      },
      {
        title: 'Rachas de Hábitos que Motivan',
        description: 'Visualiza tus días de constancia con un mapa visual de hábitos. Cada día completado es una victoria que refuerza tu disciplina.',
        result: 'Crea hábitos duraderos sin depender de la fuerza de voluntad',
        icon: 'Clock'
      },
      {
        title: 'Atajos Ultrarrápidos desde tu Pantalla',
        description: 'Marca tareas completadas en un pestañeo sin tener que navegar por menús molestos ni perder tu concentración.',
        result: '0 pérdida de tiempo en gestión de tareas',
        icon: 'Sparkles'
      },
      {
        title: 'Tus Tareas son 100% Privadas',
        description: 'Ninguna empresa lee tus notas de proyectos, listas ni clientes. Todo se procesa localmente en tu dispositivo.',
        result: 'Privacidad absoluta para tus ideas y proyectos',
        icon: 'ShieldCheck'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Elige tus 3 Victorias del Día',
        description: 'Al iniciar tu jornada, anota solo las 3 tareas cruciales que harán que hoy sea un día exitoso.',
        timeCommitment: '1 minuto en la mañana'
      },
      {
        stepNumber: '02',
        title: 'Activa un Bloque de Concentración',
        description: 'Ponte los audífonos, presiona iniciar y concéntrate exclusivamente en una sola tarea durante 25 minutos.',
        timeCommitment: '25 min de enfoque ininterrumpido'
      },
      {
        stepNumber: '03',
        title: 'Descansa y Celebra tu Progreso',
        description: 'Toma un descanso de 5 minutos para estirarte y revisa cómo crece tu racha de productividad semanal.',
        timeCommitment: '5 minutos de recarga'
      }
    ],
    targetAudience: [
      {
        title: 'Estudiantes & Opositores',
        description: 'Que necesitan memorizar y avanzar temarios densos sin perderse en el teléfono móvil.',
        highlight: 'Sesiones de estudio de alto rendimiento'
      },
      {
        title: 'Desarrolladores & Creadores',
        description: 'Profesionales creativos que requieren largos periodos de concentración ininterrumpida.',
        highlight: 'Estado de flujo constante'
      },
      {
        title: 'Personas que Trabajan desde Casa',
        description: 'Para separar el tiempo de trabajo del descanso y evitar trabajar hasta altas horas de la noche.',
        highlight: 'Horarios saludables y claros'
      }
    ],
    faqs: [
      {
        question: '¿Qué diferencia a Task Pulse de una app normal de notas?',
        answer: 'Las apps de notas solo acumulan listas interminables que causan agobio. Task Pulse combina tus tareas con un temporizador de enfoque, sonidos de concentración y medidores de energía para que realmente las ejecutes.'
      },
      {
        question: '¿Puedo personalizar los tiempos de trabajo y descanso?',
        answer: 'Sí. Puedes ajustar los bloques a tu ritmo: 25/5 tradicional, 50/10 para proyectos largos o sesiones personalizadas a tu gusto.'
      },
      {
        question: '¿Cómo instalo el APK en Android?',
        answer: 'Descarga el archivo desde el botón superior, tócalo en tus descargas y pulsa Instalar. Queda disponible de inmediato en tu cajón de aplicaciones.'
      }
    ],
    ctaHeadline: 'Recupera el control de tu tiempo hoy mismo',
    ctaSubtext: 'Instala Task Pulse gratis y experimenta lo que se siente terminar tus pendientes antes de las 5 PM.'
  },

  'proton-mail': {
    slug: 'proton-mail',
    heroBadge: 'Privacidad & Seguridad Garantizada',
    heroTitle: 'Tu correo 100% privado: sin publicidad invasiva y blindado contra espías',
    heroSubtitle: 'La correspondencia que protege tu intimidad. Diseñado con cifrado suizo para que nadie —ni gigantes tecnológicos ni anunciantes— pueda leer tus correos ni vender tus datos.',
    trustPills: ['Cifrado Suizo de Extremo a Extremo', 'Sin Anuncios ni Rastreadores', 'Protegido por Leyes Suizas', 'Zero-Access Security'],
    problemTitle: '¿Sabías que los proveedores tradicionales escanean tus correos para venderte publicidad?',
    problemDescription: 'La mayoría de servicios gratuitos de correo financian su modelo leyendo las confirmaciones de tus compras, tus pasajes de avión y tus conversaciones privadas para alimentar algoritmos publicitarios y perfiles de rastreo.',
    beforeVsAfter: {
      beforeTitle: 'Con correos convencionales',
      beforeItems: [
        'Anuncios dirigidos basados en lo que compras o escribes.',
        'Bandeja inundada de spam y boletines imposibles de cancelar.',
        'Rastreadores espía ocultos en las imágenes que abres.',
        'Riesgo constante de que una brecha filtre tus documentos.'
      ],
      afterTitle: 'Con Proton Mail',
      afterItems: [
        'Cero lectura de tus correos: ni siquiera nosotros podemos verlos.',
        'Bandeja limpia y rápida, libre de anuncios comerciales molestos.',
        'Bloqueo automático de píxeles y rastreadores invisibles.',
        'Tus mensajes privados solo existen entre tú y tu destinatario.'
      ]
    },
    keyBenefits: [
      {
        title: 'Cifrado de Conocimiento Cero',
        description: 'Tus correos se cifran en tu propio teléfono antes de salir. Nadie en el camino puede interceptar su contenido.',
        result: 'Confidencialidad absoluta para ti y tus contactos',
        icon: 'Lock'
      },
      {
        title: 'Bloqueo de Rastreadores Invisibles',
        description: 'Neutraliza automáticamente los píxeles espía que usan las empresas para saber cuándo y dónde abriste su correo.',
        result: 'Navegación limpia sin huellas digitales',
        icon: 'EyeOff'
      },
      {
        title: 'Mensajes con Autodestrucción',
        description: 'Envía información confidencial protegida por contraseña que se elimina automáticamente tras el tiempo que definas.',
        result: 'Tranquilidad total al enviar datos sensibles',
        icon: 'Clock'
      },
      {
        title: 'Bandeja de Entrada Inmaculada',
        description: 'Filtros inteligentes que clasifican lo esencial y mandan el correo no deseado a la basura sin molestarte.',
        result: 'Ahorro de 30 minutos semanales ordenando correo',
        icon: 'ShieldCheck'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Instala la App en tu Dispositivo',
        description: 'Descarga el APK oficial verificado con SHA-256 e instálalo con total confianza en tu Android.',
        timeCommitment: '20 segundos'
      },
      {
        stepNumber: '02',
        title: 'Inicia Sesión con tu Llave',
        description: 'Tus credenciales generan tus llaves criptográficas exclusivas en tu teléfono.',
        timeCommitment: '1 minuto'
      },
      {
        stepNumber: '03',
        title: 'Comunícate con Total Libertad',
        description: 'Envía y recibe mensajes sabiendo que tu vida personal es un territorio protegido.',
        timeCommitment: 'Tranquilidad permanente'
      }
    ],
    targetAudience: [
      {
        title: 'Personas que Valoran su Intimidad',
        description: 'Usuarios cansados de que las grandes tecnológicas moneticen sus hábitos y conversaciones privadas.',
        highlight: 'Soberanía digital'
      },
      {
        title: 'Empresarios & Profesionales',
        description: 'Abogados, médicos, consultores y ejecutivos que manejan acuerdos y documentos bajo secreto profesional.',
        highlight: 'Secreto profesional garantizado'
      }
    ],
    faqs: [
      {
        question: '¿Puedo enviar correos a personas que usan Gmail u Outlook?',
        answer: 'Sí, totalmente. Puedes escribir a cualquier dirección de correo del mundo. Incluso puedes enviarles correos cifrados con contraseña que ellos podrán abrir en un enlace seguro sin importar qué correo tengan.'
      },
      {
        question: '¿Por qué las leyes suizas protegen mi privacidad?',
        answer: 'Suiza cuenta con algunas de las leyes de protección de datos más estrictas del planeta, fuera de las jurisdicciones de vigilancia masiva de EE.UU. y la UE.'
      }
    ],
    ctaHeadline: 'Toma el control de tu privacidad digital hoy',
    ctaSubtext: 'Descarga la app oficial de Proton Mail y disfruta de una bandeja de entrada verdaderamente libre de espías.'
  },

  'proton-pass': {
    slug: 'proton-pass',
    heroBadge: 'Protección de Identidad & Claves',
    heroTitle: 'No vuelvas a olvidar una contraseña ni uses la misma en todas partes',
    heroSubtitle: 'Guarda todas tus claves en una bóveda ultra protegida, autocompleta accesos en 1 segundo y crea alias de correo para que las páginas web nunca conozcan tu dirección real.',
    trustPills: ['Autocompletado Rápido', 'Generador de Alias Anti-Spam', 'Autenticador 2FA Integrado', 'Auditoría de Brechas'],
    problemTitle: '¿Usas la misma contraseña para todo por miedo a olvidarla?',
    problemDescription: 'Memorizar decenas de contraseñas complejas es imposible. Por eso la mayoría usa la misma clave o variaciones sencillas. El problema: cuando un solo sitio sufre un hackeo, los atacantes usan esa misma clave para entrar a tu banco, tu correo y tus redes sociales.',
    beforeVsAfter: {
      beforeTitle: 'El peligro diario',
      beforeItems: [
        'La misma clave débil en 15 páginas distintas.',
        'Perder tiempo solicitando "Olvidé mi contraseña" cada semana.',
        'Tu correo expuesto en listas de spam y páginas dudosas.',
        'Miedo continuo a sufrir un hackeo de cuentas bancarias.'
      ],
      afterTitle: 'La tranquilidad con Proton Pass',
      afterItems: [
        'Contraseñas únicas y casi imposibles de hackear para cada sitio.',
        'Inicio de sesión en 1 toque con autocompletado en tu celular.',
        'Alias de correo desechables: tu correo personal nunca se filtra.',
        'Alertas instantáneas si un servicio tuyo sufre una brecha.'
      ]
    },
    keyBenefits: [
      {
        title: 'Autocompletado Mágico en 1 Toque',
        description: 'Abre cualquier app o página web y tus credenciales se completan automáticamente tras validar tu huella dactilar o rostro.',
        result: 'Acceso instantáneo a cualquier servicio sin escribir',
        icon: 'Zap'
      },
      {
        title: 'Alias Hide-My-Email',
        description: 'Crea correos alternativos aleatorios para registrarte en tiendas o promociones. Los correos te llegan a tu bandeja, pero ellos jamás sabrán tu email real.',
        result: '0 spam y cero riesgo de que vendan tu email principal',
        icon: 'EyeOff'
      },
      {
        title: 'Generador de Claves Militares',
        description: 'Crea contraseñas criptográficamente fuertes con un clic. No necesitas memorizarlas, Proton Pass las cuida por ti.',
        result: 'Blindaje total contra ataques de fuerza bruta',
        icon: 'KeyRound'
      },
      {
        title: 'Códigos 2FA sin Apps Extra',
        description: 'Integra los códigos de doble factor directamente en cada ficha de contraseña. Olvídate de abrir otra app de autenticación.',
        result: 'Máxima seguridad sin complicaciones innecesarias',
        icon: 'ShieldCheck'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Instala y Activa el Autocompletado',
        description: 'Descarga el APK y permite el servicio de autocompletado en los ajustes de tu Android en 2 toques.',
        timeCommitment: '30 segundos'
      },
      {
        stepNumber: '02',
        title: 'Inicia Sesión con tu Huella',
        description: 'Tu bóveda se desbloquea únicamente con tu biometría o tu contraseña maestra privada.',
        timeCommitment: '1 segundo'
      },
      {
        stepNumber: '03',
        title: 'Navega Seguro por Internet',
        description: 'Cada vez que te registres en un nuevo sitio, genera una clave segura y un alias de correo con un solo toque.',
        timeCommitment: 'Automático'
      }
    ],
    targetAudience: [
      {
        title: 'Cualquier Usuario con Cuentas Digitales',
        description: 'Para quienes tienen decenas de contraseñas de bancos, tiendas, redes y servicios y quieren simplificar su vida.',
        highlight: 'Cero olvidos de claves'
      },
      {
        title: 'Compradores Online',
        description: 'Que quieren registrarse en tiendas online sin quedar suscritos para siempre a publicidad invasiva.',
        highlight: 'Compras seguras sin spam'
      }
    ],
    faqs: [
      {
        question: '¿Qué pasa si pierdo mi teléfono?',
        answer: 'Tus contraseñas están cifradas en la nube suiza con tu contraseña maestra. Al instalar la app en tu nuevo dispositivo e ingresar tu clave, recuperarás toda tu bóveda intacta.'
      },
      {
        question: '¿Alguien en Proton puede ver mis contraseñas guardadas?',
        answer: 'No. Se utiliza cifrado de extremo a extremo de conocimiento cero. Ni los ingenieros ni los servidores de Proton tienen la clave para descifrar tus credenciales.'
      }
    ],
    ctaHeadline: 'Protege tu identidad y tus cuentas hoy mismo',
    ctaSubtext: 'Descarga Proton Pass y olvídate para siempre del estrés de memorizar contraseñas.'
  },

  'proton-vpn': {
    slug: 'proton-vpn',
    heroBadge: 'Navegación Libre & Red Segura',
    heroTitle: 'Navega por internet con libertad total, alta velocidad y seguridad absoluta',
    heroSubtitle: 'Conéctate con tranquilidad en cafeterías, aeropuertos y redes públicas. Protege tu dirección IP, desbloquea series y plataformas de otros países y navega sin censura ni registros.',
    trustPills: ['Sin Límites de Datos Ocultos', 'Servidores de Alta Velocidad 10 Gbps', 'Cero Registros Auditado', 'Protección en Wi-Fi Público'],
    problemTitle: '¿Sabías que conectarte a Wi-Fi abiertas expone tus datos bancarios y personales?',
    problemDescription: 'Las redes públicas de hoteles, cafeterías y plazas no están protegidas. Cualquier persona con conocimientos básicos en la misma red puede interceptar lo que haces en línea. Además, tu proveedor de internet habitual registra todo tu historial de navegación.',
    beforeVsAfter: {
      beforeTitle: 'Navegar sin VPN',
      beforeItems: [
        'Vulnerable a robo de datos en redes Wi-Fi públicas.',
        'Bloqueo geográfico de contenidos cuando viajas al extranjero.',
        'Tu operadora telefónica registrando y monetizando tus búsquedas.',
        'Censura en páginas o servicios restringidos en tu región.'
      ],
      afterTitle: 'Navegar con Proton VPN',
      afterItems: [
        'Túnel cifrado impenetrable en cualquier red inalámbrica.',
        'Acceso libre a contenidos de todo el mundo cambiando de país.',
        'Tu dirección IP real queda completamente oculta.',
        'Cero registros de navegación avalado por auditorías externas suizas.'
      ]
    },
    keyBenefits: [
      {
        title: 'Blindaje en Redes Wi-Fi Abiertas',
        description: 'Cifra todo el tráfico que entra y sale de tu móvil para que nadie en la cafetería o aeropuerto pueda espiar tus contraseñas.',
        result: 'Conexión 100% segura en cualquier parte del mundo',
        icon: 'ShieldCheck'
      },
      {
        title: 'Acceso Global sin Fronteras',
        description: 'Conéctate a cientos de servidores en decenas de países para disfrutar de tus plataformas de streaming y noticias sin bloqueos regionales.',
        result: 'Internet abierto y sin restricciones geográficas',
        icon: 'Zap'
      },
      {
        title: 'Política Estricta de Cero Registros',
        description: 'Auditado independientemente: no guardamos registros de los sitios que visitas, tus descargas ni el tiempo de tu sesión.',
        result: 'Tu historial de navegación es solo tuyo',
        icon: 'EyeOff'
      },
      {
        title: 'Velocidad Fluida para Video y Juegos',
        description: 'Infraestructura de 10 Gbps con tecnología VPN Accelerator para navegar y ver series en 4K sin interrupciones ni bajas de velocidad.',
        result: 'Navegación veloz sin cortes ni retrasos',
        icon: 'TrendingUp'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Descarga e Instala el APK',
        description: 'Instala la aplicación en tu móvil Android desde este enlace seguro y directo.',
        timeCommitment: '20 segundos'
      },
      {
        stepNumber: '02',
        title: 'Conéctate con 1 Solo Toque',
        description: 'Presiona el botón de conexión rápida y la app elegirá el servidor más veloz disponible para ti.',
        timeCommitment: '2 segundos'
      },
      {
        stepNumber: '03',
        title: 'Disfruta de la Red sin Preocupaciones',
        description: 'Navega, trabaja y reproduce contenidos sabiendo que nadie puede espiar tu conexión.',
        timeCommitment: 'Protección continua'
      }
    ],
    targetAudience: [
      {
        title: 'Viajeros & Nómadas Digitales',
        description: 'Que se conectan frecuentemente a redes de hoteles, aeropuertos y espacios de coworking.',
        highlight: 'Seguridad en cualquier país'
      },
      {
        title: 'Amantes del Streaming',
        description: 'Que desean acceder a catálogos internacionales de series, eventos deportivos y películas.',
        highlight: 'Catálogos globales sin límites'
      }
    ],
    faqs: [
      {
        question: '¿Proton VPN hace más lenta mi conexión a internet?',
        answer: 'Gracias a su tecnología patentada VPN Accelerator y servidores de 10 Gbps, la reducción de velocidad es casi imperceptible en el uso cotidiano, navegación y streaming.'
      },
      {
        question: '¿Es legal usar una VPN?',
        answer: 'Sí, el uso de VPN es totalmente legal en la inmensa mayoría de los países democráticos y es recomendado como una práctica básica de ciberseguridad personal.'
      }
    ],
    ctaHeadline: 'Navega con libertad y seguridad absoluta hoy',
    ctaSubtext: 'Descarga Proton VPN gratis en tu Android y navega sin límites ni espías.'
  }
};

/**
 * Retorna el perfil orientado a beneficios del cliente.
 * Si la app fue creada dinámicamente en el CMS y no está en el catálogo estático,
 * genera una vista rica y orientada al cliente basada en su categoría, nombre y propuesta.
 */
export function getAppBenefits(slug: string, app?: App | null): AppBenefitsProfile {
  if (APP_BENEFITS_CATALOG[slug]) {
    return APP_BENEFITS_CATALOG[slug];
  }

  // Generador inteligente de propuesta de valor para apps dinámicas
  const name = app?.name || 'Esta Aplicación';
  const category = app?.category || 'Utilidades';
  const tagline = app?.tagline || 'Herramienta diseñada para simplificar tu rutina y mejorar tus resultados.';

  return {
    slug,
    heroBadge: `${category} • Solución Diseñada para Ti`,
    heroTitle: `${name}: La forma más fácil de ${tagline.toLowerCase()}`,
    heroSubtitle: `Diseñado especialmente para resolver tus necesidades cotidianas de ${category.toLowerCase()} sin complicaciones técnicas, sin anuncios invasivos y con la máxima rapidez.`,
    trustPills: ['Instalación Inmediata', '100% Libre de Publicidad', 'Privacidad Garantizada', 'Sin Fricción'],
    problemTitle: `¿Por qué necesitas una herramienta como ${name}?`,
    problemDescription: `Las opciones tradicionales suelen ser lentas, complicadas o llenas de publicidad molesta. ${name} fue creada para darte exactamente lo que necesitas en segundos, con una experiencia limpia y confiable.`,
    beforeVsAfter: {
      beforeTitle: 'Antes de tener la app',
      beforeItems: [
        'Procesos lentos y desorganizados.',
        'Pérdida de tiempo valioso en tareas repetitivas.',
        'Falta de claridad en tus resultados diarios.',
        'Herramientas complicadas y difíciles de usar.'
      ],
      afterTitle: `Con ${name} en tu celular`,
      afterItems: [
        'Solución rápida en 2 toques desde tu teléfono.',
        'Ahorro de tiempo real cada día.',
        'Claridad y organización sin esfuerzo.',
        'Interfaz moderna, fluida y agradable a la vista.'
      ]
    },
    keyBenefits: [
      {
        title: 'Ahorro de Tiempo Inmediato',
        description: 'Realiza tus tareas clave en segundos gracias a un diseño intuitivo pensado para personas reales.',
        result: 'Más tiempo libre para lo que de verdad te importa',
        icon: 'Zap'
      },
      {
        title: 'Tu Información Está Protegida',
        description: 'Tus datos se procesan con los más altos estándares de seguridad y respeto a tu intimidad.',
        result: 'Paz mental y cero venta de tus datos',
        icon: 'ShieldCheck'
      },
      {
        title: 'Experiencia Limpia y sin Interrupciones',
        description: 'Disfruta de todas las funciones sin ventanas emergentes de publicidad ni suscripciones engañosas.',
        result: '0 distracciones y máxima comodidad',
        icon: 'Sparkles'
      },
      {
        title: 'Rendimiento Fluido en tu Teléfono',
        description: 'Optimizada para consumir poca batería y espacio en tu almacenamiento.',
        result: 'Tu móvil sigue rápido y con batería duradera',
        icon: 'TrendingUp'
      }
    ],
    dailyWorkflow: [
      {
        stepNumber: '01',
        title: 'Descarga en 1 Clic',
        description: 'Obtén el paquete APK directamente en tu teléfono o escanea el código QR.',
        timeCommitment: '15 segundos'
      },
      {
        stepNumber: '02',
        title: 'Abre la App al Instante',
        description: 'Comienza a disfrutar de sus funciones sin formularios largos ni procesos tediosos.',
        timeCommitment: 'Inmediato'
      },
      {
        stepNumber: '03',
        title: 'Disfruta de los Resultados',
        description: `Siente la diferencia de tener una herramienta diseñada para ayudarte en tu día a día.`,
        timeCommitment: 'Día a día'
      }
    ],
    targetAudience: [
      {
        title: 'Personas que Valoran su Tiempo',
        description: 'Que buscan herramientas eficaces que cumplan lo que prometen sin vueltas.',
        highlight: 'Eficiencia garantizada'
      },
      {
        title: 'Usuarios que Prefieren Calidad',
        description: 'Que eligen aplicaciones bien diseñadas, fluidas y libres de publicidad molesta.',
        highlight: 'Experiencia premium'
      }
    ],
    faqs: [
      {
        question: `¿Cómo instalo ${name} en mi dispositivo Android?`,
        answer: 'Solo presiona el botón "Descargar APK", abre el archivo descargado en tus notificaciones y confirma la instalación. Es 100% seguro y directo.'
      },
      {
        question: '¿Tiene costo usar la aplicación?',
        answer: 'No, puedes descargarla de forma gratuita desde este portal y comenzar a usarla de inmediato.'
      },
      {
        question: '¿Es compatible con mi teléfono?',
        answer: 'La aplicación es compatible con prácticamente todos los teléfonos Android modernos (Android 8.0 en adelante).'
      }
    ],
    ctaHeadline: `Comienza a usar ${name} hoy mismo`,
    ctaSubtext: `Descarga gratis en tu Android y comprueba cómo puede ayudarte desde el primer minuto.`
  };
}
