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

  // Simulated QualCoder window used by the "interfaz" activities.
  interfaz: {
    proyecto: "Cuidados_2026.qda",
    menus: [
      {
        id: "proyecto", nombre: "Proyecto", items: [
          { id: "crear", t: "Crear proyecto nuevo (Create new project)" },
          { id: "abrir", t: "Abrir proyecto (Open project)" },
          { id: "cerrar", t: "Cerrar proyecto (Close project)" },
          { id: "memo", t: "Memo del proyecto (Project memo)" },
          { id: "respaldo", t: "Respaldar proyecto (Backup project)" },
          { id: "ajustes", t: "Ajustes (Settings)" },
          { id: "salir", t: "Salir (Exit)" }
        ]
      },
      {
        id: "gestionar", nombre: "Gestionar", items: [
          { id: "archivos", t: "Gestionar archivos (Manage files)" },
          { id: "cat_archivos", t: "Categorías de archivos (File categories)" },
          { id: "diarios", t: "Gestionar diarios (Manage journals)" },
          { id: "casos", t: "Gestionar casos (Manage cases)" },
          { id: "atributos", t: "Gestionar atributos (Manage attributes)" },
          { id: "referencias", t: "Gestionar referencias (Manage references)" },
          { id: "encuesta", t: "Importar encuesta (Import survey)" }
        ]
      },
      {
        id: "codificar", nombre: "Codificar", items: [
          { id: "texto", t: "Codificar texto (Code text)" },
          { id: "imagen", t: "Codificar imagen (Code image)" },
          { id: "av", t: "Codificar audio y video (Code audio/video)" },
          { id: "caso", t: "Codificar por caso (Code by case)" },
          { id: "organizador", t: "Organizador de códigos (Code organiser)" }
        ]
      },
      {
        id: "informes", nombre: "Informes", items: [
          { id: "codificacion", t: "Informes de codificación (Coding reports)" },
          { id: "frecuencias", t: "Frecuencia de códigos (Code frequencies)" },
          { id: "graficas", t: "Gráficas (Charts)" },
          { id: "grafo", t: "Ver grafo (View graph)" },
          { id: "codificadores", t: "Comparación entre codificadores (Coder comparisons)" },
          { id: "mineria", t: "Buscar texto (Text mining)" }
        ]
      },
      {
        id: "ayuda", nombre: "Ayuda", items: [
          { id: "contenido", t: "Contenido de la ayuda (Help contents)" },
          { id: "acerca", t: "Acerca de (About)" }
        ]
      }
    ],
    // Right-click menu over a code in the codes panel.
    contextual: [
      { id: "memo_codigo", t: "Memo del código" },
      { id: "renombrar", t: "Renombrar" },
      { id: "color", t: "Cambiar color" },
      { id: "fusionar", t: "Fusionar con otro código" },
      { id: "mover", t: "Mover a categoría" },
      { id: "eliminar", t: "Eliminar código" }
    ],
    codigos: [
      { nombre: "Abandono del empleo", color: "coral" },
      { nombre: "Culpa", color: "violeta" },
      { nombre: "Sentimiento de culpa", color: "violeta" },
      { nombre: "Duración imprevista", color: "turquesa" },
      { nombre: "Reparto desigual", color: "amarillo" }
    ],
    archivos: ["E01_Rosa.txt", "E02_Alicia.txt", "E03_Delia.docx", "E04_Marta.txt"],
    fragmento: "Yo trabajaba en la farmacia de la esquina, ocho años llevaba ahí. Cuando mi mamá empezó a necesitar ayuda para todo, pedí mi liquidación y me salí."
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
        <p>QualCoder no codifica por ti. Guarda tus decisiones, las ordena y te las devuelve cuando las
        necesitas. Ese es el trato.</p>
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
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada pieza con lo que hace. Toca una tarjeta de la izquierda y luego su definición.",
          pares: [
            { a: "Código", b: "Etiqueta que se aplica a un fragmento de datos" },
            { a: "Categoría", b: "Agrupa códigos que comparten un sentido" },
            { a: "Segmento", b: "El trozo de texto marcado dentro del archivo" },
            { a: "Memo", b: "Registro de por qué tomaste una decisión analítica" },
            { a: "Código en vivo", b: "Etiqueta tomada literal de las palabras del participante" }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Cuándo conviene crear una categoría?",
          opciones: [
            { t: "Cuando ya tienes varios códigos que se parecen y quieres verlos juntos", ok: true, dice: "La categoría llega después de los códigos, no antes." },
            { t: "Al abrir el proyecto, para tener el árbol listo desde el inicio", ok: false, dice: "Encaja con un marco cerrado. Si estás explorando, un árbol prefabricado te obliga a meter el dato donde no cabe." },
            { t: "Nunca, las categorías son de otros programas", ok: false, dice: "QualCoder sí tiene categorías y las muestra como carpetas en el panel de códigos." }
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
      videoTitulo: "Crear el proyecto, ajustes e importación",
      lectura: `
        <p>Un proyecto de QualCoder es una carpeta terminada en <code>.qda</code>. Dentro viven la base de datos
        y las copias de tus archivos. Se mueve completa, se respalda completa y se comparte completa.</p>
        <p>Antes de codificar conviene pasar por Ajustes (Settings) y dejar puesto tu nombre de codificador.
        Todo lo que marques queda firmado con ese nombre, y eso es lo que después permite comparar entre
        personas del equipo.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Estás frente a QualCoder recién abierto. Crea el proyecto donde vivirán las entrevistas.",
          objetivo: "Crear un proyecto nuevo",
          ruta: ["proyecto", "crear"],
          pista: "Todo lo que afecta al proyecto completo cuelga del primer menú.",
          dice: "Se abre el diálogo para elegir carpeta y nombre. QualCoder crea ahí una carpeta .qda con la base de datos dentro."
        },
        {
          tipo: "dialogo",
          xp: 15,
          instruccion: "Se abrió la ventana de Ajustes (Settings). Déjala lista para trabajar en español y con tu firma.",
          titulo: "Ajustes (Settings)",
          campos: [
            { id: "idioma", etiqueta: "Idioma de la interfaz", tipo: "select", opciones: ["English", "Español", "Français", "Deutsch"], correcto: "Español" },
            { id: "coder", etiqueta: "Nombre del codificador", tipo: "texto", marcador: "Escribe un nombre", correcto: "cualquiera" },
            { id: "respaldo", etiqueta: "Respaldar el proyecto al abrirlo", tipo: "casilla", correcto: true }
          ],
          boton: "Guardar ajustes",
          dice: "Con el respaldo automático encendido, cada vez que abres el proyecto queda una copia fechada junto a la carpeta .qda."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "El proyecto está vacío. Mete las cuatro entrevistas transcritas.",
          objetivo: "Importar los archivos de entrevista",
          ruta: ["gestionar", "archivos"],
          pista: "Los archivos, casos, atributos y diarios viven todos en el mismo menú.",
          dice: "Desde Gestionar archivos (Manage files) se importan textos, PDF, imágenes, audio y video, y ahí mismo se revisa cómo quedaron."
        },
        {
          tipo: "secuencia",
          xp: 15,
          instruccion: "Ordena el arranque de un proyecto. Toca los pasos en el orden correcto.",
          pasos: [
            "Crear el proyecto y darle un nombre sin espacios raros",
            "Poner tu nombre de codificador en Ajustes",
            "Importar los archivos de entrevista",
            "Abrir cada archivo y revisar que el texto se lee bien",
            "Escribir en el diario qué decisiones tomaste hoy"
          ]
        }
      ]
    },

    /* ============================ 3 ============================ */
    {
      id: "n3",
      titulo: "Tu primer código",
      lema: "Marcar, nombrar, seguir",
      insignia: { nombre: "Marcador", icono: "▮" },
      video: "",
      videoTitulo: "Crear un código y marcar un segmento",
      lectura: `
        <p>En Codificar texto (Code text) tienes el archivo a la derecha y el panel de códigos a la izquierda.
        La operación básica siempre es la misma. Seleccionas el fragmento, eliges el código y lo aplicas. El
        segmento queda con el color del código.</p>
        <p>El tamaño importa. Si marcas una frase suelta pierdes el contexto y el informe devuelve fragmentos
        ilegibles. Si marcas la página entera, el código deja de significar algo. Marca lo mínimo que todavía
        se entiende solo.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Ya tienes las entrevistas dentro. Abre la ventana donde se codifica texto.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          pista: "Hay una ventana distinta para cada tipo de dato, texto, imagen y audio o video.",
          dice: "Esta es la ventana donde vas a pasar la mayor parte del análisis."
        },
        {
          tipo: "dialogo",
          xp: 15,
          instruccion: "Vas a crear el primer código para el fragmento donde la participante deja su trabajo. Llámalo Abandono del empleo.",
          titulo: "Añadir código nuevo",
          campos: [
            { id: "nombre", etiqueta: "Nombre del código", tipo: "texto", marcador: "Abandono del empleo", correcto: ["abandono"] },
            { id: "color", etiqueta: "Color", tipo: "select", opciones: ["Sin color", "Coral", "Turquesa", "Violeta"], correcto: "Coral" },
            { id: "memo", etiqueta: "Escribir el memo del código ahora", tipo: "casilla", correcto: true }
          ],
          boton: "Crear código",
          dice: "El memo escrito el mismo día en que nace el código es el que después te salva de aplicarlo a cualquier cosa."
        },
        {
          tipo: "codificar",
          xp: 20,
          instruccion: "Entrevista E01_Rosa. Toca el fragmento que habla de haber dejado el empleo y aplícale el código.",
          pista: "Busca la frase donde aparece la decisión laboral, no la que explica la enfermedad.",
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
          solucion: { segmentos: [1], codigo: "c1" }
        },
        {
          tipo: "codificar",
          xp: 20,
          instruccion: "Sigue la misma entrevista. Marca el tramo que muestra que el cuidado duró mucho más de lo previsto.",
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
          solucion: { segmentos: [1, 2], codigo: "c3" }
        }
      ]
    },

    /* ============================ 4 ============================ */
    {
      id: "n4",
      titulo: "En vivo, memos y diario",
      lema: "La voz del campo y la tuya",
      insignia: { nombre: "Voz del campo", icono: "❝" },
      video: "",
      videoTitulo: "Códigos en vivo, memos y diario de campo",
      lectura: `
        <p>Un código en vivo usa las palabras exactas de la persona entrevistada como nombre de la etiqueta.
        Sirve cuando la expresión dice algo que el vocabulario académico aplana. No abuses, veinte códigos en
        vivo son veinte etiquetas que solo existen en una entrevista.</p>
        <p>El memo de código explica qué entra y qué no entra bajo esa etiqueta. El diario (Journal) registra el
        proceso con fecha. Lo primero salva tu consistencia, lo segundo salva tu apartado de método.</p>
      `,
      ejercicios: [
        {
          tipo: "codificar",
          xp: 20,
          instruccion: "Vas a crear un código en vivo. Toca la frase cuya fuerza está en las palabras de la participante y aplícale la etiqueta que las conserva.",
          pista: "Un código en vivo se llama igual que el fragmento, no lo traduce a lenguaje técnico.",
          texto: [
            "Mis hermanos vienen los domingos,",
            "pero el día a día es mío.",
            "Yo no me quejo, cada quien tiene su vida."
          ],
          codigos: [
            { id: "v1", nombre: "\"el día a día es mío\"", color: "amarillo" },
            { id: "v2", nombre: "Distribución de tareas domésticas", color: "turquesa" },
            { id: "v3", nombre: "\"cada quien tiene su vida\"", color: "violeta" }
          ],
          solucion: { segmentos: [1], codigo: "v1" }
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
          instruccion: "Terminaste la sesión de hoy y quieres dejar por escrito qué decidiste y por qué.",
          objetivo: "Abrir el diario del proyecto",
          ruta: ["gestionar", "diarios"],
          pista: "El diario se gestiona junto con los archivos, los casos y los atributos.",
          dice: "Puedes tener varios diarios, uno de decisiones metodológicas y otro de trabajo de campo, por ejemplo."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Qué diferencia hay entre un memo de código y una anotación sobre el texto?",
          opciones: [
            { t: "El memo de código define la etiqueta, la anotación comenta un punto concreto del archivo", ok: true, dice: "Uno viaja con el código por todo el proyecto, la otra se queda pegada a ese lugar del documento." },
            { t: "Son lo mismo con distinto nombre", ok: false, dice: "No. Si borras un código, su memo se va con él. La anotación pertenece al documento." },
            { t: "La anotación se exporta y el memo no", ok: false, dice: "Ambos se pueden llevar a los informes." }
          ]
        }
      ]
    },

    /* ============================ 5 ============================ */
    {
      id: "n5",
      titulo: "Ordenar el sistema",
      lema: "De la lista larga al mapa",
      insignia: { nombre: "Arquitectura", icono: "⌗" },
      video: "",
      videoTitulo: "Categorías, fusiones y color",
      lectura: `
        <p>Después de dos o tres entrevistas vas a tener una lista larga y desordenada. Agrupar códigos en
        categorías obliga a decidir qué tienen en común, y esa decisión ya es análisis.</p>
        <p>Sobre cada código del panel izquierdo hay un menú contextual con las operaciones de mantenimiento,
        renombrar, cambiar color, mover a categoría, fusionar y eliminar. Fusionar conserva los segmentos de
        los dos códigos, eliminar los tira.</p>
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
          instruccion: "En el panel de códigos tienes Culpa y Sentimiento de culpa diciendo lo mismo. Únelos sin perder ningún segmento.",
          objetivo: "Fusionar Sentimiento de culpa con otro código",
          ruta: ["codigo:Sentimiento de culpa", "fusionar"],
          pista: "Las operaciones sobre un código salen del menú contextual del propio código, no de la barra de menús.",
          dice: "Al fusionar, los segmentos marcados con el código que desaparece pasan al que conservas."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Un código tiene un solo segmento en todo el corpus, marcado hace cuatro meses. ¿Qué haces?",
          opciones: [
            { t: "Revisar el segmento y decidir si entra en otro código o si vale por sí mismo", ok: true, dice: "Un caso único puede ser un hallazgo o el resto de una idea que abandonaste. Hay que mirarlo." },
            { t: "Borrarlo, uno solo no significa nada", ok: false, dice: "La frecuencia no decide relevancia. Un caso negativo puede ser lo más interesante del corpus." },
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
      videoTitulo: "Casos, atributos y filtros",
      lectura: `
        <p>Un caso agrupa todo el material de una misma persona o unidad, aunque esté repartido en varios
        archivos. Un atributo es una variable que describe ese caso o ese archivo, la edad, si trabaja fuera,
        el municipio, cuántos años lleva cuidando.</p>
        <p>Sin atributos no hay comparación posible. Con ellos puedes pedir los segmentos de un código solo en
        las cuidadoras que trabajan fuera de casa, y ver si dicen algo distinto.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Rosa tiene dos entrevistas y una nota de campo. Vas a juntarlas bajo una misma unidad.",
          objetivo: "Abrir la gestión de casos",
          ruta: ["gestionar", "casos"],
          pista: "Está en el mismo menú donde importaste los archivos.",
          dice: "Un caso puede reunir archivos completos o solo tramos de un archivo, útil cuando una transcripción trae a varias personas."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres registrar si cada cuidadora trabaja fuera de casa, para poder comparar después.",
          objetivo: "Abrir la gestión de atributos",
          ruta: ["gestionar", "atributos"],
          pista: "Las variables descriptivas tienen su propia entrada en el menú Gestionar.",
          dice: "Los atributos pueden ser de texto o numéricos, y se aplican a archivos o a casos."
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
            { a: "Segmento", b: "Tramo del archivo marcado con un código" }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Quieres comparar qué dicen las cuidadoras que trabajan fuera de casa frente a las que no. ¿Qué necesitas tener listo?",
          opciones: [
            { t: "El atributo cargado en cada caso o archivo", ok: true, dice: "Sin atributos no hay con qué filtrar y esa comparación no se puede armar." },
            { t: "Solo más códigos", ok: false, dice: "Más códigos no separan grupos. La variable de comparación vive en los atributos." },
            { t: "Exportar todo a una hoja de cálculo y hacerlo a mano", ok: false, dice: "Se puede, pero el programa lo hace con filtros y sin errores de copiado." }
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
      videoTitulo: "Informes de codificación, frecuencias y gráficas",
      lectura: `
        <p>Codificar sin recuperar es archivar. La recuperación junta todos los segmentos de un código y te los
        pone uno detrás de otro con su referencia. Ahí se ve si el código aguanta o si estaba metiendo cosas
        distintas en la misma bolsa.</p>
        <p>Cuidado con la frecuencia. Un código con noventa apariciones puede ser importante o puede ser que lo
        estés aplicando a todo. La cuenta describe tu codificación, no la realidad del campo.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Quieres leer juntos todos los fragmentos que marcaste con el código Culpa.",
          objetivo: "Abrir los informes de codificación",
          ruta: ["informes", "codificacion"],
          pista: "Todo lo que devuelve resultados está en el mismo menú.",
          dice: "Ahí eliges códigos, archivos, casos y atributos, y el informe devuelve los segmentos con su origen."
        },
        {
          tipo: "dialogo",
          xp: 20,
          instruccion: "Configura el informe para poder revisar el código con contexto y llevártelo a tu procesador de textos.",
          titulo: "Informe de codificación (Coding report)",
          campos: [
            { id: "codigos", etiqueta: "Códigos incluidos", tipo: "select", opciones: ["Ninguno", "Solo Culpa", "Todos los códigos"], correcto: "Solo Culpa" },
            { id: "memos", etiqueta: "Incluir los memos de los códigos", tipo: "casilla", correcto: true },
            { id: "origen", etiqueta: "Mostrar el archivo de origen de cada segmento", tipo: "casilla", correcto: true },
            { id: "formato", etiqueta: "Formato de exportación", tipo: "select", opciones: ["ODT", "HTML", "CSV", "Portapapeles"], correcto: "ODT" }
          ],
          boton: "Ejecutar informe",
          dice: "Sin el archivo de origen los fragmentos pierden su rastro y ya no puedes volver a la entrevista completa."
        },
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Antes de escribir resultados quieres ver cuántas veces se aplicó cada código y en cuántos archivos.",
          objetivo: "Abrir la frecuencia de códigos",
          ruta: ["informes", "frecuencias"],
          pista: "Está junto a los informes de codificación.",
          dice: "La tabla muestra la cuenta total y en cuántos archivos aparece cada código, que suele ser el dato más honesto de los dos."
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
      titulo: "Trabajo en equipo",
      lema: "El acuerdo se construye, no se decreta",
      insignia: { nombre: "Podadora", icono: "✂" },
      video: "",
      videoTitulo: "Comparación entre codificadores y depuración",
      lectura: `
        <p>Si codifican varias personas, hace falta acordar antes qué significa cada código y revisar después
        cuánto coinciden. QualCoder incluye una comparación entre codificadores que reporta el acuerdo. El
        número importa menos que la conversación que provoca cuando no coinciden.</p>
        <p>La saturación no es que ya no salgan códigos nuevos porque estás cansado. Es que las entrevistas
        nuevas siguen cayendo en categorías existentes sin obligarte a inventar nada.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Tu colega codificó las mismas dos entrevistas que tú. Vas a ver dónde coinciden y dónde no.",
          objetivo: "Abrir la comparación entre codificadores",
          ruta: ["informes", "codificadores"],
          pista: "Es un informe, así que sale del menú de informes.",
          dice: "Para que esto funcione cada quien tuvo que codificar con su propio nombre de codificador puesto en Ajustes."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Dos codificadores marcan el mismo fragmento con códigos distintos. ¿Qué es lo primero que hay que hacer?",
          opciones: [
            { t: "Revisar juntos el memo de cada código y precisar qué entra en cada uno", ok: true, dice: "El desacuerdo casi siempre nace de definiciones vagas, no de mala fe." },
            { t: "Calcular el acuerdo y quedarse con el resultado", ok: false, dice: "El coeficiente mide, no resuelve. Sin revisar las definiciones el siguiente cálculo sale igual." },
            { t: "Que decida quien tenga más experiencia", ok: false, dice: "Eso cierra la discusión sin arreglar el instrumento." }
          ]
        },
        {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada problema con la operación que lo resuelve.",
          pares: [
            { a: "Dos códigos dicen lo mismo", b: "Fusionar" },
            { a: "Un código junta dos fenómenos", b: "Dividir y recodificar sus segmentos" },
            { a: "El nombre confunde a quien lee", b: "Renombrar y actualizar su memo" },
            { a: "Los códigos sueltos no se entienden juntos", b: "Crear categorías" },
            { a: "No hay registro de por qué cambió el sistema", b: "Escribir en el diario" }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Vas a compartir el proyecto con tu colega para que codifique en su computadora. ¿Qué le envías?",
          opciones: [
            { t: "La carpeta .qda completa", ok: true, dice: "La base de datos y los archivos van juntos, separarlos rompe el proyecto." },
            { t: "Solo el archivo de base de datos que está dentro", ok: false, dice: "Se queda sin los documentos y sin los medios." },
            { t: "Los informes exportados", ok: false, dice: "Eso comparte resultados, no el proyecto. No podría seguir codificando." }
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
        siempre. Nada que no hayas hecho ya.</p>
        <p>Al terminar se libera la constancia, con tu nombre, tus XP y tus insignias.</p>
      `,
      ejercicios: [
        {
          tipo: "interfaz",
          xp: 15,
          instruccion: "Llegó la entrevista E04_Marta y ya está importada. Abre la ventana para empezar a marcarla.",
          objetivo: "Abrir Codificar texto",
          ruta: ["codificar", "texto"],
          pista: "Ya pasaste por aquí en la misión tres.",
          dice: "De memoria y sin pista, que es como se trabaja."
        },
        {
          tipo: "codificar",
          xp: 25,
          instruccion: "Entrevista E04_Marta. Marca el tramo donde aparece el costo físico del cuidado.",
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
          solucion: { segmentos: [1], codigo: "m1" }
        },
        {
          tipo: "codificar",
          xp: 25,
          instruccion: "Misma entrevista. Ahora marca lo que muestra cómo se vuelve normal lo extraordinario.",
          pista: "Fíjate en la frase que cierra el tema sin quejarse.",
          texto: [
            "La espalda ya no me responde igual, el año pasado me mandaron terapia.",
            "Uno se acostumbra, ni modo.",
            "Mi hija dice que contrate a alguien, pero con qué."
          ],
          codigos: [
            { id: "m2", nombre: "Naturalización del sacrificio", color: "verde" },
            { id: "m3", nombre: "Límite económico", color: "amarillo" },
            { id: "m1", nombre: "Deterioro de la salud propia", color: "coral" }
          ],
          solucion: { segmentos: [1], codigo: "m2" }
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
          tipo: "abierta",
          xp: 25,
          instruccion: "Cierra el proyecto con una entrada de diario. Cuenta qué hiciste en esta sesión y qué queda pendiente.",
          guia: [
            "Qué archivos tocaste",
            "Qué códigos creaste, fusionaste o renombraste",
            "Qué duda te quedó abierta",
            "Qué vas a hacer en la próxima sesión"
          ],
          modelo: "Sesión del 8 de septiembre. Codifiqué E04_Marta completa. Creé Deterioro de la salud propia y Naturalización del sacrificio, y moví Gasto en pañales bajo Límite económico porque decían lo mismo desde ángulos distintos. Me quedó la duda de si Naturalización del sacrificio se solapa con \"es mi deber de hija\", que es un código en vivo de E01. La próxima sesión recupero los segmentos de ambos y decido si fusiono."
        }
      ]
    }

  ]
};
