// Course content. Edit this file to change lessons, videos and exercises.
// Exercise types: quiz, parejas, secuencia, codificar, clasificar, abierta.

const CURSO = {
  titulo: "Codificar en QualCoder 4",
  subtitulo: "Un curso de práctica, no de lectura",
  autoria: "SoftCualitativo",

  // Code palette used by the coding exercises.
  paleta: {
    amarillo: "#F2C744",
    turquesa: "#2FA8A0",
    coral: "#E4577C",
    violeta: "#7A5CD6",
    verde: "#5FA05A"
  },

  niveles: [

    /* ---------------------------------------------------------------- */
    {
      id: "n1",
      titulo: "Qué es codificar",
      lema: "Antes del programa está la decisión",
      insignia: { nombre: "Ojo de lector", icono: "◉" },
      video: "", // put a YouTube ID here, for example "dQw4w9WgXcQ"
      videoTitulo: "Qué hace y qué no hace un código",
      lectura: `
        <p>Codificar es ponerle una etiqueta corta a un fragmento de datos para poder volver a encontrarlo,
        compararlo con otros y contarlo si hace falta. La etiqueta es el <strong>código</strong> y el fragmento
        marcado es el <strong>segmento</strong>.</p>
        <p>Un código no resume el texto, lo señala. Si la etiqueta necesita tres renglones para explicarse,
        todavía no es un código, es una idea a medio cocer. Y si nombra algo que solo aparece una vez en todo
        el corpus, quizá sea una anotación y no un código.</p>
        <p>QualCoder no codifica por ti. Guarda tus decisiones, las ordena y te las devuelve cuando las
        necesitas. Ese es el trato.</p>
        <p>Tres piezas conviven en el programa y conviene no confundirlas. El <strong>código</strong> se aplica
        al dato. La <strong>categoría</strong> agrupa códigos. El <strong>memo</strong> guarda por qué tomaste
        una decisión, y es lo único que te salvará dentro de seis meses.</p>
      `,
      ejercicios: [
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Lees esta línea de una entrevista. \"Ya van cuatro años y yo pensaba que eran unos meses.\" ¿Cuál de estas etiquetas funciona mejor como código?",
          opciones: [
            { t: "Duración imprevista del cuidado", ok: true, dice: "Corto, nombra el fenómeno y sirve para comparar con otras entrevistas." },
            { t: "La señora lleva cuatro años cuidando a su mamá y no lo esperaba", ok: false, dice: "Eso es una paráfrasis del fragmento. Un código tiene que caber en una etiqueta, no en un renglón." },
            { t: "Tiempo", ok: false, dice: "Demasiado ancho. Bajo esa etiqueta va a caer medio corpus y después no vas a poder distinguir nada." },
            { t: "Cuatro años", ok: false, dice: "Es un dato del caso, no un concepto. No se va a repetir en otras entrevistas." }
          ]
        },
        {
          tipo: "parejas",
          xp: 15,
          instruccion: "Une cada pieza con lo que hace. Toca una tarjeta de la izquierda y luego su definición.",
          pares: [
            { a: "Código", b: "Etiqueta que se aplica directamente a un fragmento de datos" },
            { a: "Categoría", b: "Agrupa varios códigos que comparten un mismo sentido" },
            { a: "Segmento", b: "El trozo de texto marcado dentro del archivo" },
            { a: "Memo", b: "Registro de por qué tomaste una decisión analítica" },
            { a: "Código en vivo", b: "Etiqueta tomada literalmente de las palabras del participante" }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Cuándo conviene crear una categoría?",
          opciones: [
            { t: "Cuando ya tienes varios códigos que se parecen y quieres verlos juntos", ok: true, dice: "Exacto. La categoría llega después de los códigos, no antes." },
            { t: "Al abrir el proyecto, para tener el árbol listo desde el inicio", ok: false, dice: "Se puede, pero encaja mejor con un análisis deductivo con marco cerrado. Si estás explorando, un árbol prefabricado te obliga a meter el dato donde no cabe." },
            { t: "Nunca, las categorías son de otros programas", ok: false, dice: "QualCoder sí tiene categorías y las muestra como carpetas en el panel de códigos." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n2",
      titulo: "Preparar el proyecto",
      lema: "Media hora aquí te ahorra semanas después",
      insignia: { nombre: "Cartografía", icono: "▤" },
      video: "",
      videoTitulo: "Crear el proyecto e importar archivos",
      lectura: `
        <p>Un proyecto de QualCoder es una carpeta terminada en <code>.qda</code>. Dentro viven la base de datos
        y las copias de tus archivos. Se mueve completa, se respalda completa y se comparte completa.</p>
        <p>El orden mínimo tiene cuatro pasos. Crear el proyecto desde Proyecto (Project), importar los archivos
        desde Gestionar archivos (Manage files), revisar que el texto se importó legible y solo entonces empezar
        a codificar en Codificar texto (Code text).</p>
        <p>Ese tercer paso es el que casi todo el mundo se salta. Un PDF escaneado se importa sin protestar y te
        deja un archivo vacío o lleno de basura. Ábrelo antes de invertir dos días marcando segmentos.</p>
        <p>Los nombres de archivo también son datos. E01_Rosa dice más que Entrevista final buena 2 corregida.</p>
      `,
      ejercicios: [
        {
          tipo: "secuencia",
          xp: 15,
          instruccion: "Ordena el arranque de un proyecto. Toca los pasos en el orden correcto.",
          pasos: [
            "Crear el proyecto y darle un nombre sin espacios raros",
            "Importar los archivos de entrevista",
            "Abrir cada archivo y revisar que el texto se lee bien",
            "Marcar los primeros segmentos con códigos provisionales",
            "Escribir en el diario (Journal) qué decisiones tomaste hoy"
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Importaste un PDF escaneado y al abrirlo aparece en blanco. ¿Qué pasó?",
          opciones: [
            { t: "El PDF es una imagen y no tiene capa de texto, hay que pasarlo por OCR antes", ok: true, dice: "Así es. Sin capa de texto no hay nada que seleccionar ni que codificar." },
            { t: "QualCoder no admite PDF", ok: false, dice: "Sí los admite, siempre que el PDF tenga texto real y no solo la foto de la página." },
            { t: "Se corrompió la base de datos del proyecto", ok: false, dice: "Sería mucha mala suerte. Lo habitual es un escaneo sin OCR." }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Vas a respaldar tu trabajo antes de un viaje. ¿Qué copias?",
          opciones: [
            { t: "La carpeta .qda completa", ok: true, dice: "Correcto. La base de datos y los archivos van juntos, separarlos rompe el proyecto." },
            { t: "Solo el archivo de base de datos que está dentro", ok: false, dice: "Te quedas sin los documentos y sin los medios. El proyecto es la carpeta entera." },
            { t: "Solo los informes exportados", ok: false, dice: "Eso guarda resultados, no el trabajo. No podrías seguir codificando." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n3",
      titulo: "Tu primer código",
      lema: "Marcar, nombrar, seguir",
      insignia: { nombre: "Marcador", icono: "▮" },
      video: "",
      videoTitulo: "Marcar un segmento en Codificar texto",
      lectura: `
        <p>Ya en Codificar texto (Code text) tienes el archivo a la derecha y el panel de códigos a la izquierda.
        La operación básica es siempre la misma. Seleccionas el fragmento con el ratón, eliges el código en el
        panel y lo aplicas. El segmento queda con el color del código y aparece listado en el propio programa.</p>
        <p>El tamaño del segmento importa. Si marcas la frase suelta pierdes el contexto y el informe te va a
        devolver fragmentos ilegibles. Si marcas la página entera, el código deja de significar algo. La regla
        práctica es marcar lo mínimo que todavía se entiende solo.</p>
        <p>Un código mal puesto no es un desastre, se quita y ya. Lo que no se recupera es el fragmento que
        nunca marcaste porque no supiste cómo llamarlo. Márcalo con una etiqueta provisional y sigue.</p>
      `,
      ejercicios: [
        {
          tipo: "codificar",
          xp: 20,
          instruccion: "Entrevista E01_Rosa, cuidadora de su madre. Toca los fragmentos que hablan de haber dejado el empleo y aplica el código correcto.",
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
          instruccion: "Sigue la misma entrevista. Marca ahora el tramo que muestra que el cuidado duró mucho más de lo previsto.",
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
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Encuentras un fragmento potente y no se te ocurre cómo llamarlo. ¿Qué haces?",
          opciones: [
            { t: "Lo marcas con un código provisional, le pones un memo y sigues", ok: true, dice: "Así es como avanza el trabajo real. El nombre definitivo llega después, cuando ya viste casos parecidos." },
            { t: "Lo dejas sin marcar y confías en acordarte", ok: false, dice: "No te vas a acordar. Un corpus de veinte entrevistas borra cualquier memoria." },
            { t: "Paras a rediseñar todo el sistema de códigos", ok: false, dice: "Rediseñar con un solo caso en la mano suele salir caro. Junta más evidencia antes." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n4",
      titulo: "En vivo y memos",
      lema: "La voz del campo y tu propia voz",
      insignia: { nombre: "Voz del campo", icono: "❝" },
      video: "",
      videoTitulo: "Códigos en vivo, memos y anotaciones",
      lectura: `
        <p>Un código en vivo usa las palabras exactas del participante como nombre de la etiqueta. Sirve cuando
        la expresión dice algo que tu vocabulario académico aplana. QualCoder tiene una opción específica para
        crear el código a partir del texto seleccionado, así que el nombre sale literal del dato.</p>
        <p>No abuses. Veinte códigos en vivo son veinte etiquetas que solo existen en una entrevista y no se
        pueden comparar entre casos. Úsalos donde la fuerza está en cómo se dijo.</p>
        <p>El memo es la otra mitad del oficio. Hay memos de código, que explican qué entra y qué no entra bajo
        esa etiqueta, y está el diario (Journal), donde se registra el proceso completo con fecha. Lo primero
        salva tu consistencia, lo segundo salva tu apartado de método.</p>
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
          instruccion: "Escribe el memo del código Abandono del empleo. Tienes que dejar claro qué se marca con él y qué no.",
          guia: [
            "Qué fenómeno nombra el código",
            "Un ejemplo de fragmento que sí entra",
            "Un caso parecido que no entra y por qué",
            "Con qué otro código se podría confundir"
          ],
          modelo: "Abandono del empleo. Marca los fragmentos donde la persona relata haber dejado un trabajo remunerado a causa de la tarea de cuidado, sea por renuncia, liquidación o despido negociado. Entra \"pedí mi liquidación y me salí\". No entra la reducción de horas ni el cambio de turno, que van en Ajuste de jornada. Se confunde con Pérdida de ingresos, que se refiere al efecto económico y no a la salida del empleo."
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "¿Qué diferencia hay entre un memo de código y una anotación sobre el texto?",
          opciones: [
            { t: "El memo de código define la etiqueta, la anotación comenta un punto concreto del archivo", ok: true, dice: "Correcto. Uno viaja con el código por todo el proyecto, la otra se queda pegada a ese lugar del documento." },
            { t: "Son lo mismo con distinto nombre", ok: false, dice: "No. Si borras un código, su memo se va con él. La anotación pertenece al documento." },
            { t: "La anotación se exporta y el memo no", ok: false, dice: "Ambos se pueden llevar a los informes." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n5",
      titulo: "Ordenar el sistema",
      lema: "De la lista larga al mapa",
      insignia: { nombre: "Arquitectura", icono: "⌗" },
      video: "",
      videoTitulo: "Categorías, colores y árbol de códigos",
      lectura: `
        <p>Después de dos o tres entrevistas vas a tener una lista larga y desordenada. Ahí empieza el trabajo
        interesante. Agrupar códigos en categorías obliga a decidir qué tienen en común, y esa decisión ya es
        análisis.</p>
        <p>En el panel de códigos las categorías se ven como carpetas y los códigos cuelgan de ellas. Un código
        puede moverse de categoría cuando cambias de idea, y cambiarás de idea varias veces.</p>
        <p>El color no es decoración. Si le das el mismo tono a los códigos de una misma familia, el documento
        codificado se lee de un vistazo y ves dónde se concentra cada cosa.</p>
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
          tipo: "quiz",
          xp: 10,
          pregunta: "Tienes dos códigos, Culpa y Sentimiento de culpa, aplicados en distintas entrevistas. ¿Qué haces?",
          opciones: [
            { t: "Fusionar los dos códigos en uno solo, conservando todos los segmentos", ok: true, dice: "Sí. QualCoder permite fusionar y los segmentos de ambos quedan bajo la etiqueta que conserves." },
            { t: "Borrar uno de los dos", ok: false, dice: "Perderías los segmentos marcados con él. Fusionar conserva el trabajo, borrar lo tira." },
            { t: "Dejarlos separados por si acaso significan algo distinto", ok: false, dice: "Si de verdad significan cosas distintas, hay que renombrarlos para que se note. Si no, es ruido en el informe." }
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n6",
      titulo: "Recuperar y mirar",
      lema: "El informe no piensa por ti",
      insignia: { nombre: "Lupa", icono: "◎" },
      video: "",
      videoTitulo: "Informes de codificación y frecuencia de códigos",
      lectura: `
        <p>Codificar sin recuperar es archivar. La recuperación junta todos los segmentos marcados con un código
        y te los pone uno detrás de otro, con la referencia del archivo del que salieron. Ahí es donde se ve si
        el código aguanta o si estaba metiendo cosas distintas en la misma bolsa.</p>
        <p>En Informes (Reports) están las salidas principales. Los informes de codificación devuelven los
        segmentos, la frecuencia de códigos devuelve cuántas veces aparece cada uno y en cuántos archivos, y las
        gráficas dan la vista rápida.</p>
        <p>Cuidado con la frecuencia. Un código con noventa apariciones puede ser importante o puede ser que lo
        estés aplicando a todo. Un código con tres apariciones puede sostener el hallazgo central. La cuenta
        describe tu codificación, no la realidad del campo.</p>
      `,
      ejercicios: [
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Abres la recuperación del código Culpa y ves que la mitad de los segmentos hablan de vergüenza frente a los hermanos y la otra mitad de arrepentimiento por enojarse. ¿Qué te está diciendo el informe?",
          opciones: [
            { t: "Que el código junta dos cosas distintas y conviene dividirlo", ok: true, dice: "Ese es el uso fuerte de la recuperación, ver de golpe lo que aplicaste caso por caso." },
            { t: "Que el código es muy productivo y hay que dejarlo así", ok: false, dice: "Un código que abarca dos fenómenos no es productivo, es impreciso." },
            { t: "Que hay un error del programa", ok: false, dice: "El programa devuelve lo que marcaste. El problema, si lo hay, está en las decisiones." }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Quieres comparar qué dicen las cuidadoras que trabajan fuera de casa frente a las que no. ¿Qué necesitas tener listo antes?",
          opciones: [
            { t: "Los atributos de cada archivo o caso cargados en el proyecto", ok: true, dice: "Correcto. Sin atributos no hay con qué filtrar ni cruzar, y esa comparación no se puede armar." },
            { t: "Solo más códigos", ok: false, dice: "Más códigos no separan grupos. La variable de comparación vive en los atributos." },
            { t: "Exportar todo a una hoja de cálculo y hacerlo a mano", ok: false, dice: "Se puede, pero el programa lo hace con filtros y sin errores de copiado." }
          ]
        },
        {
          tipo: "secuencia",
          xp: 15,
          instruccion: "Ordena el ciclo de trabajo de una sesión de análisis.",
          pasos: [
            "Codificar dos o tres archivos nuevos",
            "Recuperar los segmentos de los códigos que más creciste",
            "Revisar si algún código junta cosas distintas",
            "Fusionar, dividir o renombrar lo que haga falta",
            "Anotar en el diario qué cambió y por qué"
          ]
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n7",
      titulo: "Podar y sostener",
      lema: "Un sistema que no se depura, se derrumba",
      insignia: { nombre: "Podadora", icono: "✂" },
      video: "",
      videoTitulo: "Fusionar, dividir y comparar codificadores",
      lectura: `
        <p>Un sistema de códigos crece solo. Llega un punto en que trescientas etiquetas dejan de ser un
        instrumento y se vuelven un problema de memoria. La poda consiste en fusionar lo que dice lo mismo,
        dividir lo que dice dos cosas, renombrar lo que engaña y jubilar lo que nunca se usó.</p>
        <p>Si codifican varias personas, hace falta acordar antes qué significa cada código y revisar después qué
        tanto coinciden. QualCoder incluye una comparación entre codificadores que reporta el acuerdo. El número
        importa menos que la conversación que provoca cuando no coinciden.</p>
        <p>La saturación no es que ya no salgan códigos nuevos porque estás cansado. Es que entrevistas nuevas
        siguen cayendo en categorías existentes sin obligarte a inventar nada.</p>
      `,
      ejercicios: [
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Tienes un código con un solo segmento en todo el corpus, marcado hace cuatro meses. ¿Qué haces?",
          opciones: [
            { t: "Revisar el segmento y decidir si entra en otro código o si vale por sí mismo", ok: true, dice: "Un caso único puede ser un hallazgo o puede ser un resto de una idea que abandonaste. Hay que mirarlo antes de decidir." },
            { t: "Borrarlo, uno solo no significa nada", ok: false, dice: "La frecuencia no decide relevancia. Un caso negativo puede ser lo más interesante del corpus." },
            { t: "Dejarlo ahí, no molesta", ok: false, dice: "Cien códigos huérfanos sí molestan, y ensucian cualquier informe." }
          ]
        },
        {
          tipo: "quiz",
          xp: 10,
          pregunta: "Dos codificadores marcan el mismo fragmento con códigos distintos. ¿Qué es lo primero que hay que hacer?",
          opciones: [
            { t: "Revisar juntos el memo de cada código y precisar qué entra en cada uno", ok: true, dice: "El desacuerdo casi siempre nace de definiciones vagas, no de mala fe." },
            { t: "Calcular el acuerdo y quedarse con el resultado", ok: false, dice: "El coeficiente mide, no resuelve. Sin revisar las definiciones el siguiente cálculo va a salir igual." },
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
        }
      ]
    },

    /* ---------------------------------------------------------------- */
    {
      id: "n8",
      titulo: "Prueba de campo",
      lema: "Todo junto, una vez más",
      insignia: { nombre: "Codificación de campo", icono: "★" },
      video: "",
      videoTitulo: "Cierre del curso",
      lectura: `
        <p>Último nivel. Un fragmento nuevo, un sistema de códigos a medio construir y las decisiones de siempre.
        Nada que no hayas hecho ya en los niveles anteriores.</p>
        <p>Al terminar se libera tu constancia. La puedes imprimir o guardar en PDF desde el navegador.</p>
      `,
      ejercicios: [
        {
          tipo: "codificar",
          xp: 25,
          instruccion: "Entrevista E04_Marta. Marca el tramo donde aparece el costo físico del cuidado y aplícale su código.",
          pista: "El costo físico no es el mismo que el cansancio de ánimo.",
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
