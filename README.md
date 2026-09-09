# Codificar en QualCoder 4

Curso interactivo en español para aprender a codificar datos cualitativos. Ocho niveles con ejercicios,
puntos, insignias y constancia final. No usa frameworks ni compilación, son tres archivos estáticos y se
publica tal cual en GitHub Pages.

## Publicarlo

1. Crea un repositorio nuevo en GitHub, por ejemplo `curso-codificar-qualcoder`.
2. Sube el contenido de esta carpeta a la raíz del repositorio (`index.html`, `README.md` y la carpeta `assets`).
3. Entra a Settings, sección Pages, y en Build and deployment elige Deploy from a branch, rama `main`, carpeta `/ (root)`.
4. En un par de minutos queda en `https://TU-USUARIO.github.io/curso-codificar-qualcoder/`.

Para probarlo antes en tu máquina basta abrir `index.html` en el navegador, o levantar
`python3 -m http.server` dentro de la carpeta.

## Poner los videos

Cada nivel tiene un campo `video` vacío en `assets/contenido.js`. Se llena con el identificador del video de
YouTube, no con la URL completa.

```js
video: "dQw4w9WgXcQ",
videoTitulo: "Marcar un segmento en Codificar texto",
```

Con el campo vacío aparece un recuadro punteado indicando que ese espacio está reservado. El video se
incrusta con `youtube-nocookie.com`.

## Editar el contenido

Todo el material vive en `assets/contenido.js`. `assets/app.js` es el motor y no hace falta tocarlo para
cambiar lecciones o ejercicios.

Un nivel se ve así.

```js
{
  id: "n9",
  titulo: "Nombre del nivel",
  lema: "Frase corta",
  insignia: { nombre: "Nombre de la insignia", icono: "✦" },
  video: "",
  videoTitulo: "",
  lectura: `<p>Texto de la lección en HTML.</p>`,
  ejercicios: [ ... ]
}
```

Los seis tipos de ejercicio disponibles.

| Tipo | Qué hace | Campos propios |
| --- | --- | --- |
| `quiz` | Opción múltiple con retroalimentación por opción | `pregunta`, `opciones` con `t`, `ok`, `dice` |
| `parejas` | Une concepto con definición | `pares` con `a` y `b` |
| `secuencia` | Ordena pasos tocándolos en orden | `pasos` |
| `codificar` | Marca fragmentos de una entrevista y aplica un código | `texto`, `codigos`, `solucion` |
| `clasificar` | Acomoda códigos en categorías | `categorias`, `items` |
| `abierta` | Escritura libre con respuesta modelo y autoevaluación | `guia`, `modelo` |

En `codificar`, `solucion.segmentos` lleva los índices del arreglo `texto` que hay que marcar, empezando en
cero, y `solucion.codigo` el `id` del código correcto. Los colores salen de `CURSO.paleta`.

## Puntaje

Cada ejercicio da su XP completo si se resuelve a la primera y la mitad si hubo errores. Un nivel se abre
cuando el anterior está completo. El avance se guarda en el navegador de quien toma el curso con
`localStorage`, así que nadie necesita cuenta ni servidor, y el botón de reinicio lo borra.

## Créditos

Material de SoftCualitativo, [www.softcualitativo.com](https://www.softcualitativo.com). QualCoder es
software libre desarrollado por Colin Curtain y colaboradores.
