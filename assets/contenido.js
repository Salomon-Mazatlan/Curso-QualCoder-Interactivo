// Course content. Edit this file to change missions, videos and activities.
// Activity types: quiz, parejas, secuencia, codificar, clasificar, abierta, interfaz, dialogo.

const CURSO = {
  titulo: "Codificar en QualCoder 4",
  subtitulo: "Diez misiones de práctica",
  duracion: "entre dos y tres horas y media",
  huecosVisibles: true, // pon false al publicar para ocultar los recuadros de captura vacíos

  // Code colors used by the coding activities.
  paleta: {
    amarillo: "#F2C744",
    turquesa: "#2FA8A0",
    coral: "#E4577C",
    violeta: "#7A5CD6",
    verde: "#5FA05A"
  },

  // Ranks unlocked by accumulated XP.
  rangos: [
    { xp: 0, nombre: "Aprendiz de campo" },
    { xp: 130, nombre: "Libreta en mano" },
    { xp: 300, nombre: "Codificación en marcha" },
    { xp: 490, nombre: "Analista de corpus" },
    { xp: 700, nombre: "Oficio de campo" }
  ],

  // Simulated QualCoder 4 window used by the "interfaz" and "codificar" activities.
  // Menu structure taken from the QualCoder 4 user manual.
  interfaz: {
    proyecto: "Cuidados_2026.qda",
    codificador: "default",
    pestanas: [
      { id: "registro", t: "Registro de acciones",
        d: "Donde el programa habla. Versión y cita del software, avisos de copias de seguridad, mensajes de las operaciones y resultados de algunos informes.",
        tip: "Míralo después de abrir el proyecto y después de cualquier operación grande. Varios avisos aparecen ahí y en ningún otro sitio.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Registro de acciones", pie: "" } },
      { id: "gestionar", t: "Gestionar",
        d: "Aloja los módulos de archivos, casos, atributos, diarios y referencias, y mientras no haya ninguno abierto muestra su panel de bienvenida.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Gestionar", pie: "" } },
      { id: "codificar", t: "Codificación",
        d: "Aloja los módulos de codificación. Los módulos se abren dentro de la pestaña, no en ventanas flotantes.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificar", pie: "" } },
      { id: "informes", t: "Informes",
        d: "Aloja los módulos de reportes y visualización.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Informes", pie: "" } },
      { id: "agente", t: "Agente de IA",
        d: "La conversación con el agente sobre el proyecto, cuando la IA está configurada.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Agente de IA", pie: "" } }
    ],
    menus: [
      {
        id: "proyecto", nombre: "Proyecto", items: [
          { id: "crear", t: "Crear un proyecto nuevo", k: "Control+N",
            en: "Create new project",
            d: "Pide nombre y ubicación y construye la carpeta .qda con sus subcarpetas y la base de datos vacía.",
            tip: "El nombre de la carpeta aparece en cada exportación, y las copias de seguridad se guardan junto al proyecto. Elige un sitio con espacio.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Crear un proyecto nuevo", pie: "" } },
          { id: "abrir", t: "Abrir proyecto", k: "Control+O",
            en: "Open project",
            d: "Abre un proyecto existente. Si la opción está activa, crea una copia de seguridad al abrirlo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Abrir proyecto", pie: "" } },
          { id: "recientes", t: "Abrir un proyecto reciente", sub: true,
            en: "Open recent project",
            d: "Submenú con los proyectos abiertos últimamente. La lista vive en la carpeta de configuración, no en el proyecto.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Abrir un proyecto reciente", pie: "" } },
          { id: "cerrar", t: "Cerrar proyecto", k: "Alt+X",
            en: "Close project",
            d: "Cierra los módulos abiertos, confirma los cambios pendientes y depura las copias de seguridad.",
            tip: "Cerrar antes de salir no es obligatorio pero sí buena práctica, sobre todo si el proyecto está en una carpeta sincronizada en la nube.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Cerrar proyecto", pie: "" } },
          { id: "memo", t: "Memo del proyecto", k: "Control+M",
            en: "Project memo",
            d: "El memo general del proyecto, que viaja con él y aparece en el resumen.",
            tip: "Es el sitio para la descripción que después será tu sección de método. Qué se investiga, con qué material, quién codifica y qué decisiones de diseño se tomaron.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Memo del proyecto", pie: "" } },
          { id: "ajustes", t: "Configuración", k: "Alt+S",
            en: "Settings",
            d: "Las preferencias del programa. Idioma, tamaños de fuente, estilo de resaltado, copias de seguridad, nombre del codificador y ajustes de IA.",
            tip: "Cambia el nombre del codificador antes de marcar nada. Todo lo que codifiques queda firmado, y reparar codificaciones firmadas mal cuesta mucho.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Configuración", pie: "" } },
          { id: "resumen", t: "Resumen del proyecto",
            en: "Project summary",
            d: "Informe de estado en el registro de acciones. Recuentos de archivos, casos, códigos y atributos, más la lista de vínculos rotos.",
            tip: "Ejecútalo al retomar un proyecto viejo o al cambiar de computadora, y otra vez antes de archivarlo o entregarlo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Resumen del proyecto", pie: "" } },
          { id: "importar", t: "Importar", sub: true,
            en: "Import",
            d: "Submenú de importación. De aquí cuelga la importación de encuestas desde CSV o XLSX, que crea de una pasada los casos, los atributos y un archivo de texto por respuesta.",
            tip: "Deja las preguntas cerradas como atributos y las abiertas como archivos. Así puedes comparar respuestas por perfil desde el primer día.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Importar", pie: "" } },
          { id: "exportar", t: "Exportar", sub: true,
            en: "Export",
            d: "Submenú de exportación. Permite sacar el proyecto en el estándar REFI-QDA o solo el libro de códigos.",
            tip: "El libro de códigos con memos es el anexo que piden muchas revistas y comités de tesis.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Exportar", pie: "" } },
          { id: "salir", t: "Salir", k: "Control+Q",
            en: "Exit",
            d: "Cierra el programa.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Salir", pie: "" } }
        ]
      },
      {
        id: "gestionar", nombre: "Gestionar", items: [
          { id: "archivos", t: "Archivos", k: "Alt+F",
            en: "Files",
            d: "La puerta de entrada del material. Importar, vincular, crear, renombrar y asignar atributos, con filtros por columna en la tabla.",
            tip: "Copiar deja el proyecto autónomo, vincular deja los archivos fuera y esos vínculos se rompen al cambiar de computadora. Vincular solo tiene sentido con video pesado.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Archivos", pie: "" } },
          { id: "casos", t: "Casos", k: "Alt+C",
            en: "Cases",
            d: "Agrupa el material de una misma persona o unidad, aunque esté repartido en varios archivos o en tramos de uno solo.",
            tip: "Los casos son lo que permite decir cuántas personas dijeron algo, no cuántas veces se dijo. Sin ellos, un participante hablador se ve como una tendencia.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Casos", pie: "" } },
          { id: "diarios", t: "Diarios", k: "Alt+J",
            en: "Journals",
            d: "Bitácora fechada del proceso. Es el único módulo que se abre en ventana propia, así que se puede escribir mientras se codifica.",
            tip: "Un diario metodológico y otro de campo. El primero justifica tus decisiones ante un comité, el segundo guarda lo que viste y no cabía en la transcripción.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Diarios", pie: "" } },
          { id: "atributos", t: "Atributos", k: "Alt+A",
            en: "Attributes",
            d: "Variables de texto o numéricas que describen archivos o casos. Edad, sexo, municipio, años cuidando.",
            tip: "Sin atributos no hay comparación entre grupos, porque los informes no tienen con qué filtrar. Cárgalos antes de codificar en serio.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Atributos", pie: "" } },
          { id: "referencias", t: "Referencias", k: "Alt+R",
            en: "References",
            d: "Gestión bibliográfica del proyecto, con importación desde archivos RIS o desde Zotero, y vinculación de referencias a archivos.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Referencias", pie: "" } },
          { id: "enlaces", t: "Vínculos rotos a archivos",
            en: "Bad links to files",
            d: "Localiza los archivos vinculados que ya no están en su ruta y permite restablecerla. Aparece atenuado cuando no hay ninguno roto.",
            tip: "El resumen del proyecto los detecta y este módulo los repara. Con archivos copiados en vez de vinculados el problema no existe.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Vínculos rotos a archivos", pie: "" } }
        ]
      },
      {
        id: "codificar", nombre: "Codificación", items: [
          { id: "texto", t: "Codificar texto", k: "Alt+T",
            en: "Code text",
            d: "El módulo central. Lista de documentos, árbol de códigos, documento con su margen de franjas de color y las teclas de trabajo.",
            tip: "Codificar aquí es cosa de teclado. Q marca, V crea un código in vivo, A anota, M abre el memo de la codificación y U desmarca.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificar texto", pie: "" } },
          { id: "imagen", t: "Codificar imagen", k: "Alt+I",
            en: "Code image",
            d: "Asigna códigos a regiones rectangulares de una imagen. La unidad no es texto, es un área con su posición y su tamaño.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificar imagen", pie: "" } },
          { id: "av", t: "Codificar audio y video", k: "Alt+V",
            en: "Code audio/video",
            d: "Codifica el medio por tiempo y su transcripción por posición, y mantiene el vínculo entre los dos.",
            tip: "Codificar sobre el audio conserva el tono, la pausa y el silencio, que la transcripción borra. Para algunos análisis eso es el dato.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificar audio y video", pie: "" } },
          { id: "pdf", t: "Codificar PDF",
            en: "Code pdf",
            d: "Codifica sobre el PDF conservando su maquetación, trabajando a la vez con la página y con el texto extraído.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificar PDF", pie: "" } },
          { id: "ia", t: "Codificación asistida por IA",
            en: "AI assisted coding",
            d: "Búsqueda y propuesta de codificación con inteligencia artificial, sobre los códigos que ya definiste.",
            tip: "Sirve para encontrar candidatos, no para decidir. Lo que no revisaste segmento por segmento no es tuyo y no deberías defenderlo en un examen.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificación asistida por IA", pie: "" } },
          { id: "organizador", t: "Organizador de códigos",
            en: "Code organiser",
            d: "Lienzo para reordenar el sistema de códigos moviendo códigos y categorías, útil cuando el árbol creció demasiado.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Organizador de códigos", pie: "" } },
          { id: "colores", t: "Esquema de color", k: "Alt+E",
            en: "Colour scheme",
            d: "Asigna colores en bloque a una rama, con una paleta amplia y simulación de distintas formas de visión cromática.",
            tip: "Un color por familia de códigos hace que el documento codificado se lea de un vistazo. Y la simulación evita elegir una paleta que un coautor no distingue.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Esquema de color", pie: "" } }
        ]
      },
      {
        id: "analisis", nombre: "Análisis", items: [
          { id: "recuperacion", t: "Recuperación de códigos", k: "Alt+K",
            en: "Code retrieval",
            d: "Junta todos los segmentos de los códigos que elijas, con su archivo de origen, filtrables por casos y atributos.",
            tip: "Es la prueba de fuego de un código. Si los segmentos recuperados no se parecen entre sí, el código está haciendo demasiado trabajo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Recuperación de códigos", pie: "" } },
          { id: "coocurrencia", t: "Co-ocurrencia de códigos",
            en: "Code co-occurrence",
            d: "Muestra qué códigos se solapan en el mismo material y con qué frecuencia.",
            tip: "Una co-ocurrencia alta puede ser un hallazgo o puede ser que dos códigos digan lo mismo. Mira los segmentos antes de decidir cuál de las dos.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Co-ocurrencia de códigos", pie: "" } },
          { id: "relaciones", t: "Relaciones entre códigos", k: "Alt+Q",
            en: "Code relations",
            d: "Analiza cómo se relacionan las codificaciones entre sí dentro de los archivos, más allá de la simple coincidencia.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Relaciones entre códigos", pie: "" } },
          { id: "exactas", t: "Coincidencias exactas del texto codificado",
            en: "Code text exact matches",
            d: "Encuentra segmentos idénticos codificados con varios códigos, útil para detectar codificación redundante.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Coincidencias exactas del texto codificado", pie: "" } },
          { id: "segmentos", t: "Códigos por segmentos de texto",
            en: "Codes by text segments",
            d: "Recorre el material segmento a segmento mostrando qué códigos recibió cada tramo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Códigos por segmentos de texto", pie: "" } },
          { id: "grafo", t: "Grafo", k: "Alt+G",
            en: "Graph",
            d: "Lienzo donde códigos, categorías, casos, archivos y memos se ven como nodos que puedes mover y conectar.",
            tip: "Sirve para pensar, no solo para ilustrar. Arrastrar una rama y verla junto a los casos suele mostrar relaciones que la lista de códigos esconde.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Grafo", pie: "" } },
          { id: "ia_analisis", t: "Análisis asistido por IA", sub: true,
            en: "AI assisted analysis",
            d: "Submenú con las funciones de análisis apoyadas en inteligencia artificial.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Análisis asistido por IA", pie: "" } }
        ]
      },
      {
        id: "informes", nombre: "Informes", items: [
          { id: "comparacion", t: "Comparación de codificación", k: "Alt+L",
            en: "Coding comparison",
            d: "Compara dos codificadores código por código en todo el corpus, con porcentajes de acuerdo y kappa de Cohen.",
            tip: "El coeficiente mide, no resuelve. Cuando el acuerdo baja, lo que hay que revisar es el memo de cada código, no la fórmula.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Comparación de codificación", pie: "" } },
          { id: "comparacion_archivo", t: "Comparación de codificación por archivo", k: "Alt+M",
            en: "Coding comparison by file",
            d: "Lo mismo dentro de un archivo concreto, con texto, imagen y audio o video.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Comparación de codificación por archivo", pie: "" } },
          { id: "conteos", t: "Recuento de códigos por archivo o caso",
            en: "Code counts by file/case",
            d: "Cómo se reparte cada código entre los archivos o entre los casos.",
            tip: "Aquí se ve si un tema es del corpus o de una sola persona. Es el dato honesto cuando vas a escribir que algo apareció de manera recurrente.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Recuento de códigos por archivo o caso", pie: "" } },
          { id: "frecuencias", t: "Frecuencias de códigos", k: "Alt+N",
            en: "Code frequencies",
            d: "Cuántas veces se aplicó cada código, en total y por codificador.",
            tip: "La cuenta describe tu codificación, no el campo. Un código con noventa apariciones puede ser importante o puede ser que lo estés aplicando a todo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Frecuencias de códigos", pie: "" } },
          { id: "resumen_archivo", t: "Resumen de archivos", k: "Alt+O",
            en: "File summary",
            d: "Qué hay dentro de un archivo concreto, incluido su origen, copiado o vinculado.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Resumen de archivos", pie: "" } },
          { id: "resumen_codigo", t: "Resumen de códigos", k: "Alt+P",
            en: "Code summary",
            d: "Qué hay detrás de un código concreto, con sus recuentos y su reparto.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Resumen de códigos", pie: "" } },
          { id: "graficas", t: "Gráficos", k: "Alt+U",
            en: "Charts",
            d: "Figuras a partir de la codificación, contando por frecuencia, por caracteres codificados o por área de imagen.",
            tip: "Elige la unidad a conciencia. Frecuencia dice cuántas veces apareció el tema, caracteres dice cuánto espacio ocupó, y no siempre coinciden.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Gráficos", pie: "" } },
          { id: "consultas", t: "Consultas a la base de datos", k: "Alt+D",
            en: "Database queries",
            d: "SQL directo sobre la base del proyecto, con consultas predefinidas y espacio para las tuyas.",
            tip: "Es la ventaja de tener el formato abierto. Cualquier conteo que el programa no ofrezca lo puedes sacar tú, sin depender de nadie.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Consultas a la base de datos", pie: "" } }
        ]
      },
      {
        id: "ia", nombre: "IA", items: [
          { id: "agente", t: "Chat con el Agente de IA",
            en: "Chat with the AI Agent",
            d: "Conversación sobre el proyecto, con acceso al material y enlaces que llevan al segmento citado.",
            tip: "Pídele que te muestre de dónde sale cada afirmación. Si no puede señalar el segmento, no lo uses en tus resultados.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Chat con el Agente de IA", pie: "" } },
          { id: "lateral", t: "Vista lateral del Agente",
            en: "Agent side view",
            d: "Casilla que deja el agente abierto en un panel al costado, para consultarlo mientras trabajas.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Vista lateral del Agente", pie: "" } },
          { id: "codificacion_ia", t: "Codificación asistida por IA",
            en: "AI Assisted Coding",
            d: "La misma entrada que está en el menú Codificación.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Codificación asistida por IA", pie: "" } },
          { id: "prompts", t: "Biblioteca de prompts",
            en: "Prompt library",
            d: "Editor de los prompts analíticos que usa el programa, para adaptarlos a tu enfoque.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Biblioteca de prompts", pie: "" } },
          { id: "preparacion", t: "Comprobar la preparación del proyecto para la IA",
            en: "Check project readiness for AI",
            d: "Revisa si el proyecto cumple las condiciones para usar las funciones de inteligencia artificial.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Comprobar la preparación del proyecto para la IA", pie: "" } },
          { id: "asistente", t: "Asistente de configuración",
            en: "Setup Wizard",
            d: "Guía la configuración inicial de la IA y la activa. Sin este paso el resto del menú aparece inactivo.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Asistente de configuración", pie: "" } },
          { id: "ajustes_ia", t: "Configuración",
            en: "Settings",
            d: "Abre las preferencias en la sección de IA, con el proveedor, el modelo y las claves.",
            tip: "Revisa a dónde viajan tus datos antes de activar nada. Con material sensible, un modelo local evita mandar entrevistas a un servidor ajeno.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Configuración", pie: "" } },
          { id: "memoria", t: "Reconstruir la memoria interna",
            en: "Rebuild internal memory",
            d: "Vuelve a leer todos los documentos del proyecto para rehacer el índice de búsqueda semántica.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Reconstruir la memoria interna", pie: "" } }
        ]
      },
      {
        id: "ayuda", nombre: "Ayuda", items: [
          { id: "contenido", t: "Contenido", k: "Alt+H",
            en: "Contents",
            d: "Abre la documentación en el navegador. Es en línea, así que requiere conexión.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Contenido", pie: "" } },
          { id: "preguntar", t: "Preguntar al Agente de IA",
            en: "Ask the AI Agent",
            d: "El agente, orientado a preguntas sobre el uso del propio programa.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Preguntar al Agente de IA", pie: "" } },
          { id: "acerca", t: "Acerca de", k: "Alt+Y",
            en: "About",
            d: "Versión, autoría y licencia.",
            tip: "Ahí está la cita del software. Citar el programa de análisis es parte de la descripción del método, igual que citar el paquete estadístico.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Acerca de", pie: "" } },
          { id: "especiales", t: "Funciones especiales", k: "Alt+Z",
            en: "Special functions",
            d: "Fusionar dos proyectos, sustituir el texto de un archivo conservando sus codificaciones y desplazar posiciones de codificación.",
            tip: "Son operaciones sin marcha atrás y las copias automáticas rotan. Copia la carpeta del proyecto a mano antes de entrar aquí.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Funciones especiales", pie: "" } },
          { id: "atajos", t: "Atajos de teclado",
            en: "Keyboard shortcuts",
            d: "Vuelca la lista completa de atajos en el registro de acciones.",
            img: { src: "assets/img/ejemplo.png", titulo: "Captura de Atajos de teclado", pie: "" } }
        ]
      }
    ],
    // Right-click menu over a code in the code tree.
    contextual: [
      { id: "crear_codigo", t: "Crear un código nuevo (Create new code)" },
      { id: "crear_categoria", t: "Crear una categoría nueva" },
      { id: "subcodigo", t: "Añadir un subcódigo nuevo al código" },
      { id: "archivos_codificados", t: "Mostrar archivos codificados" },
      { id: "renombrar", t: "Renombrar", k: "F2" },
      { id: "memo", t: "Ver o editar memo", k: "F3" },
      { id: "color", t: "Cambiar el color del código", k: "F5" },
      { id: "mover", t: "Mover el código a", k: "F6" },
      { id: "fusionar", t: "Fusionar el código en otro código", k: "F8" },
      { id: "eliminar", t: "Eliminar", k: "Supr" }
    ],
    // Right-click menu over the document text.
    contextual_texto: [
      { id: "marcar", t: "Marcar", k: "Q" },
      { id: "reciente", t: "Marcar con código reciente", k: "R" },
      { id: "nuevo", t: "Marcar con un código nuevo", k: "N" },
      { id: "invivo", t: "Código in vivo", k: "V" },
      { id: "memo", t: "Memo del texto codificado", k: "M" },
      { id: "anotar", t: "Anotar", k: "A" },
      { id: "desmarcar", t: "Desmarcar", k: "U" }
    ],
    codigos: [
      { nombre: "Abandono del empleo", color: "coral" },
      { nombre: "Culpa", color: "violeta" },
      { nombre: "Sentimiento de culpa", color: "violeta" },
      { nombre: "Duración imprevista", color: "turquesa" },
      { nombre: "Reparto desigual", color: "amarillo" }
    ],
    archivos: ["E01_Rosa.txt", "E02_Alicia.txt", "E03_Delia.docx", "E04_Marta.txt"],
    fragmento: [
      "Yo trabajaba en la farmacia de la esquina, ocho años llevaba ahí.",
      "Cuando mi mamá empezó a necesitar ayuda para todo, pedí mi liquidación y me salí.",
      "Al principio pensé que era cosa de unos meses."
    ]
  },

  // Obras citadas en las definiciones conceptuales de las misiones.
  bibliografia: [
    { clave: "alaszewski2006", ref: "Alaszewski, A. (2006). Using diaries for social research. SAGE." },
    { clave: "bazeley2013", ref: "Bazeley, P. (2013). Qualitative data analysis. Practical strategies. SAGE." },
    { clave: "flick2007", ref: "Flick, U. (2007). Designing qualitative research. SAGE." },
    { clave: "saldana2011", ref: "Saldaña, J. (2011). Fundamentals of qualitative research. Oxford University Press." }
  ],

  // Lecturas recomendadas para seguir por tu cuenta.
  lecturas: [
    "Adams, T. E., Holman Jones, S. y Ellis, C. (2014). Autoethnography. Oxford University Press.",
    "Anfara, V. A. y Mertz, N. T. (Eds.). (2015). Theoretical frameworks in qualitative research. SAGE.",
    "Angrosino, M. (2008). Doing ethnographic and observational research. SAGE.",
    "Boucher, C. y Holian, R. (2001). Emerging forms of representing qualitative data. RMIT University Press.",
    "Brinkmann, S. (2013). Qualitative interviewing. Oxford University Press.",
    "Flick, U. (2008). Managing quality in qualitative research. SAGE.",
    "Harris, A. M. (2016). Video as method. Oxford University Press.",
    "Hyers, L. L. (2018). Diary methods. Oxford University Press.",
    "Timmermans, S. y Tavory, I. (2014). Abductive analysis. Theorizing qualitative research. University of Chicago Press.",
    "Willis, G. B. (2015). Analysis of the cognitive interview in questionnaire design. Oxford University Press."
  ],

  niveles: [

    /* ============================ 1 ============================ */
    {
      id: "m01",
      titulo: "Instalar QualCoder",
      lema: "Descargar, abrir y comprobar",
      definiciones: [
        { termino: "Programa de análisis cualitativo asistido",
          texto: "El programa administra, organiza y recupera el material, y deja en manos de quien investiga las decisiones analíticas. Bazeley insiste en que codificar depende de una lectura atenta y no es una tarea mecánica, así que la herramienta acelera el trabajo pero no lo sustituye.",
          cita: "Bazeley, 2013, p. 126", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Puesta en marcha", icono: "⬇" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Descarga e instalación paso a paso" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La página de versiones con los archivos de cada sistema", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El aviso de desarrollador no identificado y cómo autorizarlo", pie: "" },
        { tipo: "imagen", src: "assets/img/1_Acerca_de.png", titulo: "La ventana Acerca de con el número de versión", pie: "" }
      ],
      lectura: `
        <p>QualCoder es software libre y gratuito, así que instalarlo es descargarlo y abrirlo. Hay dos
        caminos. El <strong>paquete precompilado</strong>, que es un archivo listo para ejecutar y es la opción
        recomendada, y la <strong>instalación desde el código fuente</strong>, para quien necesite la versión de
        desarrollo, quiera contribuir o use un sistema sin paquete disponible.</p>
        <p>En Windows hay ejecutable e instalador. En macOS hay dos paquetes, uno para Apple Silicon y otro
        para Intel, y hay que bajar el que corresponde al procesador. En Linux la vía es el código fuente, con
        instrucciones para Debian y derivadas, Fedora y Arch.</p>
        <p>Tanto Windows como macOS avisan de que el programa viene de un desarrollador no identificado. No
        indica ningún problema, los certificados que evitan ese aviso cuestan dinero y un proyecto mantenido
        por voluntarios no los paga. En macOS se autoriza a mano desde los ajustes de privacidad y seguridad,
        y solo la primera vez.</p>
        <p>Tres programas externos son opcionales y conviene tenerlos si vas a trabajar con audio y video.
        VLC para reproducir, ffmpeg para la forma de onda y Zotero si vas a importar referencias por su API.
        Sin ellos el programa funciona, solo se apagan esas funciones.</p>
      `,
      ejercicios: [
        /* 1.1 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Vas a instalarlo en tu computadora de trabajo para empezar la tesis. ¿Qué camino eliges?",
          opciones: [
            { t: "El paquete precompilado de la página de versiones (Releases)", ok: true, dice: "Es la opción recomendada. Se descarga, se ejecuta y listo, sin líneas de comandos." },
            { t: "El código fuente, para tener la versión de desarrollo", ok: false, dice: "Requiere Python, línea de comandos y entornos virtuales. Tiene sentido si vas a contribuir o probar la versión en desarrollo." },
            { t: "Esperar a que salga en la tienda de aplicaciones del sistema", ok: false, dice: "No se distribuye por ahí. Los paquetes están en el repositorio oficial de QualCoder." }
          ],
          consejo: "Antes de descargar comprueba dos cosas, si tu sistema es de 32 o 64 bits y, en Mac, si el procesador es Apple Silicon o Intel.",
          consejoImagen: { src: "assets/img/1_1_Sistema.png", titulo: "Verificar Sistema en Windows", pie: "" }
        },
        /* 1.2 */ {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada pieza externa con lo que aporta.",
          pares: [
            { a: "VLC", b: "Reproducción de audio y video" },
            { a: "ffmpeg", b: "Generación de la forma de onda del audio" },
            { a: "Zotero", b: "Importación de referencias por su API" },
            { a: "Python", b: "Necesario solo para instalar desde el código fuente" },
            { a: "Entorno virtual", b: "Aísla las bibliotecas del programa de las del resto del sistema" }
          ]
        },
        /* 1.3 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Al abrirlo, el sistema avisa de que el programa procede de un desarrollador no identificado. ¿Qué significa?",
          opciones: [
            { t: "Que el paquete no está firmado, y hay que autorizar la ejecución a mano", ok: true, dice: "Los certificados de firma cuestan dinero y el proyecto lo mantienen voluntarios. En macOS se autoriza desde privacidad y seguridad, y solo la primera vez." },
            { t: "Que el archivo se descargó dañado", ok: false, dice: "No. El aviso aparece siempre, incluso con la descarga íntegra." },
            { t: "Que el programa trae software malicioso", ok: false, dice: "El aviso solo dice que nadie pagó por firmar el paquete. Si te incomoda, el código es abierto y se puede instalar desde la fuente." }
          ],
          consejo: "Descarga siempre desde la página de versiones del repositorio oficial. Cuando el archivo viene de otro sitio, el aviso del sistema sí merece que te detengas.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "El aviso del sistema y el botón para autorizar la ejecución", pie: "" }
        },
        /* 1.4 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Instalaste todo y el audio de las entrevistas no se reproduce. ¿Por dónde empiezas?",
          opciones: [
            { t: "Revisar si VLC está instalado en el sistema", ok: true, dice: "Es la causa más común. En Fedora, además, hay un problema conocido con VLC y el material audiovisual no se puede usar en esa distribución." },
            { t: "Reinstalar QualCoder desde cero", ok: false, dice: "El programa está bien, lo que falta es una pieza externa." },
            { t: "Convertir todos los audios a otro formato", ok: false, dice: "El formato rara vez es el problema si el reproductor externo no está." }
          ],
          consejo: "Si VLC ya está instalado y aun así no suena, revisa que su arquitectura coincida con la del programa. Mezclar versiones de 32 y 64 bits es una causa habitual.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        },
        /* 1.5 */ {
          tipo: "explorar",
          xp: 20,
          instruccion: "Antes de tocar nada en serio, recorre el programa. Toca las entradas de los menús y las pestañas que quieras, y lee a la derecha qué hace cada una.",
          objetivo: "Recorrer la barra de menús",
          dice: "Ya sabes dónde vive cada cosa. Los cinco menús de trabajo siguen un orden, primero el proyecto, luego el material, luego la codificación, y al final lo que devuelve resultados."
        },
        /* 1.6 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Ya lo tienes abierto. Comprueba qué versión instalaste, que es el dato que hay que citar en cualquier publicación.",
          objetivo: "Ver la versión instalada",
          ruta: ["ayuda", "acerca"],
          pista: "La versión, la autoría y la licencia viven en el último menú.",
          dice: "Ahí está también la cita del software. Anótala en el memo del proyecto junto con el número de versión y la tendrás lista al escribir el método."
        }
      ]
    },

    /* ============================ 2 ============================ */
    {
      id: "m02",
      titulo: "Qué es codificar",
      lema: "Antes del programa está la decisión",
      definiciones: [
        { termino: "Código",
          texto: "Palabra o frase corta que asigna de manera simbólica un atributo sumativo, destacado, capturador de esencia o evocador a una porción de datos en lenguaje o en imagen. Igual que un título representa un libro o una película, el código representa el contenido y la esencia de ese dato.",
          cita: "Saldaña, 2011, p. 95", clave: "saldana2011" },
        { termino: "Codificar",
          texto: "Etiquetar un pasaje según lo que se entiende que trata, de modo que la etiqueta sirva a la vez para representarlo y para recuperarlo junto con los datos iguales o parecidos. Bazeley lo resume con una frase que conviene tener presente, codificar es retención de datos y no reducción de datos.",
          cita: "Bazeley, 2013, p. 126", clave: "bazeley2013" },
        { termino: "Categoría",
          texto: "Resultado de la segunda vuelta del trabajo. La codificación pasa al menos por dos etapas, una inicial de identificación y etiquetado y otra de refinamiento donde los códigos se agrupan en categorías más analíticas.",
          cita: "Bazeley, 2013, p. 126", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Ojo de lector", icono: "◉" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Recorrido por la ventana principal de QualCoder 4" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La ventana principal con sus cinco pestañas y la barra de menús", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El registro de acciones con el mensaje de copia de seguridad", pie: "" }
      ],
      lectura: `
        <p>Codificar es ponerle una etiqueta corta a un fragmento de datos para poder volver a encontrarlo,
        compararlo y contarlo si hace falta. La etiqueta es el <strong>código</strong> y el fragmento marcado
        es el <strong>segmento</strong>.</p>
        <p>Un código no resume el texto, lo señala. Si la etiqueta necesita tres renglones para explicarse,
        todavía no es un código.</p>
        <p>QualCoder trabaja en una sola ventana con cinco pestañas. Los módulos se abren dentro de ellas, no
        en ventanas flotantes. La primera pestaña es el registro de acciones, que es donde el programa habla,
        avisa de las copias de seguridad y suelta los resultados de varios informes.</p>
      `,
      ejercicios: [
        /* 2.1 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Lees esta línea de una entrevista. \"Ya van cuatro años y yo pensaba que eran unos meses.\" ¿Cuál etiqueta funciona mejor como código?",
          opciones: [
            { t: "Duración imprevista del cuidado", ok: true, dice: "Corto, nombra el fenómeno y sirve para comparar con otras entrevistas." },
            { t: "La señora lleva cuatro años cuidando a su mamá y no lo esperaba", ok: false, dice: "Eso es una paráfrasis. Un código cabe en una etiqueta, no en un renglón." },
            { t: "Tiempo", ok: false, dice: "Demasiado ancho. Bajo esa etiqueta va a caer medio corpus." },
            { t: "Cuatro años", ok: false, dice: "Es un dato del caso, no un concepto. No se repite en otras entrevistas." }
          ],
          consejo: "Cuando dudes entre dos nombres para un código, escribe primero su memo. Si al definirlo te salen dos definiciones, es que hacían falta dos códigos.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        },
        /* 2.2 */ {
          tipo: "interfaz",
          xp: 10,
          instruccion: "Ya con el mapa en la cabeza. Abre la pestaña donde el programa deja sus mensajes, los avisos de respaldo y los resultados de algunos informes.",
          objetivo: "Ver el registro de acciones",
          ruta: ["pestana", "registro"],
          pista: "Es la primera de las cinco pestañas de la ventana principal.",
          dice: "Conviene mirarla después de abrir el proyecto y después de cualquier operación grande. Varios avisos aparecen ahí y en ningún otro lado."
        },
        /* 2.3 */ {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada pieza con lo que hace. Toca una tarjeta de la izquierda y luego su definición.",
          pares: [
            { a: "Código", b: "Etiqueta que se aplica a un fragmento de datos" },
            { a: "Categoría", b: "Agrupa códigos que comparten un sentido" },
            { a: "Segmento", b: "El trozo de texto marcado dentro del archivo" },
            { a: "Memo", b: "Registro de por qué tomaste una decisión analítica" },
            { a: "Anotación", b: "Nota sobre un punto del texto, sin asignar código" },
            { a: "Subcódigo", b: "Código que cuelga de otro código y nombra un matiz suyo" }
          ]
        },
        /* 2.4 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Cuándo conviene crear una categoría?",
          opciones: [
            { t: "Cuando ya tienes varios códigos que se parecen y quieres verlos juntos", ok: true, dice: "La categoría llega después de los códigos, no antes." },
            { t: "Al abrir el proyecto, para tener el árbol listo desde el inicio", ok: false, dice: "Encaja con un marco cerrado. Si estás explorando, un árbol prefabricado te obliga a meter el dato donde no cabe." },
            { t: "Nunca, las categorías son de otros programas", ok: false, dice: "QualCoder sí tiene categorías y las muestra como carpetas en el árbol de códigos." }
          ],
          consejo: "Una manera cómoda de trabajar es dejar las categorías para la segunda vuelta, con tres o cuatro entrevistas ya codificadas y la lista de códigos a la vista.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        }
      ]
    },

    /* ============================ 3 ============================ */
    {
      id: "m03",
      titulo: "Abrir el proyecto",
      lema: "Media hora aquí ahorra semanas después",
      definiciones: [
        { termino: "Diseño de investigación",
          texto: "El plan que articula pregunta, material y métodos, y que se juzga por su capacidad de sostener las conclusiones. Flick advierte que en lo cualitativo no hay umbrales universales de calidad, así que la calidad se construye con estrategias durante el proceso y no con un número al final.",
          cita: "Flick, 2007", clave: "flick2007" },
        { termino: "Rastro de auditoría",
          texto: "Registro claro de las decisiones de codificación, ligado a la evidencia que las sostiene. Lo que convence a quien lee no es un coeficiente de fiabilidad, sino poder mostrar el camino recorrido, y por eso los memos y el diario del proyecto valen tanto como los códigos.",
          cita: "Bazeley, 2013, p. 151", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Cartografía", icono: "▤" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Crear el proyecto, configurar el codificador e importar los archivos" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El diálogo de creación de proyecto", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La ventana de Configuración con el nombre del codificador", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El gestor de archivos con cuatro entrevistas importadas", pie: "" }
      ],
      lectura: `
        <p>Un proyecto de QualCoder es una carpeta terminada en <code>.qda</code>. Dentro viven la base de datos
        y las copias de los archivos. Se mueve completa, se respalda completa y se comparte completa.</p>
        <p>Antes de codificar hay que pasar por Configuración y cambiar el nombre del codificador,
        que por defecto es <code>default</code>. Todo lo que marques queda firmado con ese nombre, y reparar
        codificaciones firmadas mal cuesta caro.</p>
        <p>El material entra por el menú Gestionar y sus módulos. Archivos para textos, PDF, imágenes y medios,
        y una entrada aparte en el menú Proyecto para importar encuestas desde CSV o XLSX.</p>
      `,
      ejercicios: [
        /* 3.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Estás frente a QualCoder recién abierto. Crea el proyecto donde vivirán las entrevistas.",
          objetivo: "Crear un proyecto nuevo",
          ruta: ["proyecto", "crear"],
          pista: "Todo lo que enmarca al proyecto completo cuelga del primer menú.",
          dice: "QualCoder pide nombre y ubicación, y construye la carpeta .qda con sus subcarpetas y la base de datos vacía."
        },
        /* 3.2 */ {
          tipo: "dialogo",
          xp: 15,
          instruccion: "Se abrió Configuración. Déjala lista para trabajar en español y con tu firma.",
          titulo: "Configuración",
          campos: [
            { id: "idioma", etiqueta: "Idioma de la interfaz", tipo: "select", opciones: ["English", "Español", "Français", "Deutsch"], correcto: "Español" },
            { id: "coder", etiqueta: "Nombre del codificador", tipo: "texto", marcador: "Escribe un nombre", correcto: "cualquiera" },
            { id: "respaldo", etiqueta: "Copia de seguridad al abrir el proyecto", tipo: "casilla", correcto: true }
          ],
          boton: "Guardar",
          dice: "El cambio de idioma pide reiniciar el programa. Y ojo, las copias automáticas rotan, por defecto se guardan cinco."
        },
        /* 3.3 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "El proyecto está vacío. Abre el módulo por donde entra todo el material al proyecto.",
          objetivo: "Abrir el gestor de archivos",
          ruta: ["gestionar", "archivos"],
          pista: "Archivos, casos, atributos, diarios y referencias viven en el mismo menú.",
          dice: "Desde ahí se importa, se vincula, se renombra y se asignan atributos. Copiar deja el proyecto autónomo, vincular deja los archivos fuera y esos enlaces se rompen al cambiar de computadora."
        },
        /* 3.4 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de empezar quieres ver qué hay dentro del proyecto y si algún archivo vinculado se perdió.",
          objetivo: "Generar el resumen del proyecto",
          ruta: ["proyecto", "resumen"],
          pista: "Es una entrada del menú Proyecto y su resultado sale en el registro de acciones.",
          dice: "El resumen lista recuentos de archivos, casos, códigos y atributos, y destaca los vínculos rotos. Conviene ejecutarlo al retomar un proyecto viejo."
        },
        /* 3.5 */ {
          tipo: "secuencia",
          xp: 15,
          instruccion: "Ordena el arranque de un proyecto. Toca los pasos en el orden correcto.",
          pasos: [
            "Crear el proyecto y darle un nombre sin espacios raros",
            "Cambiar el nombre del codificador en Configuración",
            "Importar los archivos desde el gestor de archivos",
            "Abrir cada archivo y revisar que el texto se lee bien",
            "Escribir en el diario qué decisiones tomaste hoy"
          ]
        }
      ]
    },

    /* ============================ 4 ============================ */
    {
      id: "m04",
      titulo: "Casos y atributos",
      lema: "Para comparar hay que poder separar",
      definiciones: [
        { termino: "Caso",
          texto: "La unidad de análisis muestreada, sea una persona, una organización, un lugar o un evento, con los detalles que después harán falta para comparar e interpretar.",
          cita: "Bazeley, 2013, p. 84", clave: "bazeley2013" },
        { termino: "Atributo",
          texto: "Dato clasificatorio que describe a la fuente o al caso completo, no a un pasaje. Bazeley señala que lo que en los programas estadísticos se llama variable, en los cualitativos se llama atributo, y que se guarda aparte del sistema de códigos.",
          cita: "Bazeley, 2013, pp. 84, 142", clave: "bazeley2013" },
        { termino: "Contexto, código o atributo",
          texto: "Regla práctica para no confundirlos. Si el rasgo contextual afecta solo a ciertos pasajes, va como código. Si describe al archivo o al caso entero, va como atributo.",
          cita: "Bazeley, 2013, p. 161", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Fichero", icono: "▦" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Casos, atributos e importación de encuestas" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La tabla de casos con archivos asignados", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La tabla de atributos con una variable de agrupación", pie: "" }
      ],
      lectura: `
        <p>Un caso agrupa todo el material de una misma persona o unidad, aunque esté repartido en varios
        archivos, y puede incluir archivos completos o solo tramos de un archivo, útil cuando una transcripción
        trae a varias personas.</p>
        <p>Un atributo es una variable que describe a un caso o a un archivo. Sin atributos no hay comparación
        posible, porque no hay con qué filtrar en los informes.</p>
        <p>Si el material viene de una encuesta con preguntas abiertas, la importación desde CSV o XLSX crea de
        una vez los casos, los atributos y los archivos de texto de cada respuesta.</p>
      `,
      ejercicios: [
        /* 4.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Rosa tiene dos entrevistas y una nota de campo. Vas a juntarlas bajo una misma unidad.",
          objetivo: "Abrir la gestión de casos",
          ruta: ["gestionar", "casos"],
          pista: "Está en el mismo menú donde importaste los archivos.",
          dice: "Un caso puede reunir archivos completos o tramos marcados dentro de un archivo."
        },
        /* 4.2 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres registrar si cada cuidadora trabaja fuera de casa, para poder comparar después.",
          objetivo: "Abrir la gestión de atributos",
          ruta: ["gestionar", "atributos"],
          pista: "Las variables descriptivas tienen su propia entrada en el menú Gestionar.",
          dice: "Los atributos pueden ser de texto o numéricos y se aplican a archivos o a casos. Después filtran en casi todos los informes."
        },
        /* 4.3 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Te llegó una encuesta en CSV con tres preguntas abiertas y ocho variables de perfil. Métela al proyecto.",
          objetivo: "Importar una encuesta",
          ruta: ["proyecto", "importar"],
          pista: "No está en Gestionar. La importación cuelga del menú Proyecto, en un submenú.",
          dice: "Dentro de ese submenú está la importación de encuestas, que crea los casos, los atributos y un archivo de texto por respuesta, todo de una pasada."
        },
        /* 4.4 */ {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada elemento con lo que representa dentro del proyecto.",
          pares: [
            { a: "Archivo", b: "La transcripción tal como se importó" },
            { a: "Caso", b: "Todo el material de una misma persona" },
            { a: "Atributo", b: "Variable que describe a un caso o a un archivo" },
            { a: "Diario", b: "Bitácora fechada del proceso de análisis" },
            { a: "Codificación", b: "Un código aplicado a un segmento concreto" }
          ]
        },
        /* 4.5 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Quieres comparar qué dicen las cuidadoras que trabajan fuera de casa frente a las que no. ¿Qué necesitas tener listo?",
          opciones: [
            { t: "El atributo cargado en cada caso o archivo", ok: true, dice: "Sin atributos no hay con qué filtrar y esa comparación no se puede armar." },
            { t: "Solo más códigos", ok: false, dice: "Más códigos no separan grupos. La variable de comparación vive en los atributos." },
            { t: "Exportar todo a una hoja de cálculo y hacerlo a mano", ok: false, dice: "Se puede, pero el programa filtra sin errores de copiado." }
          ],
          consejo: "Deja definidos los atributos antes de codificar en serio. Añadirlos después obliga a volver caso por caso, y ahí es donde se pierden las tardes.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        }
      ]
    },

    /* ============================ 5 ============================ */
    {
      id: "m05",
      titulo: "Codificar texto",
      lema: "Seleccionar, elegir el código, marcar",
      definiciones: [
        { termino: "Segmento",
          texto: "La porción de datos que recibe el código. Puede ir de una palabra a una frase, a una página entera o a un flujo de imágenes en movimiento, de modo que su tamaño es una decisión analítica y no un detalle técnico.",
          cita: "Saldaña, 2011, pp. 95-96", clave: "saldana2011" },
        { termino: "Agrupar y dividir",
          texto: "Las dos maneras de acercarse al texto. Quien divide busca temas de grano fino y maximiza las diferencias entre pasajes, quien agrupa pasa por alto los matices para quedarse con los temas amplios. En la práctica casi todo el mundo hace las dos cosas en algún momento del proyecto.",
          cita: "Bernard y Ryan, 2010, en Bazeley, 2013, p. 143", clave: "bazeley2013" },
        { termino: "Sobrecodificación",
          texto: "El exceso que enturbia. Cuando se captura toda referencia vaga a un concepto, con contexto de sobra, el significado del código se vuelve borroso y los patrones de asociación se ven peor.",
          cita: "Bazeley, 2013, p. 153", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Marcador", icono: "▮" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Crear un código y marcar el primer segmento" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El módulo Codificar texto con sus tres paneles", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El menú contextual del árbol de códigos desplegado", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "Un segmento marcado, con su franja de color en el margen", pie: "" }
      ],
      lectura: `
        <p>Codificar texto es el módulo central. A la izquierda están las pestañas Documentos y
        Asistencia de IA con la lista de archivos, y debajo el árbol de códigos. Al centro el documento con su
        margen de franjas de color, donde se ve qué código toca cada tramo.</p>
        <p>Codificar aquí es una operación de teclado. Se selecciona el texto, se elige el código en el árbol y
        se marca con <code>Q</code>. Las demás teclas frecuentes son <code>V</code> para código in vivo,
        <code>A</code> para anotar, <code>M</code> para el memo de esa codificación y <code>U</code> para
        desmarcar. Los botones existen, pero son el camino lento.</p>
        <p>El tamaño del segmento importa. Marca lo mínimo que todavía se entiende solo, ni la frase suelta que
        pierde el contexto ni la página entera que vuelve inútil al código.</p>
      `,
      ejercicios: [
        /* 5.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Ya tienes las entrevistas dentro. Abre el módulo donde se codifican los textos.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          pista: "Hay un módulo distinto para texto, PDF, imagen y audio o video.",
          dice: "También se abre con Alt+T desde cualquier punto del programa. El módulo se aloja en la pestaña Codificar, no en una ventana aparte."
        },
        /* 5.2 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "El árbol de códigos está vacío para este tema. Crea el código que vas a necesitar, sin colgarlo de ninguna categoría.",
          objetivo: "Crear un código nuevo desde el árbol",
          ruta: ["codigo:Culpa", "crear_codigo"],
          pista: "El árbol de códigos se maneja con clic derecho sobre cualquiera de sus elementos.",
          dice: "Crear un código nuevo lo pone en el nivel superior. Para colgarlo de una categoría existe Añadir un código nuevo a la categoría, y para hacerlo subcódigo, Añadir un subcódigo."
        },
        /* 5.3 */ {
          tipo: "dialogo",
          xp: 15,
          instruccion: "Se abrió la ventana del código nuevo. Llámalo Abandono del empleo y déjalo listo para trabajar en equipo.",
          titulo: "Añadir código nuevo",
          campos: [
            { id: "nombre", etiqueta: "Nombre del código", tipo: "texto", marcador: "Abandono del empleo", correcto: ["abandono"] },
            { id: "color", etiqueta: "Color", tipo: "select", opciones: ["Sin color", "Coral", "Turquesa", "Violeta"], correcto: "Coral" },
            { id: "memo", etiqueta: "Escribir ahora el memo del código", tipo: "casilla", correcto: true }
          ],
          boton: "Crear código",
          dice: "El memo del código es lo que después aparece en la regla del código, con ejemplos reales debajo. Sin él, el acuerdo entre codificadores no tiene con qué sostenerse."
        },
        /* 5.4 */ {
          tipo: "codificar",
          xp: 20,
          instruccion: "Entrevista E01_Rosa. Marca el fragmento donde deja el empleo. Selecciona el tramo, elige el código en el árbol y usa Marcar (Q).",
          pista: "Busca la frase con la decisión laboral, no la que explica la enfermedad.",
          texto: [
            "Yo trabajaba en la farmacia de la esquina, ocho años llevaba ahí.",
            "Cuando mi mamá empezó a necesitar ayuda para todo, pedí mi liquidación y me salí.",
            "El doctor nos dijo que era cuestión de acompañarla y ya.",
            "Al principio pensé que era cosa de unos meses."
          ],
          codigos: [
            { id: "c1", nombre: "Abandono del empleo", color: "coral" },
            { id: "c2", nombre: "Diagnóstico médico", color: "turquesa" },
            { id: "c3", nombre: "Duración imprevista", color: "violeta" }
          ],
          solucion: { segmentos: [1], codigo: "c1", accion: "marcar" }
        },
        /* 5.5 */ {
          tipo: "codificar",
          xp: 20,
          instruccion: "Sigue en la misma entrevista. Marca el tramo que muestra que el cuidado duró mucho más de lo previsto.",
          pista: "Aquí el sentido se arma con dos frases seguidas, no con una sola.",
          texto: [
            "El doctor nos dijo que era cuestión de acompañarla y ya.",
            "Al principio pensé que era cosa de unos meses.",
            "Ya van cuatro años.",
            "Mis hermanos vienen los domingos, pero el día a día es mío."
          ],
          codigos: [
            { id: "c3", nombre: "Duración imprevista", color: "violeta" },
            { id: "c4", nombre: "Reparto desigual", color: "amarillo" },
            { id: "c2", nombre: "Diagnóstico médico", color: "turquesa" }
          ],
          solucion: { segmentos: [1, 2], codigo: "c3", accion: "marcar" }
        }
      ]
    },

    /* ============================ 6 ============================ */
    {
      id: "m06",
      titulo: "En vivo, anotar y memos",
      lema: "La voz del campo y la tuya",
      definiciones: [
        { termino: "Código in vivo",
          texto: "Código basado en el lenguaje propio de la persona entrevistada. Saldaña recomienda escribirlo entre comillas, justamente para dejar claro que salió del registro de datos y no del vocabulario de quien analiza.",
          cita: "Saldaña, 2011, pp. 99-100", clave: "saldana2011" },
        { termino: "Memo analítico",
          texto: "Reflexión fechada y abierta sobre los datos y su análisis, con título propio para poder categorizarla después. No es el texto final, es el material del que ese texto acabará saliendo.",
          cita: "Saldaña, 2011, pp. 97-99", clave: "saldana2011" },
        { termino: "Anotación",
          texto: "Pensamiento breve pegado a un punto del texto. Sirve para aclarar algo, para dejar una idea fugaz o para apuntar una referencia cruzada, y más adelante puede convertirse en memo.",
          cita: "Bazeley, 2013, p. 105", clave: "bazeley2013" },
        { termino: "Diario",
          texto: "Documento creado por una persona que mantiene un registro regular, personal y contemporáneo. Regular porque son entradas fechadas y sucesivas, personal porque hay alguien identificable detrás, y contemporáneo porque se escribe cerca del momento de los hechos y así no lo deforma la memoria.",
          cita: "Alaszewski, 2006, pp. 1-2", clave: "alaszewski2006" }
      ],
      insignia: { nombre: "Voz del campo", icono: "❝" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Código in vivo, anotación y memo" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El menú contextual del texto con la selección activa", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "Un diario del proyecto con una entrada fechada", pie: "" }
      ],
      lectura: `
        <p>El módulo cubre tres operaciones que conviene no confundir. <strong>Codificar</strong> asigna un
        código a un segmento y entra en los informes. <strong>Anotar</strong> deja una nota sobre el texto sin
        asignar código, y no entra en ningún informe de codificación, sirve para lo que todavía no sabes cómo
        nombrar. <strong>El memo de la codificación</strong> documenta por qué aplicaste ese código a ese
        segmento concreto.</p>
        <p>El código in vivo crea una etiqueta con las palabras exactas del texto seleccionado. Sirve cuando la
        expresión dice algo que el vocabulario académico aplana, y estorba cuando se abusa.</p>
        <p>El módulo de diarios es el único que se abre en ventana aparte. Ahí va la bitácora fechada del
        proceso, que después es tu apartado de método.</p>
      `,
      ejercicios: [
        /* 6.1 */ {
          tipo: "codificar",
          xp: 20,
          instruccion: "Esta frase vale por cómo está dicha. Selecciónala y créale un código in vivo con la tecla V.",
          pista: "El código in vivo no se elige del árbol, se crea con las palabras del texto seleccionado.",
          texto: [
            "Mis hermanos vienen los domingos,",
            "pero el día a día es mío.",
            "Yo no me quejo, cada quien tiene su vida."
          ],
          codigos: [
            { id: "v2", nombre: "Reparto desigual", color: "turquesa" },
            { id: "v3", nombre: "Naturalización del sacrificio", color: "violeta" }
          ],
          solucion: { segmentos: [1], accion: "invivo" }
        },
        /* 6.2 */ {
          tipo: "codificar",
          xp: 20,
          instruccion: "Esta otra frase te llama la atención y todavía no sabes cómo nombrarla. Déjale una nota sin asignarle código.",
          pista: "Anotar y codificar son operaciones distintas. Una entra en los informes, la otra no.",
          texto: [
            "Mis hermanos vienen los domingos,",
            "pero el día a día es mío.",
            "Yo no me quejo, cada quien tiene su vida."
          ],
          codigos: [
            { id: "v1", nombre: "Reparto desigual", color: "turquesa" }
          ],
          solucion: { segmentos: [2], accion: "anotar" }
        },
        /* 6.3 */ {
          tipo: "abierta",
          xp: 20,
          instruccion: "Escribe el memo del código Abandono del empleo. Tiene que quedar claro qué se marca con él y qué no.",
          guia: [
            "Qué fenómeno nombra el código",
            "Un ejemplo de fragmento que sí entra",
            "Un caso parecido que no entra y por qué",
            "Con qué otro código se podría confundir"
          ],
          modelo: "Abandono del empleo. Marca los fragmentos donde la persona relata haber dejado un trabajo remunerado a causa de la tarea de cuidado, sea por renuncia, liquidación o despido negociado. Entra \"pedí mi liquidación y me salí\". No entra la reducción de horas ni el cambio de turno, que van en Ajuste de jornada. Se confunde con Pérdida de ingresos, que se refiere al efecto económico y no a la salida del empleo."
        },
        /* 6.4 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Terminaste la sesión y quieres dejar por escrito qué decidiste y por qué.",
          objetivo: "Abrir los diarios del proyecto",
          ruta: ["gestionar", "diarios"],
          pista: "Se gestionan junto con los archivos, los casos y los atributos.",
          dice: "Se pueden tener varios diarios, uno metodológico y otro de campo. Es el único módulo que se abre en ventana propia, así que puedes escribir mientras codificas."
        },
        /* 6.5 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Qué diferencia hay entre el memo de un código y el memo de una codificación?",
          opciones: [
            { t: "El del código define la etiqueta en general, el de la codificación explica por qué la aplicaste a ese segmento", ok: true, dice: "Y todavía hay un tercero, el memo del archivo, que documenta el documento completo." },
            { t: "Son lo mismo, solo cambia dónde se abren", ok: false, dice: "No. Uno viaja con el código por todo el proyecto, el otro pertenece a una codificación concreta." },
            { t: "El de la codificación se exporta y el del código no", ok: false, dice: "Los dos se pueden llevar a los informes." }
          ],
          consejo: "Escribe el memo del código el día que lo creas, y el de la codificación cuando dudes al aplicarlo. Esas dudas son justo lo que vale la pena dejar por escrito.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        }
      ]
    },

    /* ============================ 7 ============================ */
    {
      id: "m07",
      titulo: "El árbol de códigos",
      lema: "De la lista larga al mapa",
      definiciones: [
        { termino: "Sistema de códigos",
          texto: "El conjunto organizado de códigos y categorías. Bazeley calcula que un proyecto de complejidad moderada rara vez necesita más de diez categorías de primer nivel, y que los sistemas casi nunca pasan de dos o tres niveles de profundidad, porque más abajo quien codifica ya no recuerda ni encuentra sus propios códigos.",
          cita: "Bazeley, 2013, p. 183", clave: "bazeley2013" },
        { termino: "Los códigos como herramientas",
          texto: "Principios de organización que no están grabados en piedra. Los elegimos nosotros, así que se revisan, se renombran y se fusionan a medida que el trabajo avanza. Revisar y recodificar es parte del método, no una señal de haber empezado mal.",
          cita: "Bazeley, 2013, pp. 126, 150", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Arquitectura", icono: "⌗" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Categorías, fusión de códigos y esquema de color" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El árbol con categorías y códigos colgando de ellas", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El diálogo de fusión de un código en otro", pie: "" }
      ],
      lectura: `
        <p>El árbol de códigos es el mismo componente en los cuatro módulos de codificación. Todo lo que tiene
        que ver con crear, renombrar, mover, fusionar y borrar se hace con clic derecho sobre un código o sobre
        una categoría.</p>
        <p>Dos operaciones se parecen y no lo son. <strong>Fusionar</strong> traslada las codificaciones del
        código que desaparece al de destino. <strong>Eliminar</strong> borra el código, sus subcódigos y todas
        sus codificaciones, y no tiene deshacer.</p>
        <p>El color tampoco es decoración. El esquema de color permite asignar colores en bloque a una rama y
        simula cómo se ve la paleta para distintas formas de visión cromática.</p>
      `,
      ejercicios: [
        /* 7.1 */ {
          tipo: "clasificar",
          xp: 25,
          instruccion: "Estos códigos salieron de cuatro entrevistas a cuidadoras. Toca un código y luego la categoría donde va.",
          categorias: [
            { id: "k1", nombre: "Costos del cuidado" },
            { id: "k2", nombre: "Redes de apoyo" },
            { id: "k3", nombre: "Sentidos del cuidar" }
          ],
          items: [
            { t: "Abandono del empleo", cat: "k1" },
            { t: "Dolor de espalda crónico", cat: "k1" },
            { t: "Hermanos que ayudan los domingos", cat: "k2" },
            { t: "Vecina que se queda un rato", cat: "k2" },
            { t: "\"es mi deber de hija\"", cat: "k3" },
            { t: "Culpa por sentir enojo", cat: "k3" },
            { t: "Gasto en pañales y medicinas", cat: "k1" },
            { t: "Grupo de WhatsApp de cuidadoras", cat: "k2" }
          ]
        },
        /* 7.2 */ {
          tipo: "interfaz",
          xp: 20,
          instruccion: "En el árbol tienes Culpa y Sentimiento de culpa diciendo lo mismo. Únelos sin perder ninguna codificación.",
          objetivo: "Fusionar Sentimiento de culpa en otro código",
          ruta: ["codigo:Sentimiento de culpa", "fusionar"],
          pista: "Las operaciones sobre un código salen de su menú contextual, no de la barra de menús.",
          dice: "Las codificaciones del código que desaparece pasan al de destino. Si hubieras elegido Eliminar, se habrían borrado con él y sin deshacer."
        },
        /* 7.3 */ {
          tipo: "interfaz",
          xp: 20,
          instruccion: "Ya creaste la categoría Costos del cuidado. Ahora mete ahí el código Abandono del empleo.",
          objetivo: "Mover Abandono del empleo a una categoría",
          ruta: ["codigo:Abandono del empleo", "mover"],
          pista: "Es otra entrada del mismo menú contextual, la que abre una lista jerárquica de destinos.",
          dice: "La lista deja elegir entre el nivel superior, una categoría o incluso otro código, que lo convertiría en subcódigo."
        },
        /* 7.4 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Un código tiene una sola codificación en todo el corpus, hecha hace cuatro meses. ¿Qué haces?",
          opciones: [
            { t: "Revisar el segmento y decidir si entra en otro código o si vale por sí mismo", ok: true, dice: "Un caso único puede ser un hallazgo o el resto de una idea que abandonaste. Hay que mirarlo." },
            { t: "Eliminarlo, uno solo no significa nada", ok: false, dice: "La frecuencia no decide relevancia, y eliminar borra también su codificación." },
            { t: "Dejarlo ahí, no molesta", ok: false, dice: "Cien códigos huérfanos sí molestan y ensucian cualquier informe." }
          ],
          consejo: "Antes de decidir, abre la recuperación de ese código y lee su único segmento en contexto. Con el fragmento delante, la decisión tarda un minuto.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        }
      ]
    },

    /* ============================ 8 ============================ */
    {
      id: "m08",
      titulo: "Recuperar y mirar",
      lema: "El informe no piensa por ti",
      definiciones: [
        { termino: "Recuperación",
          texto: "Traer de vuelta todos los datos que representa un código, para leerlos juntos. Es lo que permite revisar si el código es consistente, y también lo que convierte la codificación en material de escritura.",
          cita: "Bazeley, 2013, p. 126", clave: "bazeley2013" },
        { termino: "Comparación por subgrupos",
          texto: "Poner lado a lado lo que dicen quienes comparten un atributo frente a quienes no. Bazeley subraya que sin atributos registrados y sin un modo de ordenar por ellos, releer el material no lleva de manera fiable a una comparación sólida.",
          cita: "Bazeley, 2013, p. 258", clave: "bazeley2013" }
      ],
      insignia: { nombre: "Lupa", icono: "◎" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Recuperación de códigos, frecuencias y gráficos" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La recuperación con segmentos y su archivo de origen", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La tabla de frecuencias por código y codificador", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "Una gráfica de barras por categoría", pie: "" }
      ],
      lectura: `
        <p>Codificar sin recuperar es archivar. La recuperación de códigos junta todos los segmentos de un
        código y los pone uno detrás de otro con su archivo de origen. Ahí se ve si el código aguanta o si
        estaba metiendo cosas distintas en la misma bolsa.</p>
        <p>Las salidas están repartidas en dos menús. En Análisis viven la recuperación, las co-ocurrencias, las
        relaciones y el grafo. En Informes viven las frecuencias, los conteos por archivo o caso, los resúmenes,
        las comparaciones entre codificadores, los gráficos y las consultas a la base de datos.</p>
        <p>Cuidado con la frecuencia. Un código con noventa apariciones puede ser importante o puede ser que lo
        estés aplicando a todo. La cuenta describe tu codificación, no la realidad del campo.</p>
      `,
      ejercicios: [
        /* 8.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres leer juntos todos los fragmentos que marcaste con el código Culpa.",
          objetivo: "Abrir la recuperación de códigos",
          ruta: ["analisis", "recuperacion"],
          pista: "No está en Informes. Lo que devuelve segmentos para leer cuelga del menú Análisis.",
          dice: "También se abre con Alt+K. Devuelve los segmentos con su archivo de origen y permite filtrar por códigos, archivos, casos y atributos."
        },
        /* 8.2 */ {
          tipo: "dialogo",
          xp: 20,
          instruccion: "Configura la recuperación para revisar el código con contexto y llevártela a tu procesador de textos.",
          titulo: "Recuperación de códigos (Code retrieval)",
          campos: [
            { id: "codigos", etiqueta: "Códigos incluidos", tipo: "select", opciones: ["Ninguno", "Solo Culpa", "Todos los códigos"], correcto: "Solo Culpa" },
            { id: "memos", etiqueta: "Incluir los memos de las codificaciones", tipo: "casilla", correcto: true },
            { id: "origen", etiqueta: "Mostrar el archivo de origen de cada segmento", tipo: "casilla", correcto: true },
            { id: "formato", etiqueta: "Formato de exportación", tipo: "select", opciones: ["ODT", "HTML", "CSV", "Portapapeles"], correcto: "ODT" }
          ],
          boton: "Ejecutar",
          dice: "Sin el archivo de origen los fragmentos pierden el rastro y ya no se puede volver a la entrevista completa."
        },
        /* 8.3 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de escribir resultados quieres ver cuántas veces se aplicó cada código y quién lo aplicó.",
          objetivo: "Abrir las frecuencias de códigos",
          ruta: ["informes", "frecuencias"],
          pista: "Las cuentas están en el menú Informes, no en Análisis.",
          dice: "Muestra el total por código y el desglose por codificador. Para ver cómo se reparte entre archivos o casos está Conteos por archivo o caso."
        },
        /* 8.4 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Necesitas una figura para el artículo con el peso de cada categoría.",
          objetivo: "Abrir los gráficos",
          ruta: ["informes", "graficas"],
          pista: "Está en Informes, con atajo Alt+U.",
          dice: "Los gráficos cuentan por frecuencia, por caracteres codificados o por área de imagen, y no es lo mismo. Elige la unidad según lo que quieras mostrar."
        },
        /* 8.5 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Abres la recuperación del código Culpa y ves que la mitad de los segmentos hablan de vergüenza frente a los hermanos y la otra mitad de arrepentimiento por enojarse. ¿Qué te dice eso?",
          opciones: [
            { t: "Que el código junta dos cosas distintas y conviene dividirlo", ok: true, dice: "Ese es el uso fuerte de la recuperación, ver de golpe lo que aplicaste caso por caso." },
            { t: "Que el código es muy productivo y hay que dejarlo así", ok: false, dice: "Un código que abarca dos fenómenos no es productivo, es impreciso." },
            { t: "Que hay un error del programa", ok: false, dice: "El programa devuelve lo que marcaste. El problema está en las decisiones." }
          ],
          consejo: "Para dividir un código, crea primero los dos nuevos y recodifica sus segmentos. Eliminar el viejo va al final, porque borrarlo antes se lleva las marcas.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        }
      ]
    },

    /* ============================ 9 ============================ */
    {
      id: "m09",
      titulo: "Equipo y mantenimiento",
      lema: "El acuerdo se construye, no se decreta",
      definiciones: [
        { termino: "Acuerdo entre codificadores",
          texto: "Medida de consistencia entre dos personas que codifican el mismo material. Bazeley advierte que el valor del ejercicio no está en el coeficiente sino en la conversación que provoca, porque comparar codificaciones obliga a acordar qué es importante y a definir bien las categorías.",
          cita: "Bazeley, 2013, pp. 151-152", clave: "bazeley2013" },
        { termino: "Saturación",
          texto: "Punto en que dejar de añadir material ya no aporta. Suele entenderse como que no aparecen categorías nuevas, aunque Corbin y Strauss piden más que eso, que cada categoría esté desarrollada y descrita con sus variaciones antes de darla por saturada.",
          cita: "Corbin y Strauss, 2008, en Bazeley, 2013, pp. 50, 152", clave: "bazeley2013" },
        { termino: "Estrategias de calidad",
          texto: "Triangulación, inducción analítica y atención al caso negativo, entre otras. Flick recuerda que estos criterios no traen umbrales que separen la buena de la mala investigación, y que se aplican durante el proceso y no como sello final.",
          cita: "Flick, 2007, p. 65", clave: "flick2007" }
      ],
      insignia: { nombre: "Podadora", icono: "✂" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Comparación entre codificadores y funciones especiales" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "La tabla de acuerdo con los porcentajes y la kappa", pie: "" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El módulo de vínculos rotos a archivos", pie: "" }
      ],
      lectura: `
        <p>Si codifican varias personas, cada una tiene que trabajar con su propio nombre de codificador puesto
        en Configuración. Después, la comparación de codificación reporta el acuerdo código por código, con
        varios indicadores, entre ellos la kappa de Cohen.</p>
        <p>El número importa menos que la conversación que provoca. Un desacuerdo casi siempre nace de una
        definición vaga, así que se arregla en el memo del código y no en la fórmula.</p>
        <p>El menú Ayuda esconde las funciones especiales, que es donde viven fusionar dos proyectos, sustituir
        el texto de un archivo conservando sus codificaciones y desplazar posiciones de codificación. Son
        operaciones potentes y sin marcha atrás, así que se hace copia manual antes.</p>
      `,
      ejercicios: [
        /* 9.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Tu colega codificó las mismas dos entrevistas que tú. Vas a ver dónde coinciden y dónde no.",
          objetivo: "Abrir la comparación de codificación",
          ruta: ["informes", "comparacion"],
          pista: "Es un informe y tiene atajo Alt+L.",
          dice: "Compara dos codificadores en todo el corpus. Si quieres verlo dentro de un archivo concreto, existe Comparación por archivo."
        },
        /* 9.2 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Cambiaste el proyecto de computadora y varios archivos vinculados ya no abren.",
          objetivo: "Abrir los vínculos rotos a archivos",
          ruta: ["gestionar", "enlaces"],
          pista: "Los archivos vinculados se gestionan en el menú Gestionar, en la última entrada.",
          dice: "El resumen del proyecto los detecta y este módulo los repara. Con archivos copiados en vez de vinculados el problema no existe."
        },
        /* 9.3 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Tu colega te mandó su proyecto aparte y quieres incorporarlo al tuyo.",
          objetivo: "Abrir las funciones especiales",
          ruta: ["ayuda", "especiales"],
          pista: "No están en Proyecto. Cuelgan del menú Ayuda, con atajo Alt+Z.",
          dice: "Ahí viven fusionar proyectos, sustituir el texto de un archivo y desplazar posiciones de codificación. Copia la carpeta a mano antes de usarlas."
        },
        /* 9.4 */ {
          tipo: "quiz",
          xp: 10,
          pregunta: "Dos codificadores marcan el mismo fragmento con códigos distintos. ¿Qué es lo primero que hay que hacer?",
          opciones: [
            { t: "Revisar juntos el memo de cada código y precisar qué entra en cada uno", ok: true, dice: "El desacuerdo casi siempre nace de definiciones vagas, no de mala fe." },
            { t: "Calcular la kappa y quedarse con el resultado", ok: false, dice: "El coeficiente mide, no resuelve. Sin revisar las definiciones el siguiente cálculo sale igual." },
            { t: "Que decida quien tenga más experiencia", ok: false, dice: "Eso cierra la discusión sin arreglar el instrumento." }
          ],
          consejo: "Deja el acuerdo por escrito en el memo del código, con un ejemplo que sí entra y otro que no. Es lo que evita repetir la misma discusión el mes que viene.",
          consejoImagen: { src: "assets/img/ejemplo.png", titulo: "Captura que acompaña al consejo", pie: "" }
        },
        /* 9.5 */ {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada problema con la operación que lo resuelve.",
          pares: [
            { a: "Dos códigos dicen lo mismo", b: "Fusionar el código en otro" },
            { a: "El nombre confunde a quien lee", b: "Renombrar y actualizar su memo" },
            { a: "Los códigos sueltos no se entienden juntos", b: "Crear categorías y mover los códigos" },
            { a: "Un archivo vinculado ya no abre", b: "Abrir vínculos rotos a archivos" },
            { a: "Hay que unir el proyecto de dos personas", b: "Funciones especiales, fusionar proyectos" }
          ]
        }
      ]
    },

    /* ============================ 10 ============================ */
    {
      id: "m10",
      titulo: "Prueba de campo",
      lema: "Todo junto, una vez más",
      definiciones: [
        { termino: "Transparencia",
          texto: "El informe es la única base sobre la que se puede juzgar la calidad de una investigación cualitativa, con su relato del acceso al campo, sus materiales, sus transcripciones y sus inferencias. De ahí que el diario y los memos no sean adorno, son lo que hace posible escribirlo.",
          cita: "Lüders, 1995, en Flick, 2007, p. 66", clave: "flick2007" },
        { termino: "Codificar es descubrir",
          texto: "Saldaña llama a la codificación una heurística, un método de descubrimiento del significado de cada sección de datos. Los códigos sirven para dar patrón, clasificar y reorganizar cada dato en categorías emergentes, así que el sistema con el que terminas no es el que tenías al empezar.",
          cita: "Saldaña, 2011, p. 95", clave: "saldana2011" }
      ],
      insignia: { nombre: "Codificación de campo", icono: "★" },
      medios: [
        // pon aquí el identificador de YouTube, por ejemplo id: "dQw4w9WgXcQ"
        { tipo: "video", id: "p2pWR1IrKbg", titulo: "Una sesión de codificación completa, de principio a fin" },
        { tipo: "imagen", src: "assets/img/ejemplo.png", titulo: "El proyecto terminado, con su árbol y su diario", pie: "" }
      ],
      lectura: `
        <p>Última misión. Una entrevista nueva, un sistema de códigos a medio construir y las decisiones de
        siempre. Nada que no hayas hecho ya, y esta vez sin pistas fáciles.</p>
        <p>Al terminar se libera la constancia, con tu nombre, tus XP y tus insignias.</p>
      `,
      ejercicios: [
        /* 10.1 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Llegó la entrevista E04_Marta y ya está importada. Abre donde vas a marcarla.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          dice: "De memoria y sin pista, que es como se trabaja."
        },
        /* 10.2 */ {
          tipo: "codificar",
          xp: 25,
          instruccion: "Marca el tramo donde aparece el costo físico del cuidado y aplícale su código.",
          pista: "El costo físico no es lo mismo que el cansancio de ánimo.",
          texto: [
            "La levanto tres veces en la noche para cambiarla.",
            "La espalda ya no me responde igual, el año pasado me mandaron terapia.",
            "Uno se acostumbra, ni modo.",
            "Mi hija dice que contrate a alguien, pero con qué."
          ],
          codigos: [
            { id: "m1", nombre: "Deterioro de la salud propia", color: "coral" },
            { id: "m2", nombre: "Naturalización del sacrificio", color: "verde" },
            { id: "m3", nombre: "Límite económico", color: "amarillo" }
          ],
          solucion: { segmentos: [1], codigo: "m1", accion: "marcar" }
        },
        /* 10.3 */ {
          tipo: "codificar",
          xp: 25,
          instruccion: "La frase que cierra el tema sin quejarse merece quedar con las palabras de Marta. Créale un código in vivo.",
          pista: "Se selecciona y se usa la tecla V, no el árbol.",
          texto: [
            "La espalda ya no me responde igual, el año pasado me mandaron terapia.",
            "Uno se acostumbra, ni modo.",
            "Mi hija dice que contrate a alguien, pero con qué."
          ],
          codigos: [
            { id: "m3", nombre: "Límite económico", color: "amarillo" },
            { id: "m1", nombre: "Deterioro de la salud propia", color: "coral" }
          ],
          solucion: { segmentos: [1], accion: "invivo" }
        },
        /* 10.4 */ {
          tipo: "clasificar",
          xp: 25,
          instruccion: "Acomoda los códigos de Marta en el sistema que ya venías armando.",
          categorias: [
            { id: "k1", nombre: "Costos del cuidado" },
            { id: "k2", nombre: "Redes de apoyo" },
            { id: "k3", nombre: "Sentidos del cuidar" }
          ],
          items: [
            { t: "Deterioro de la salud propia", cat: "k1" },
            { t: "Naturalización del sacrificio", cat: "k3" },
            { t: "Límite económico", cat: "k1" },
            { t: "Hija que sugiere contratar ayuda", cat: "k2" }
          ]
        },
        /* 10.5 */ {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de cerrar quieres releer juntos todos los segmentos del código que más creció.",
          objetivo: "Abrir la recuperación de códigos",
          ruta: ["analisis", "recuperacion"],
          dice: "Recuperar cada dos o tres archivos nuevos es lo que evita descubrir a los seis meses que un código traía dos cosas dentro."
        },
        /* 10.6 */ {
          tipo: "abierta",
          xp: 25,
          instruccion: "Cierra la sesión con una entrada de diario. Cuenta qué hiciste y qué queda pendiente.",
          guia: [
            "Qué archivos tocaste",
            "Qué códigos creaste, fusionaste o renombraste",
            "Qué duda te quedó abierta",
            "Qué vas a hacer en la próxima sesión"
          ],
          modelo: "Sesión del 8 de septiembre. Codifiqué E04_Marta completa. Creé Deterioro de la salud propia y el código in vivo \"uno se acostumbra, ni modo\". Fusioné Sentimiento de culpa en Culpa y moví Abandono del empleo bajo Costos del cuidado. Me quedó la duda de si Naturalización del sacrificio se solapa con \"es mi deber de hija\", de E01. La próxima sesión recupero los segmentos de ambos y decido si fusiono."
        }
      ]
    }

  ]
};
