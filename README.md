# Codificar en QualCoder 4

Curso interactivo y gratuito, en español, para aprender a codificar datos cualitativos con QualCoder 4.
Está armado como un juego. Nueve misiones, tres vidas por misión, estrellas según los errores, insignias,
rangos y una constancia al final. Son archivos estáticos, sin frameworks ni compilación, y se publica tal
cual en GitHub Pages.

## Descripción del curso

### De qué trata

La mayoría de los tutoriales de software cualitativo enseñan a apretar botones. Este curso enseña a decidir
y practica los botones mientras tanto. Cada misión combina una lección breve, un video opcional y varias
actividades donde hay que tomar la decisión analítica y ejecutarla en un simulador de la interfaz de
QualCoder que reproduce sus menús, su panel de códigos y sus ventanas de configuración.

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

Cada misión empieza con la lección y sigue con sus actividades, una a la vez. Se entra con tres vidas y cada
error cuesta una. Terminar sin fallar da tres estrellas y el XP completo, fallar una vez da dos estrellas y
la mitad del XP, y quedarse sin vidas manda a la pantalla de reintento sin perder lo ya resuelto. Tres
aciertos seguidos dan un bono de racha. Las misiones se abren en orden y cada una entrega su insignia. El XP
acumulado sube de rango, de Aprendiz de campo a Oficio de campo. Todo el avance se guarda en el navegador de
quien juega, sin cuentas ni servidor.

### Las nueve misiones

| Misión | Tema | Actividades |
| --- | --- | --- |
| 1 | Qué es codificar | Decisiones y parejas de conceptos |
| 2 | Abrir el proyecto | Crear proyecto en el simulador, ventana de Ajustes, importar archivos, orden de arranque |
| 3 | Tu primer código | Abrir Codificar texto, ventana de código nuevo, marcar dos segmentos |
| 4 | En vivo, memos y diario | Código en vivo, redacción de un memo, abrir el diario |
| 5 | Ordenar el sistema | Armar categorías, fusionar códigos desde el menú contextual |
| 6 | Casos y atributos | Gestión de casos, gestión de atributos, vocabulario del proyecto |
| 7 | Recuperar y mirar | Informes de codificación, configurar el informe, frecuencia de códigos |
| 8 | Trabajo en equipo | Comparación entre codificadores, depuración, respaldo y traslado del proyecto |
| 9 | Prueba de campo | Entrevista nueva de principio a fin y entrada de diario |

### Duración

Entre hora y media y dos horas y media, según cuánto se detenga cada quien en las actividades de escritura.
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
| `codificar` | Marca fragmentos de una entrevista y aplica un código | `texto`, `codigos`, `solucion` |
| `clasificar` | Acomoda códigos en categorías | `categorias`, `items` |
| `abierta` | Escritura libre con respuesta modelo y autoevaluación | `guia`, `modelo` |
| `interfaz` | Simulador de QualCoder, hay que llegar a la función correcta | `objetivo`, `ruta`, `dice` |
| `dialogo` | Ventana de configuración con campos que hay que dejar bien | `titulo`, `campos`, `boton`, `dice` |

En `codificar`, `solucion.segmentos` lleva los índices del arreglo `texto` que hay que marcar, empezando en
cero, y `solucion.codigo` el `id` del código correcto.

En `interfaz`, `ruta` es el par menú e ítem, por ejemplo `["gestionar", "archivos"]`, tomando los `id` que
están definidos en `CURSO.interfaz.menus`. Si la ruta empieza con `codigo:` seguido del nombre de un código,
la respuesta se busca en el menú contextual de ese código, por ejemplo
`["codigo:Sentimiento de culpa", "fusionar"]`.

En `dialogo`, cada campo puede ser `texto`, `select` o `casilla`. Para los de texto, `correcto` acepta un
arreglo de fragmentos válidos o la palabra `cualquiera` cuando solo se pide que no quede vacío.

Los menús del simulador, los códigos del panel, los archivos, los colores y los rangos también se editan en
`contenido.js`, en los bloques `interfaz`, `paleta` y `rangos`.

## Créditos

Material de SoftCualitativo, [www.softcualitativo.com](https://www.softcualitativo.com). QualCoder es
software libre desarrollado por Colin Curtain y colaboradores.
