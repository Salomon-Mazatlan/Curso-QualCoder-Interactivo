// Engine for the QualCoder coding course: progress, XP, badges and exercises.

const CLAVE = "curso-qualcoder-progreso-v1";

// Storage with in-memory fallback when localStorage is blocked.
const guardado = (() => {
  let memoria = null;
  return {
    leer() {
      try { return JSON.parse(localStorage.getItem(CLAVE)) || null; }
      catch (e) { return memoria; }
    },
    escribir(datos) {
      memoria = datos;
      try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch (e) {}
    },
    borrar() {
      memoria = null;
      try { localStorage.removeItem(CLAVE); } catch (e) {}
    }
  };
})();

const estadoInicial = { xp: 0, hechos: {}, insignias: [], nombre: "" };
let estado = Object.assign({}, estadoInicial, guardado.leer() || {});

const $ = (sel, raiz = document) => raiz.querySelector(sel);
const crear = (tag, clase, texto) => {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
};
const revolver = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]);

// Highlighter tint: keeps text readable over the code color.
function tinte(hex, alfa) {
  const h = (hex || "#cccccc").replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alfa + ")";
}

const xpTotal = CURSO.niveles.reduce((s, n) => s + n.ejercicios.reduce((t, e) => t + e.xp, 0), 0);

/* ---------- progress helpers ---------- */

const clave = (nivel, i) => nivel.id + "-" + i;
const hecho = (nivel, i) => Boolean(estado.hechos[clave(nivel, i)]);
const nivelCompleto = (nivel) => nivel.ejercicios.every((_, i) => hecho(nivel, i));
const nivelAbierto = (idx) => idx === 0 || nivelCompleto(CURSO.niveles[idx - 1]);

function persistir() { guardado.escribir(estado); }

function completar(nivel, idx, xpGanado) {
  const k = clave(nivel, idx);
  if (estado.hechos[k]) return;
  estado.hechos[k] = true;
  estado.xp += xpGanado;
  const tarjeta = document.querySelector('[data-ej="' + k + '"]');
  if (tarjeta) tarjeta.classList.add("resuelto");
  if (nivelCompleto(nivel) && !estado.insignias.includes(nivel.id)) {
    estado.insignias.push(nivel.id);
    avisar("Insignia ganada, <b>" + nivel.insignia.nombre + "</b>. Se abrió el siguiente nivel.");
  } else {
    avisar("+" + xpGanado + " XP");
  }
  persistir();
  pintarRail();
  refrescarPie(nivel);
  const vieja = document.querySelector(".constancia");
  if (vieja) vieja.replaceWith(constancia());
}

let temporizadorAviso;
function avisar(html) {
  let caja = $(".aviso");
  if (!caja) { caja = crear("div", "aviso"); document.body.appendChild(caja); }
  caja.innerHTML = html;
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => caja.remove(), 3800);
}

/* ---------- rail ---------- */

function pintarRail() {
  const barra = $(".barra i");
  const cifra = $(".medidor-xp");
  if (barra) barra.style.width = Math.min(100, (estado.xp / xpTotal) * 100) + "%";
  if (cifra) cifra.textContent = estado.xp;

  const indice = $(".indice");
  indice.innerHTML = "";
  CURSO.niveles.forEach((nivel, i) => {
    const li = crear("li");
    if (location.hash === "#" + nivel.id) li.classList.add("activo");
    const btn = crear("button");
    btn.disabled = !nivelAbierto(i);
    btn.appendChild(crear("span", "num", String(i + 1)));
    btn.appendChild(crear("span", "nom", nivel.titulo));
    const est = crear("span", "estado", nivelCompleto(nivel) ? "✓" : (btn.disabled ? "🔒" : ""));
    btn.appendChild(est);
    btn.addEventListener("click", () => { location.hash = "#" + nivel.id; });
    li.appendChild(btn);
    indice.appendChild(li);
  });

  const chapas = $(".insignias-lista");
  chapas.innerHTML = "";
  CURSO.niveles.forEach(nivel => {
    const ganada = estado.insignias.includes(nivel.id);
    const ch = crear("span", "chapa" + (ganada ? " ganada" : ""), nivel.insignia.icono);
    ch.title = ganada ? nivel.insignia.nombre : "Insignia bloqueada";
    chapas.appendChild(ch);
  });
}

/* ---------- views ---------- */

function pintarPortada() {
  const zona = $(".escenario");
  zona.innerHTML = "";
  const cont = crear("div", "portada");

  const h1 = crear("h1", null, "Aprende a codificar codificando");
  const entrada = crear("p", "entrada");
  entrada.textContent = "Ocho niveles con entrevistas reales de práctica. Marcas segmentos, decides códigos, " +
    "armas categorías y te dicen enseguida si la decisión aguanta. No hay que instalar nada para hacer los ejercicios, " +
    "aunque el curso está pensado para que lo repitas después en tu propio proyecto de QualCoder 4.";
  cont.appendChild(h1);
  cont.appendChild(entrada);

  const demo = crear("div", "demo");
  const texto = crear("p", "demo-texto");
  texto.innerHTML = "Yo trabajaba en la farmacia de la esquina, ocho años llevaba ahí. " +
    "<mark>Cuando mi mamá empezó a necesitar ayuda para todo, pedí mi liquidación y me salí.</mark> " +
    "Al principio pensé que era cosa de unos meses.";
  const margen = crear("div", "demo-margen");
  margen.appendChild(crear("span", "etiqueta-demo", "Abandono del empleo"));
  demo.appendChild(texto);
  demo.appendChild(margen);
  cont.appendChild(demo);

  const reglas = crear("ul", "reglas");
  [
    ["Puntos", "Cada ejercicio da XP. Si aciertas a la primera te llevas todo, si fallas te llevas la mitad."],
    ["Niveles", "El siguiente se abre cuando terminas el anterior."],
    ["Insignias", "Una por nivel, ocho en total."],
    ["Constancia", "Al cerrar el último nivel se libera, con tu nombre y lista para imprimir."]
  ].forEach(([a, b]) => {
    const li = crear("li");
    li.appendChild(crear("b", null, a));
    li.appendChild(crear("span", null, b));
    reglas.appendChild(li);
  });
  cont.appendChild(reglas);

  const empezar = crear("button", "accion", estado.xp > 0 ? "Seguir donde iba" : "Empezar el nivel 1");
  empezar.addEventListener("click", () => {
    const pendiente = CURSO.niveles.find((n, i) => nivelAbierto(i) && !nivelCompleto(n)) || CURSO.niveles[0];
    location.hash = "#" + pendiente.id;
  });
  cont.appendChild(empezar);

  zona.appendChild(cont);
  setTimeout(() => demo.classList.add("corre"), 400);
}

function pintarNivel(nivel, idx) {
  const zona = $(".escenario");
  zona.innerHTML = "";

  const cab = crear("header", "encabezado-nivel");
  cab.appendChild(crear("p", "paso", "Nivel " + (idx + 1) + " de " + CURSO.niveles.length));
  cab.appendChild(crear("h1", null, nivel.titulo));
  cab.appendChild(crear("p", "lema", nivel.lema));
  zona.appendChild(cab);

  const lectura = crear("div", "lectura");
  lectura.innerHTML = nivel.lectura;
  zona.appendChild(lectura);

  zona.appendChild(bloqueVideo(nivel));

  nivel.ejercicios.forEach((ej, i) => zona.appendChild(pintarEjercicio(nivel, ej, i)));

  zona.appendChild(pieNivel(nivel, idx));
  if (nivel.id === CURSO.niveles[CURSO.niveles.length - 1].id) zona.appendChild(constancia());
  refrescarPie(nivel);
}

function bloqueVideo(nivel) {
  const caja = crear("section", "video");
  caja.appendChild(crear("h2", null, nivel.videoTitulo || "Video de la lección"));
  if (nivel.video) {
    const marco = crear("div", "video-marco");
    const ifr = document.createElement("iframe");
    ifr.src = "https://www.youtube-nocookie.com/embed/" + nivel.video;
    ifr.title = nivel.videoTitulo || nivel.titulo;
    ifr.allowFullscreen = true;
    ifr.loading = "lazy";
    marco.appendChild(ifr);
    caja.appendChild(marco);
  } else {
    caja.appendChild(crear("div", "video-vacio",
      "Espacio reservado para el video. Se activa poniendo el identificador de YouTube en el campo video de este nivel, dentro de assets/contenido.js"));
  }
  return caja;
}

function pieNivel(nivel, idx) {
  const pie = crear("footer", "pie-nivel");
  pie.appendChild(crear("span", "pie-nota", ""));
  const siguiente = CURSO.niveles[idx + 1];
  if (siguiente) {
    const btn = crear("button", "accion", "Ir al nivel " + (idx + 2));
    btn.dataset.rol = "avanzar";
    btn.addEventListener("click", () => { location.hash = "#" + siguiente.id; });
    pie.appendChild(btn);
  }
  const inicio = crear("button", "accion secundaria", "Volver al inicio");
  inicio.addEventListener("click", () => { location.hash = ""; pintarPortada(); pintarRail(); });
  pie.appendChild(inicio);
  return pie;
}

function refrescarPie(nivel) {
  const nota = $(".pie-nota");
  if (!nota) return;
  const total = nivel.ejercicios.length;
  const listos = nivel.ejercicios.filter((_, i) => hecho(nivel, i)).length;
  nota.textContent = listos + " de " + total + " ejercicios resueltos en este nivel";
  const avanzar = document.querySelector('[data-rol="avanzar"]');
  if (avanzar) avanzar.disabled = listos < total;
}

/* ---------- exercises ---------- */

const NOMBRE_TIPO = {
  quiz: "Decisión",
  parejas: "Parejas",
  secuencia: "Secuencia",
  codificar: "Codificación",
  clasificar: "Clasificación",
  abierta: "Escritura"
};

function pintarEjercicio(nivel, ej, idx) {
  const caja = crear("section", "ejercicio");
  caja.dataset.ej = clave(nivel, idx);
  if (hecho(nivel, idx)) caja.classList.add("resuelto");

  const cabeza = crear("div", "ejercicio-cabeza");
  cabeza.appendChild(crear("span", "ejercicio-tipo", NOMBRE_TIPO[ej.tipo] || ""));
  cabeza.appendChild(crear("span", "ejercicio-xp", ej.xp + " XP"));
  caja.appendChild(cabeza);

  caja.appendChild(crear("p", "enunciado", ej.pregunta || ej.instruccion));

  const cuerpo = crear("div");
  caja.appendChild(cuerpo);

  const yaHecho = hecho(nivel, idx);
  const cerrar = (intentos) => {
    if (!yaHecho) completar(nivel, idx, intentos <= 1 ? ej.xp : Math.ceil(ej.xp / 2));
  };

  ({
    quiz: montarQuiz,
    parejas: montarParejas,
    secuencia: montarSecuencia,
    codificar: montarCodificar,
    clasificar: montarClasificar,
    abierta: montarAbierta
  })[ej.tipo](cuerpo, ej, cerrar, yaHecho);

  return caja;
}

function montarQuiz(zona, ej, cerrar, yaHecho) {
  let intentos = 0;
  const lista = crear("div", "opciones");
  const dice = crear("div", "dice");
  dice.hidden = true;

  revolver(ej.opciones.slice()).forEach(op => {
    const btn = crear("button", "opcion", op.t);
    if (op.ok) btn.dataset.ok = "1";
    btn.addEventListener("click", () => {
      intentos++;
      dice.hidden = false;
      dice.textContent = op.dice;
      dice.classList.toggle("mal", !op.ok);
      btn.classList.add(op.ok ? "bien" : "mal");
      if (op.ok) {
        lista.querySelectorAll("button").forEach(b => b.disabled = true);
        cerrar(intentos);
      }
    });
    lista.appendChild(btn);
  });

  if (yaHecho) {
    lista.querySelectorAll("button").forEach(b => {
      b.disabled = true;
      if (b.dataset.ok === "1") b.classList.add("bien");
    });
    dice.hidden = false;
    dice.textContent = "Ya resolviste este ejercicio.";
  }
  zona.appendChild(lista);
  zona.appendChild(dice);
}

function montarParejas(zona, ej, cerrar, yaHecho) {
  let intentos = 0, elegido = null, listos = 0;
  const rejilla = crear("div", "parejas");
  const izq = crear("div", "columna-parejas");
  const der = crear("div", "columna-parejas");
  const dice = crear("div", "dice");
  dice.hidden = true;

  revolver(ej.pares.slice()).forEach((par, i) => {
    const b = crear("button", "chip", par.a);
    b.dataset.par = par.a;
    b.addEventListener("click", () => {
      if (b.disabled) return;
      izq.querySelectorAll(".chip").forEach(x => x.classList.remove("elegido"));
      b.classList.add("elegido");
      elegido = b;
    });
    izq.appendChild(b);
  });

  revolver(ej.pares.slice()).forEach(par => {
    const b = crear("button", "chip", par.b);
    b.dataset.par = par.a;
    b.addEventListener("click", () => {
      if (!elegido || b.disabled) return;
      intentos++;
      if (b.dataset.par === elegido.dataset.par) {
        b.classList.add("puesto"); elegido.classList.add("puesto");
        b.disabled = true; elegido.disabled = true;
        elegido.classList.remove("elegido");
        elegido = null; listos++;
        if (listos === ej.pares.length) { dice.hidden = false; dice.classList.remove("mal"); dice.textContent = "Sistema ordenado."; cerrar(intentos <= ej.pares.length ? 1 : 2); }
      } else {
        b.classList.add("error");
        setTimeout(() => b.classList.remove("error"), 500);
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "Esa no es. Lee otra vez la definición completa antes de decidir.";
      }
    });
    der.appendChild(b);
  });

  rejilla.appendChild(izq); rejilla.appendChild(der);
  zona.appendChild(rejilla); zona.appendChild(dice);
  if (yaHecho) zona.querySelectorAll("button").forEach(b => b.disabled = true);
}

function montarSecuencia(zona, ej, cerrar, yaHecho) {
  let intentos = 0, paso = 0;
  const hechos = crear("ol", "secuencia-hechos");
  const banco = crear("div", "chips");
  const dice = crear("div", "dice");
  dice.hidden = true;

  revolver(ej.pasos.map((t, i) => ({ t, i }))).forEach(item => {
    const b = crear("button", "chip", item.t);
    b.addEventListener("click", () => {
      intentos++;
      if (item.i === paso) {
        hechos.appendChild(crear("li", null, item.t));
        b.remove(); paso++;
        if (paso === ej.pasos.length) {
          dice.hidden = false; dice.classList.remove("mal");
          dice.textContent = "Ese es el orden.";
          cerrar(intentos === ej.pasos.length ? 1 : 2);
        }
      } else {
        b.classList.add("error");
        setTimeout(() => b.classList.remove("error"), 500);
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "Ese paso todavía no toca.";
      }
    });
    banco.appendChild(b);
  });

  zona.appendChild(hechos); zona.appendChild(banco); zona.appendChild(dice);
  if (yaHecho) {
    banco.innerHTML = "";
    ej.pasos.forEach(p => hechos.appendChild(crear("li", null, p)));
  }
}

function montarCodificar(zona, ej, cerrar, yaHecho) {
  let intentos = 0, seleccion = new Set(), cerrado = false;

  const paleta = crear("div", "paleta");
  const texto = crear("p", "transcripcion");
  const dice = crear("div", "dice");
  dice.hidden = true;

  ej.texto.forEach((frase, i) => {
    const s = crear("span", "seg", frase);
    s.addEventListener("click", () => {
      if (cerrado) return;
      if (seleccion.has(i)) { seleccion.delete(i); s.classList.remove("sel"); }
      else { seleccion.add(i); s.classList.add("sel"); }
    });
    texto.appendChild(s);
    texto.appendChild(document.createTextNode(" "));
  });

  ej.codigos.forEach(c => {
    const b = crear("button", "codigo-btn");
    const punto = crear("span", "punto");
    punto.style.background = CURSO.paleta[c.color] || c.color;
    b.appendChild(punto);
    b.appendChild(crear("span", null, c.nombre));
    b.addEventListener("click", () => {
      if (cerrado) return;
      if (seleccion.size === 0) {
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "Primero marca el fragmento en el texto y después elige el código.";
        return;
      }
      intentos++;
      const tramoOk = ej.solucion.segmentos.length === seleccion.size &&
        ej.solucion.segmentos.every(i => seleccion.has(i));
      const codigoOk = c.id === ej.solucion.codigo;

      if (tramoOk && codigoOk) {
        cerrado = true;
        texto.querySelectorAll(".seg").forEach((s, i) => {
          s.classList.remove("sel");
          if (seleccion.has(i)) {
            s.classList.add("pintado");
            s.style.background = tinte(CURSO.paleta[c.color] || c.color, .55);
          }
          s.classList.add("bloqueado");
        });
        paleta.querySelectorAll("button").forEach(x => x.disabled = true);
        dice.hidden = false; dice.classList.remove("mal");
        dice.textContent = "Segmento marcado. Así se ve en Codificar texto (Code text), con el color del código.";
        cerrar(intentos);
      } else if (tramoOk && !codigoOk) {
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "El tramo está bien elegido, el código no. Lee otra vez qué nombra cada etiqueta.";
      } else {
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "Revisa el tramo. Marcaste " + seleccion.size + " frase" + (seleccion.size === 1 ? "" : "s") + " y el sentido queda incompleto o de más.";
      }
    });
    paleta.appendChild(b);
  });

  zona.appendChild(texto);
  zona.appendChild(paleta);

  if (ej.pista) {
    const pista = crear("button", "pista", "Ver pista");
    const cuerpo = crear("p", "pista-texto", ej.pista);
    cuerpo.hidden = true;
    pista.addEventListener("click", () => { cuerpo.hidden = !cuerpo.hidden; pista.textContent = cuerpo.hidden ? "Ver pista" : "Ocultar pista"; });
    zona.appendChild(pista);
    zona.appendChild(cuerpo);
  }
  zona.appendChild(dice);

  if (yaHecho) {
    cerrado = true;
    const color = CURSO.paleta[(ej.codigos.find(c => c.id === ej.solucion.codigo) || {}).color];
    texto.querySelectorAll(".seg").forEach((s, i) => {
      s.classList.add("bloqueado");
      if (ej.solucion.segmentos.includes(i)) { s.classList.add("pintado"); s.style.background = tinte(color, .55); }
    });
    paleta.querySelectorAll("button").forEach(x => x.disabled = true);
  }
}

function montarClasificar(zona, ej, cerrar, yaHecho) {
  let intentos = 0, elegido = null, colocados = 0;
  const banco = crear("div", "chips");
  const tablero = crear("div", "tablero");
  const dice = crear("div", "dice");
  dice.hidden = true;

  revolver(ej.items.slice()).forEach(item => {
    const b = crear("button", "chip", item.t);
    b.dataset.cat = item.cat;
    b.addEventListener("click", () => {
      banco.querySelectorAll(".chip").forEach(x => x.classList.remove("elegido"));
      b.classList.add("elegido");
      elegido = b;
      tablero.querySelectorAll(".categoria").forEach(c => c.classList.add("destino"));
    });
    banco.appendChild(b);
  });

  ej.categorias.forEach(cat => {
    const caja = crear("div", "categoria");
    caja.appendChild(crear("h3", null, cat.nombre));
    const lista = crear("ul");
    caja.appendChild(lista);
    caja.addEventListener("click", () => {
      if (!elegido) return;
      intentos++;
      if (elegido.dataset.cat === cat.id) {
        lista.appendChild(crear("li", null, elegido.textContent));
        elegido.remove(); elegido = null; colocados++;
        tablero.querySelectorAll(".categoria").forEach(c => c.classList.remove("destino"));
        if (colocados === ej.items.length) {
          dice.hidden = false; dice.classList.remove("mal");
          dice.textContent = "Sistema armado. Así se vería el árbol de códigos en el panel izquierdo.";
          cerrar(intentos === ej.items.length ? 1 : 2);
        }
      } else {
        caja.classList.add("mal");
        setTimeout(() => caja.classList.remove("mal"), 500);
        dice.hidden = false; dice.classList.add("mal");
        dice.textContent = "Ahí no encaja. Pregúntate qué comparten los códigos que ya están dentro.";
      }
    });
    tablero.appendChild(caja);
  });

  zona.appendChild(banco);
  zona.appendChild(tablero);
  zona.appendChild(dice);

  if (yaHecho) {
    banco.innerHTML = "";
    ej.categorias.forEach((cat, i) => {
      const lista = tablero.children[i].querySelector("ul");
      ej.items.filter(it => it.cat === cat.id).forEach(it => lista.appendChild(crear("li", null, it.t)));
    });
  }
}

function montarAbierta(zona, ej, cerrar, yaHecho) {
  const caja = crear("div", "abierta");
  if (ej.guia) {
    const ul = crear("ul", "guia");
    ej.guia.forEach(g => ul.appendChild(crear("li", null, g)));
    caja.appendChild(ul);
  }
  const area = document.createElement("textarea");
  area.placeholder = "Escribe aquí. Mínimo unas cuatro líneas.";
  caja.appendChild(area);

  const fila = crear("div", "fila-acciones");
  const verModelo = crear("button", "accion", "Comparar con una respuesta modelo");
  const cobrar = crear("button", "accion secundaria", "La mía cumple, cobrar XP");
  cobrar.hidden = true;
  fila.appendChild(verModelo);
  fila.appendChild(cobrar);
  caja.appendChild(fila);

  const modelo = crear("div", "modelo");
  modelo.hidden = true;
  modelo.appendChild(crear("h4", null, "Respuesta modelo"));
  modelo.appendChild(crear("p", null, ej.modelo));
  caja.appendChild(modelo);

  verModelo.addEventListener("click", () => {
    if (area.value.trim().length < 120) {
      avisar("Escribe tu versión primero, aunque salga tosca.");
      area.focus();
      return;
    }
    modelo.hidden = false;
    verModelo.disabled = true;
    cobrar.hidden = false;
  });

  cobrar.addEventListener("click", () => {
    cobrar.disabled = true;
    cerrar(1);
  });

  if (yaHecho) {
    modelo.hidden = false;
    verModelo.disabled = true;
    area.value = "Ejercicio ya resuelto.";
    area.disabled = true;
  }
  zona.appendChild(caja);
}

/* ---------- certificate ---------- */

function constancia() {
  const caja = crear("section", "constancia");
  const ultimo = CURSO.niveles[CURSO.niveles.length - 1];
  if (!nivelCompleto(ultimo)) {
    caja.appendChild(crear("h2", null, "Constancia bloqueada"));
    caja.appendChild(crear("p", null, "Se libera al resolver los cuatro ejercicios de este nivel."));
    return caja;
  }
  caja.appendChild(crear("h2", null, "Constancia de participación"));
  caja.appendChild(crear("p", null, "acredita haber completado los ocho niveles del curso " + CURSO.titulo));

  const nombre = document.createElement("input");
  nombre.placeholder = "Escribe tu nombre";
  nombre.value = estado.nombre || "";
  nombre.addEventListener("input", () => { estado.nombre = nombre.value; persistir(); });
  caja.appendChild(nombre);

  caja.appendChild(crear("p", null, estado.xp + " XP acumulados, " + estado.insignias.length + " insignias, " + CURSO.autoria));

  const imprimir = crear("button", "accion", "Imprimir o guardar en PDF");
  imprimir.addEventListener("click", () => window.print());
  const fila = crear("div", "fila-acciones");
  fila.style.justifyContent = "center";
  fila.appendChild(imprimir);
  caja.appendChild(fila);
  return caja;
}

/* ---------- routing ---------- */

function enrutar() {
  const id = location.hash.replace("#", "");
  const idx = CURSO.niveles.findIndex(n => n.id === id);
  if (idx === -1) { pintarPortada(); }
  else if (!nivelAbierto(idx)) { avisar("Ese nivel todavía está cerrado."); location.hash = ""; return; }
  else { pintarNivel(CURSO.niveles[idx], idx); }
  pintarRail();
  window.scrollTo(0, 0);
}

function reiniciar() {
  if (!confirm("Esto borra tu XP, tus insignias y los ejercicios resueltos. ¿Seguimos?")) return;
  guardado.borrar();
  estado = JSON.parse(JSON.stringify(estadoInicial));
  location.hash = "";
  enrutar();
}

window.addEventListener("hashchange", enrutar);
document.addEventListener("DOMContentLoaded", () => {
  $(".marca span").textContent = CURSO.titulo;
  $(".marca-sub").textContent = CURSO.subtitulo;
  $(".reinicio").addEventListener("click", reiniciar);
  enrutar();
});
