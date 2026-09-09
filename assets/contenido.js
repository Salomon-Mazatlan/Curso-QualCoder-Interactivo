// Course content. Edit this file to change missions, videos and activities.
// Activity types: quiz, parejas, secuencia, codificar, clasificar, abierta, interfaz, dialogo.

const CURSO = {
  titulo: "Codificar en QualCoder 4",
  subtitulo: "Nueve misiones de práctica",
  autoria: "SoftCualitativo",

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
    { xp: 100, nombre: "Libreta en mano" },
    { xp: 220, nombre: "Codificación en marcha" },
    { xp: 360, nombre: "Analista de corpus" },
    { xp: 520, nombre: "Oficio de campo" }
  ],

  // Simulated QualCoder 4 window used by the "interfaz" and "codificar" activities.
  // Menu structure taken from the QualCoder 4 user manual.
  interfaz: {
    proyecto: "Cuidados_2026.qda",
    codificador: "default",
    pestanas: [
      { id: "registro", t: "Registro de acciones" },
      { id: "gestionar", t: "Gestionar" },
      { id: "codificar", t: "Codificar" },
      { id: "informes", t: "Informes" },
      { id: "agente", t: "Agente de IA" }
    ],
    menus: [
      {
        id: "proyecto", nombre: "Proyecto", items: [
          { id: "crear", t: "Crear un proyecto nuevo (Create new project)", k: "Ctrl+N" },
          { id: "abrir", t: "Abrir proyecto (Open project)", k: "Ctrl+O" },
          { id: "recientes", t: "Abrir proyecto reciente (Open recent project)" },
          { id: "cerrar", t: "Cerrar proyecto (Close project)", k: "Alt+X" },
          { id: "memo", t: "Memo del proyecto (Project memo)", k: "Ctrl+M" },
          { id: "ajustes", t: "Configuración (Settings)", k: "Alt+S" },
          { id: "resumen", t: "Resumen del proyecto (Project summary)" },
          { id: "encuesta", t: "Importar encuesta (Import survey)" },
          { id: "exportar", t: "Exportar (Export)" },
          { id: "salir", t: "Salir (Exit)", k: "Ctrl+Q" }
        ]
      },
      {
        id: "gestionar", nombre: "Gestionar", items: [
          { id: "archivos", t: "Archivos (Files)", k: "Alt+F" },
          { id: "casos", t: "Casos (Cases)", k: "Alt+C" },
          { id: "atributos", t: "Atributos (Attributes)", k: "Alt+A" },
          { id: "diarios", t: "Diarios (Journals)", k: "Alt+J" },
          { id: "referencias", t: "Referencias (References)" },
          { id: "enlaces", t: "Enlaces rotos a archivos (Bad links to files)" }
        ]
      },
      {
        id: "codificar", nombre: "Codificar", items: [
          { id: "texto", t: "Codificar texto (Code text)", k: "Alt+T" },
          { id: "pdf", t: "Codificar PDF (Code pdf)" },
          { id: "imagen", t: "Codificar imagen (Code image)", k: "Alt+I" },
          { id: "av", t: "Codificar audio y video (Code audio/video)", k: "Alt+V" },
          { id: "ia", t: "Codificación asistida por IA (AI assisted coding)" },
          { id: "organizador", t: "Organizador de códigos (Code organiser)" },
          { id: "colores", t: "Esquema de color (Colour scheme)", k: "Alt+E" }
        ]
      },
      {
        id: "analisis", nombre: "Análisis", items: [
          { id: "recuperacion", t: "Recuperación de códigos (Code retrieval)", k: "Alt+K" },
          { id: "coocurrencia", t: "Co-ocurrencia de códigos (Code co-occurrence)" },
          { id: "relaciones", t: "Relaciones entre códigos (Code relations)" },
          { id: "exactas", t: "Coincidencias exactas de texto (Code text exact matches)" },
          { id: "grafo", t: "Grafo (Graph)", k: "Alt+G" }
        ]
      },
      {
        id: "informes", nombre: "Informes", items: [
          { id: "frecuencias", t: "Frecuencias de códigos (Code frequencies)", k: "Alt+N" },
          { id: "conteos", t: "Conteos por archivo o caso (Code counts by file/case)" },
          { id: "resumen_codigo", t: "Resumen de códigos (Code summary)", k: "Alt+P" },
          { id: "resumen_archivo", t: "Resumen de archivos (File summary)", k: "Alt+O" },
          { id: "comparacion", t: "Comparación de codificación (Coding comparison)", k: "Alt+L" },
          { id: "comparacion_archivo", t: "Comparación por archivo (Coding comparison by file)", k: "Alt+M" },
          { id: "graficas", t: "Gráficas (Charts)", k: "Alt+U" },
          { id: "consultas", t: "Consultas a la base de datos (Database queries)", k: "Alt+D" }
        ]
      },
      {
        id: "ia", nombre: "IA", items: [
          { id: "asistente", t: "Asistente de configuración (Setup Wizard)" },
          { id: "ajustes_ia", t: "Configuración (Settings)" },
          { id: "memoria", t: "Reconstruir la memoria interna (Rebuild internal memory)" },
          { id: "prompts", t: "Biblioteca de prompts (Prompt library)" },
          { id: "agente", t: "Agente de IA (AI Agent)" },
          { id: "codificacion_ia", t: "Codificación asistida por IA (AI Assisted Coding)" }
        ]
      },
      {
        id: "ayuda", nombre: "Ayuda", items: [
          { id: "contenido", t: "Contenido (Contents)", k: "Alt+H" },
          { id: "atajos", t: "Atajos de teclado (Keyboard shortcuts)" },
          { id: "preguntar", t: "Preguntar al agente de IA (Ask the AI Agent)" },
          { id: "especiales", t: "Funciones especiales (Special functions)", k: "Alt+Z" },
          { id: "acerca", t: "Acerca de (About)", k: "Alt+Y" }
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

  niveles: [

    /* ============================ 1 ============================ */
    {
      id: "n1",
      titulo: "Qué es codificar",
      lema: "Antes del programa está la decisión",
      insignia: { nombre: "Ojo de lector", icono: "◉" },
      video: "", // put a YouTube ID here, for example "dQw4w9WgXcQ"
      videoTitulo: "Qué hace y qué no hace un código",
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
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Lees esta línea de una entrevista. \"Ya van cuatro años y yo pensaba que eran unos meses.\" ¿Cuál etiqueta funciona mejor como código?",
          opciones: [
            { t: "Duración imprevista del cuidado", ok: true, dice: "Corto, nombra el fenómeno y sirve para comparar con otras entrevistas." },
            { t: "La señora lleva cuatro años cuidando a su mamá y no lo esperaba", ok: false, dice: "Eso es una paráfrasis. Un código cabe en una etiqueta, no en un renglón." },
            { t: "Tiempo", ok: false, dice: "Demasiado ancho. Bajo esa etiqueta va a caer medio corpus." },
            { t: "Cuatro años", ok: false, dice: "Es un dato del caso, no un concepto. No se repite en otras entrevistas." }
          ]
        },
        {
          tipo: "interfaz",
          xp: 10,
          instruccion: "Primer contacto con la ventana. Abre la pestaña donde el programa deja sus mensajes, los avisos de respaldo y los resultados de algunos informes.",
          objetivo: "Ver el registro de acciones",
          ruta: ["pestana", "registro"],
          pista: "Es la primera de las cinco pestañas de la ventana principal.",
          dice: "Conviene mirarla después de abrir el proyecto y después de cualquier operación grande. Varios avisos aparecen ahí y en ningún otro lado."
        },
        {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada pieza con lo que hace. Toca una tarjeta de la izquierda y luego su definición.",
          pares: [
            { a: "Código", b: "Etiqueta que se aplica a un fragmento de datos" },
            { a: "Categoría", b: "Agrupa códigos que comparten un sentido" },
            { a: "Segmento", b: "El trozo de texto marcado dentro del archivo" },
            { a: "Memo", b: "Registro de por qué tomaste una decisión analítica" },
            { a: "Anotación", b: "Nota sobre un punto del texto, sin asignar código" }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Cuándo conviene crear una categoría?",
          opciones: [
            { t: "Cuando ya tienes varios códigos que se parecen y quieres verlos juntos", ok: true, dice: "La categoría llega después de los códigos, no antes." },
            { t: "Al abrir el proyecto, para tener el árbol listo desde el inicio", ok: false, dice: "Encaja con un marco cerrado. Si estás explorando, un árbol prefabricado te obliga a meter el dato donde no cabe." },
            { t: "Nunca, las categorías son de otros programas", ok: false, dice: "QualCoder sí tiene categorías y las muestra como carpetas en el árbol de códigos." }
          ]
        }
      ]
    },

    /* ============================ 2 ============================ */
    {
      id: "n2",
      titulo: "Abrir el proyecto",
      lema: "Media hora aquí ahorra semanas después",
      insignia: { nombre: "Cartografía", icono: "▤" },
      video: "",
      videoTitulo: "Crear el proyecto, configurar e importar",
      lectura: `
        <p>Un proyecto de QualCoder es una carpeta terminada en <code>.qda</code>. Dentro viven la base de datos
        y las copias de los archivos. Se mueve completa, se respalda completa y se comparte completa.</p>
        <p>Antes de codificar hay que pasar por Configuración (Settings) y cambiar el nombre del codificador,
        que por defecto es <code>default</code>. Todo lo que marques queda firmado con ese nombre, y reparar
        codificaciones firmadas mal cuesta caro.</p>
        <p>El material entra por Gestionar (Manage) y sus módulos. Archivos para textos, PDF, imágenes y medios,
        y una entrada aparte en el menú Proyecto para importar encuestas desde CSV o XLSX.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Estás frente a QualCoder recién abierto. Crea el proyecto donde vivirán las entrevistas.",
          objetivo: "Crear un proyecto nuevo",
          ruta: ["proyecto", "crear"],
          pista: "Todo lo que enmarca al proyecto completo cuelga del primer menú.",
          dice: "QualCoder pide nombre y ubicación, y construye la carpeta .qda con sus subcarpetas y la base de datos vacía."
        },
        {
          tipo: "dialogo",
          xp: 15,
          instruccion: "Se abrió Configuración (Settings). Déjala lista para trabajar en español y con tu firma.",
          titulo: "Configuración (Settings)",
          campos: [
            { id: "idioma", etiqueta: "Idioma de la interfaz", tipo: "select", opciones: ["English", "Español", "Français", "Deutsch"], correcto: "Español" },
            { id: "coder", etiqueta: "Nombre del codificador", tipo: "texto", marcador: "Escribe un nombre", correcto: "cualquiera" },
            { id: "respaldo", etiqueta: "Copia de seguridad al abrir el proyecto", tipo: "casilla", correcto: true }
          ],
          boton: "Guardar",
          dice: "El cambio de idioma pide reiniciar el programa. Y ojo, las copias automáticas rotan, por defecto se guardan cinco."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "El proyecto está vacío. Abre el módulo por donde entra todo el material al proyecto.",
          objetivo: "Abrir el gestor de archivos",
          ruta: ["gestionar", "archivos"],
          pista: "Archivos, casos, atributos, diarios y referencias viven en el mismo menú.",
          dice: "Desde ahí se importa, se vincula, se renombra y se asignan atributos. Copiar deja el proyecto autónomo, vincular deja los archivos fuera y esos enlaces se rompen al cambiar de computadora."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de empezar quieres ver qué hay dentro del proyecto y si algún archivo vinculado se perdió.",
          objetivo: "Generar el resumen del proyecto",
          ruta: ["proyecto", "resumen"],
          pista: "Es una entrada del menú Proyecto y su resultado sale en el registro de acciones.",
          dice: "El resumen lista recuentos de archivos, casos, códigos y atributos, y destaca los enlaces rotos. Conviene ejecutarlo al retomar un proyecto viejo."
        },
        {
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

    /* ============================ 3 ============================ */
    {
      id: "n3",
      titulo: "Codificar texto",
      lema: "Seleccionar, elegir el código, marcar",
      insignia: { nombre: "Marcador", icono: "▮" },
      video: "",
      videoTitulo: "El módulo Codificar texto por dentro",
      lectura: `
        <p>Codificar texto (Code text) es el módulo central. A la izquierda están las pestañas Documentos y
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Ya tienes las entrevistas dentro. Abre el módulo donde se codifican los textos.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          pista: "Hay un módulo distinto para texto, PDF, imagen y audio o video.",
          dice: "También se abre con Alt+T desde cualquier punto del programa. El módulo se aloja en la pestaña Codificar, no en una ventana aparte."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "El árbol de códigos está vacío para este tema. Crea el código que vas a necesitar, sin colgarlo de ninguna categoría.",
          objetivo: "Crear un código nuevo desde el árbol",
          ruta: ["codigo:Culpa", "crear_codigo"],
          pista: "El árbol de códigos se maneja con clic derecho sobre cualquiera de sus elementos.",
          dice: "Crear un código nuevo lo pone en el nivel superior. Para colgarlo de una categoría existe Añadir un código nuevo a la categoría, y para hacerlo subcódigo, Añadir un subcódigo."
        },
        {
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
        {
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
        {
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

    /* ============================ 4 ============================ */
    {
      id: "n4",
      titulo: "En vivo, anotar y memos",
      lema: "La voz del campo y la tuya",
      insignia: { nombre: "Voz del campo", icono: "❝" },
      video: "",
      videoTitulo: "Código in vivo, anotaciones, memos y diario",
      lectura: `
        <p>El módulo cubre tres operaciones que conviene no confundir. <strong>Codificar</strong> asigna un
        código a un segmento y entra en los informes. <strong>Anotar</strong> deja una nota sobre el texto sin
        asignar código, y no entra en ningún informe de codificación, sirve para lo que todavía no sabes cómo
        nombrar. <strong>El memo de la codificación</strong> documenta por qué aplicaste ese código a ese
        segmento concreto.</p>
        <p>El código in vivo crea una etiqueta con las palabras exactas del texto seleccionado. Sirve cuando la
        expresión dice algo que el vocabulario académico aplana, y estorba cuando se abusa.</p>
        <p>El diario (Journal) es el único módulo que se abre en ventana aparte. Ahí va la bitácora fechada del
        proceso, que después es tu apartado de método.</p>
      `,
      ejercicios: [
        {
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
        {
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
        {
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Terminaste la sesión y quieres dejar por escrito qué decidiste y por qué.",
          objetivo: "Abrir los diarios del proyecto",
          ruta: ["gestionar", "diarios"],
          pista: "Se gestionan junto con los archivos, los casos y los atributos.",
          dice: "Se pueden tener varios diarios, uno metodológico y otro de campo. Es el único módulo que se abre en ventana propia, así que puedes escribir mientras codificas."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Qué diferencia hay entre el memo de un código y el memo de una codificación?",
          opciones: [
            { t: "El del código define la etiqueta en general, el de la codificación explica por qué la aplicaste a ese segmento", ok: true, dice: "Y todavía hay un tercero, el memo del archivo, que documenta el documento completo." },
            { t: "Son lo mismo, solo cambia dónde se abren", ok: false, dice: "No. Uno viaja con el código por todo el proyecto, el otro pertenece a una codificación concreta." },
            { t: "El de la codificación se exporta y el del código no", ok: false, dice: "Los dos se pueden llevar a los informes." }
          ]
        }
      ]
    },

    /* ============================ 5 ============================ */
    {
      id: "n5",
      titulo: "El árbol de códigos",
      lema: "De la lista larga al mapa",
      insignia: { nombre: "Arquitectura", icono: "⌗" },
      video: "",
      videoTitulo: "Categorías, fusiones, colores y organizador",
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
        {
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
        {
          tipo: "interfaz",
          xp: 20,
          instruccion: "En el árbol tienes Culpa y Sentimiento de culpa diciendo lo mismo. Únelos sin perder ninguna codificación.",
          objetivo: "Fusionar Sentimiento de culpa en otro código",
          ruta: ["codigo:Sentimiento de culpa", "fusionar"],
          pista: "Las operaciones sobre un código salen de su menú contextual, no de la barra de menús.",
          dice: "Las codificaciones del código que desaparece pasan al de destino. Si hubieras elegido Eliminar, se habrían borrado con él y sin deshacer."
        },
        {
          tipo: "interfaz",
          xp: 20,
          instruccion: "Ya creaste la categoría Costos del cuidado. Ahora mete ahí el código Abandono del empleo.",
          objetivo: "Mover Abandono del empleo a una categoría",
          ruta: ["codigo:Abandono del empleo", "mover"],
          pista: "Es otra entrada del mismo menú contextual, la que abre una lista jerárquica de destinos.",
          dice: "La lista deja elegir entre el nivel superior, una categoría o incluso otro código, que lo convertiría en subcódigo."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Un código tiene una sola codificación en todo el corpus, hecha hace cuatro meses. ¿Qué haces?",
          opciones: [
            { t: "Revisar el segmento y decidir si entra en otro código o si vale por sí mismo", ok: true, dice: "Un caso único puede ser un hallazgo o el resto de una idea que abandonaste. Hay que mirarlo." },
            { t: "Eliminarlo, uno solo no significa nada", ok: false, dice: "La frecuencia no decide relevancia, y eliminar borra también su codificación." },
            { t: "Dejarlo ahí, no molesta", ok: false, dice: "Cien códigos huérfanos sí molestan y ensucian cualquier informe." }
          ]
        }
      ]
    },

    /* ============================ 6 ============================ */
    {
      id: "n6",
      titulo: "Casos y atributos",
      lema: "Para comparar hay que poder separar",
      insignia: { nombre: "Fichero", icono: "▦" },
      video: "",
      videoTitulo: "Casos, atributos y encuestas",
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Rosa tiene dos entrevistas y una nota de campo. Vas a juntarlas bajo una misma unidad.",
          objetivo: "Abrir la gestión de casos",
          ruta: ["gestionar", "casos"],
          pista: "Está en el mismo menú donde importaste los archivos.",
          dice: "Un caso puede reunir archivos completos o tramos marcados dentro de un archivo."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres registrar si cada cuidadora trabaja fuera de casa, para poder comparar después.",
          objetivo: "Abrir la gestión de atributos",
          ruta: ["gestionar", "atributos"],
          pista: "Las variables descriptivas tienen su propia entrada en el menú Gestionar.",
          dice: "Los atributos pueden ser de texto o numéricos y se aplican a archivos o a casos. Después filtran en casi todos los informes."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Te llegó una encuesta en CSV con tres preguntas abiertas y ocho variables de perfil. Métela al proyecto.",
          objetivo: "Importar una encuesta",
          ruta: ["proyecto", "encuesta"],
          pista: "No está en Gestionar, la importación de encuestas cuelga del menú Proyecto.",
          dice: "La importación crea los casos, los atributos y un archivo de texto por respuesta, todo de una pasada."
        },
        {
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
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Quieres comparar qué dicen las cuidadoras que trabajan fuera de casa frente a las que no. ¿Qué necesitas tener listo?",
          opciones: [
            { t: "El atributo cargado en cada caso o archivo", ok: true, dice: "Sin atributos no hay con qué filtrar y esa comparación no se puede armar." },
            { t: "Solo más códigos", ok: false, dice: "Más códigos no separan grupos. La variable de comparación vive en los atributos." },
            { t: "Exportar todo a una hoja de cálculo y hacerlo a mano", ok: false, dice: "Se puede, pero el programa filtra sin errores de copiado." }
          ]
        }
      ]
    },

    /* ============================ 7 ============================ */
    {
      id: "n7",
      titulo: "Recuperar y mirar",
      lema: "El informe no piensa por ti",
      insignia: { nombre: "Lupa", icono: "◎" },
      video: "",
      videoTitulo: "Recuperación, frecuencias y gráficas",
      lectura: `
        <p>Codificar sin recuperar es archivar. La recuperación de códigos junta todos los segmentos de un
        código y los pone uno detrás de otro con su archivo de origen. Ahí se ve si el código aguanta o si
        estaba metiendo cosas distintas en la misma bolsa.</p>
        <p>Las salidas están repartidas en dos menús. En Análisis viven la recuperación, las co-ocurrencias, las
        relaciones y el grafo. En Informes viven las frecuencias, los conteos por archivo o caso, los resúmenes,
        las comparaciones entre codificadores, las gráficas y las consultas a la base de datos.</p>
        <p>Cuidado con la frecuencia. Un código con noventa apariciones puede ser importante o puede ser que lo
        estés aplicando a todo. La cuenta describe tu codificación, no la realidad del campo.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres leer juntos todos los fragmentos que marcaste con el código Culpa.",
          objetivo: "Abrir la recuperación de códigos",
          ruta: ["analisis", "recuperacion"],
          pista: "No está en Informes. Lo que devuelve segmentos para leer cuelga del menú Análisis.",
          dice: "También se abre con Alt+K. Devuelve los segmentos con su archivo de origen y permite filtrar por códigos, archivos, casos y atributos."
        },
        {
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de escribir resultados quieres ver cuántas veces se aplicó cada código y quién lo aplicó.",
          objetivo: "Abrir las frecuencias de códigos",
          ruta: ["informes", "frecuencias"],
          pista: "Las cuentas están en el menú Informes, no en Análisis.",
          dice: "Muestra el total por código y el desglose por codificador. Para ver cómo se reparte entre archivos o casos está Conteos por archivo o caso."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Necesitas una figura para el artículo con el peso de cada categoría.",
          objetivo: "Abrir las gráficas",
          ruta: ["informes", "graficas"],
          pista: "Está en Informes, con atajo Alt+U.",
          dice: "Las gráficas cuentan por frecuencia, por caracteres codificados o por área de imagen, y no es lo mismo. Elige la unidad según lo que quieras mostrar."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Abres la recuperación del código Culpa y ves que la mitad de los segmentos hablan de vergüenza frente a los hermanos y la otra mitad de arrepentimiento por enojarse. ¿Qué te dice eso?",
          opciones: [
            { t: "Que el código junta dos cosas distintas y conviene dividirlo", ok: true, dice: "Ese es el uso fuerte de la recuperación, ver de golpe lo que aplicaste caso por caso." },
            { t: "Que el código es muy productivo y hay que dejarlo así", ok: false, dice: "Un código que abarca dos fenómenos no es productivo, es impreciso." },
            { t: "Que hay un error del programa", ok: false, dice: "El programa devuelve lo que marcaste. El problema está en las decisiones." }
          ]
        }
      ]
    },

    /* ============================ 8 ============================ */
    {
      id: "n8",
      titulo: "Equipo y mantenimiento",
      lema: "El acuerdo se construye, no se decreta",
      insignia: { nombre: "Podadora", icono: "✂" },
      video: "",
      videoTitulo: "Acuerdo entre codificadores y funciones especiales",
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Tu colega codificó las mismas dos entrevistas que tú. Vas a ver dónde coinciden y dónde no.",
          objetivo: "Abrir la comparación de codificación",
          ruta: ["informes", "comparacion"],
          pista: "Es un informe y tiene atajo Alt+L.",
          dice: "Compara dos codificadores en todo el corpus. Si quieres verlo dentro de un archivo concreto, existe Comparación por archivo."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Cambiaste el proyecto de computadora y varios archivos vinculados ya no abren.",
          objetivo: "Reparar los enlaces rotos",
          ruta: ["gestionar", "enlaces"],
          pista: "Los archivos vinculados se gestionan donde se gestionan los archivos.",
          dice: "El resumen del proyecto los detecta y este módulo los repara. Con archivos copiados en vez de vinculados el problema no existe."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Tu colega te mandó su proyecto aparte y quieres incorporarlo al tuyo.",
          objetivo: "Abrir las funciones especiales",
          ruta: ["ayuda", "especiales"],
          pista: "No están en Proyecto. Cuelgan del menú Ayuda, con atajo Alt+Z.",
          dice: "Ahí viven fusionar proyectos, sustituir el texto de un archivo y desplazar posiciones de codificación. Copia la carpeta a mano antes de usarlas."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Dos codificadores marcan el mismo fragmento con códigos distintos. ¿Qué es lo primero que hay que hacer?",
          opciones: [
            { t: "Revisar juntos el memo de cada código y precisar qué entra en cada uno", ok: true, dice: "El desacuerdo casi siempre nace de definiciones vagas, no de mala fe." },
            { t: "Calcular la kappa y quedarse con el resultado", ok: false, dice: "El coeficiente mide, no resuelve. Sin revisar las definiciones el siguiente cálculo sale igual." },
            { t: "Que decida quien tenga más experiencia", ok: false, dice: "Eso cierra la discusión sin arreglar el instrumento." }
          ]
        },
        {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada problema con la operación que lo resuelve.",
          pares: [
            { a: "Dos códigos dicen lo mismo", b: "Fusionar el código en otro" },
            { a: "El nombre confunde a quien lee", b: "Renombrar y actualizar su memo" },
            { a: "Los códigos sueltos no se entienden juntos", b: "Crear categorías y mover los códigos" },
            { a: "Un archivo vinculado ya no abre", b: "Reparar enlaces rotos" },
            { a: "Hay que unir el proyecto de dos personas", b: "Funciones especiales, fusionar proyectos" }
          ]
        }
      ]
    },

    /* ============================ 9 ============================ */
    {
      id: "n9",
      titulo: "Prueba de campo",
      lema: "Todo junto, una vez más",
      insignia: { nombre: "Codificación de campo", icono: "★" },
      video: "",
      videoTitulo: "Cierre del curso",
      lectura: `
        <p>Última misión. Una entrevista nueva, un sistema de códigos a medio construir y las decisiones de
        siempre. Nada que no hayas hecho ya, y esta vez sin pistas fáciles.</p>
        <p>Al terminar se libera la constancia, con tu nombre, tus XP y tus insignias.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Llegó la entrevista E04_Marta y ya está importada. Abre donde vas a marcarla.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          dice: "De memoria y sin pista, que es como se trabaja."
        },
        {
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
        {
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
        {
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
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de cerrar quieres releer juntos todos los segmentos del código que más creció.",
          objetivo: "Abrir la recuperación de códigos",
          ruta: ["analisis", "recuperacion"],
          dice: "Recuperar cada dos o tres archivos nuevos es lo que evita descubrir a los seis meses que un código traía dos cosas dentro."
        },
        {
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
