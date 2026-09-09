# Codificar en QualCoder 4

Curso interactivo y gratuito, en español, para aprender a codificar datos cualitativos con QualCoder 4.
Está armado como un juego. Nueve misiones, cuarenta y cuatro actividades, estrellas según los errores,
insignias, rangos y una constancia al final. La mitad de las actividades se practican en un simulador de la
ventana real del programa, con sus siete menús, sus cinco pestañas, su árbol de códigos y su módulo de
codificar texto. Son archivos estáticos, sin frameworks ni compilación, y se publica tal cual en GitHub
Pages.

## Descripción del curso

### De qué trata

La mayoría de los tutoriales de software cualitativo enseñan a apretar botones. Este curso enseña a decidir
y practica los botones mientras tanto. Cada misión combina una lección breve, un video opcional y varias
actividades donde hay que tomar la decisión analítica y ejecutarla en el simulador.

El simulador reproduce la ventana de QualCoder 4 tal como es, con la estructura de menús del manual de
usuario. Proyecto, Gestionar, Codificar, Análisis, Informes, IA y Ayuda, con sus entradas y sus atajos, las
cinco pestañas de la ventana principal, el menú contextual del árbol de códigos y el módulo de codificar
texto con su lista de documentos, su nombre de codificador, su margen de franjas de color y sus teclas de
trabajo, Q para marcar, V para el código in vivo, A para anotar, U para desmarcar.

### A quién va dirigido

Estudiantes de posgrado, tesistas, docentes y equipos de investigación que trabajan con entrevistas, grupos
focales, notas de campo o respuestas abiertas de encuesta. No se necesita experiencia previa con software
cualitativo ni conocimientos de programación. Tampoco hace falta instalar QualCoder para hacer los
ejercicios, aunque el curso está pensado para que después se repita todo en un proyecto propio.

### Qué se aprende

Al terminar, quien tome el curso puede crear un proyecto, importar y revisar material, construir un sistema
de códigos con categorías y memos, marcar segmentos con criterio, organizar casos y atributos, recuperar lo
codificado en informes y depurar el sistema cuando crece de más. En el camino se trabajan las decisiones que
sostienen todo eso, el tamaño del segmento, la diferencia entre código y categoría, cuándo un código en vivo
aporta y cuándo estorba, y por qué la frecuencia describe la codificación y no el campo.

### Cómo funciona el juego

Cada misión empieza con la lección y sigue con sus actividades, una a la vez. Resolver a la primera da tres
estrellas y el XP completo, fallar una vez da dos estrellas y la mitad del XP, y a partir de ahí una
estrella. Los errores no expulsan de la misión, solo explican qué pasó y dejan seguir intentando. Debajo de
cada actividad hay dos salidas, reiniciar la lección desde el principio o saltar esa actividad, que entonces
queda sin XP y se puede recuperar después repasando la misión.

Tres aciertos seguidos dan un bono de racha. Las misiones se abren en orden y cada una entrega su insignia.
El XP acumulado sube de rango, de Aprendiz de campo a Oficio de campo. Todo el avance se guarda en el
navegador de quien juega, sin cuentas ni servidor.

### Las nueve misiones

| Misión | Tema | Qué se practica |
| --- | --- | --- |
| 1 | Qué es codificar | Vocabulario básico y la pestaña de registro de acciones |
| 2 | Abrir el proyecto | Crear proyecto, Configuración con el nombre del codificador, gestor de archivos, resumen del proyecto |
| 3 | Codificar texto | Abrir el módulo, crear un código desde el árbol, marcar dos segmentos con Q |
| 4 | En vivo, anotar y memos | Código in vivo con V, anotación con A, memo del código, diarios |
| 5 | El árbol de códigos | Categorías, fusionar un código en otro, mover un código a una categoría |
| 6 | Casos y atributos | Gestión de casos, de atributos e importación de encuestas |
| 7 | Recuperar y mirar | Recuperación de códigos, configurar la salida, frecuencias y gráficas |
| 8 | Equipo y mantenimiento | Comparación de codificación, enlaces rotos, funciones especiales |
| 9 | Prueba de campo | Entrevista nueva de principio a fin, recuperación y entrada de diario |

### Duración

Entre dos y tres horas, según cuánto se detenga cada quien en las actividades de escritura.
Se puede dejar a medias y retomar, el avance queda guardado.

### Material de práctica

Las entrevistas que aparecen en los ejercicios son fragmentos construidos para el curso sobre cuidadoras
informales de personas mayores. No corresponden a personas reales.

## Publicarlo

1. Crea un repositorio nuevo en GitHub, por ejemplo `curso-codificar-qualcoder`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (`index.html`, `README.md`, `.nojekyll` y la carpeta `assets`).
3. Entra a Settings, sección Pages, y en Build and deployment elige Deploy from a branch, rama `main`, carpeta `/ (root)`.
4. En un par de minutos queda en `https://TU-USUARIO.github.io/curso-codificar-qualcoder/`.

Para probarlo antes en tu máquina, abre `index.html` en el navegador o levanta `python3 -m http.server`
dentro de la carpeta.

## Poner los videos

Cada misión tiene un campo `video` vacío en `assets/contenido.js`. Se llena con el identificador del video de
YouTube, no con la URL completa.

```js
video: "dQw4w9WgXcQ",
videoTitulo: "Marcar un segmento en Codificar texto",
```

Con el campo vacío aparece un recuadro punteado indicando que el espacio está reservado. El video se
incrusta con `youtube-nocookie.com`.

## Editar el contenido

Todo el material vive en `assets/contenido.js`. El motor está en `assets/app.js` y no hace falta tocarlo para
cambiar lecciones, actividades, menús o rangos.

Una misión se ve así.

```js
{
  id: "n10",
  titulo: "Nombre de la misión",
  lema: "Frase corta",
  insignia: { nombre: "Nombre de la insignia", icono: "✦" },
  video: "",
  videoTitulo: "",
  lectura: `<p>Texto de la lección en HTML.</p>`,
  ejercicios: [ ... ]
}
```

Los ocho tipos de actividad disponibles.

| Tipo | Qué hace | Campos propios |
| --- | --- | --- |
| `quiz` | Opción múltiple con retroalimentación por opción | `pregunta`, `opciones` con `t`, `ok`, `dice` |
| `parejas` | Une concepto con definición | `pares` con `a` y `b` |
| `secuencia` | Ordena pasos tocándolos en orden | `pasos` |
| `clasificar` | Acomoda códigos en categorías | `categorias`, `items` |
| `abierta` | Escritura libre con respuesta modelo y autoevaluación | `guia`, `modelo` |
| `interfaz` | Simulador de QualCoder, hay que llegar a la función correcta | `objetivo`, `ruta`, `dice` |
| `codificar` | Codificar dentro del simulador, seleccionar el tramo y aplicar la acción | `texto`, `codigos`, `solucion` |
| `dialogo` | Ventana de configuración con campos que hay que dejar bien | `titulo`, `campos`, `boton`, `dice` |

En `codificar`, `solucion.segmentos` lleva los índices del arreglo `texto` que hay que marcar, empezando en
cero, `solucion.codigo` el `id` del código correcto y `solucion.accion` la operación esperada, que puede ser
`marcar`, `invivo` o `anotar`. Con `invivo` el nombre del código lo genera el propio texto seleccionado, así
que no hace falta `solucion.codigo`.

En `interfaz`, `ruta` acepta tres formas. El par menú e ítem, por ejemplo `["gestionar", "archivos"]`,
tomando los `id` definidos en `CURSO.interfaz.menus`. Una pestaña de la ventana principal, con
`["pestana", "registro"]`. Y el menú contextual de un código del árbol, escribiendo `codigo:` seguido del
nombre, por ejemplo `["codigo:Sentimiento de culpa", "fusionar"]`.

En `dialogo`, cada campo puede ser `texto`, `select` o `casilla`. Para los de texto, `correcto` acepta un
arreglo de fragmentos válidos o la palabra `cualquiera` cuando solo se pide que no quede vacío.

Los menús del simulador, sus atajos, las pestañas, el menú contextual del árbol, las teclas del módulo de
codificar texto, los códigos del panel, los archivos, los colores y los rangos también se editan en
`contenido.js`, en los bloques `interfaz`, `paleta` y `rangos`. La estructura de menús que trae por defecto
está tomada del manual de usuario de QualCoder 4.

## Créditos

Material de SoftCualitativo, [www.softcualitativo.com](https://www.softcualitativo.com). QualCoder es
software libre desarrollado por Colin Curtain y colaboradores.
