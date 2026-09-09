// Game engine: progress, map, missions, streak, stars and activities.

const CLAVE = "curso-qualcoder-v4";

const guardado = (() => {
  let memoria = null;
  return {
    leer() { try { return JSON.parse(localStorage.getItem(CLAVE)) || null; } catch (e) { return memoria; } },
    escribir(d) { memoria = d; try { localStorage.setItem(CLAVE, JSON.stringify(d)); } catch (e) {} },
    borrar() { memoria = null; try { localStorage.removeItem(CLAVE); } catch (e) {} }
  };
})();

const inicial = { xp: 0, hechos: {}, insignias: [], nombre: "", sonido: true };
let estado = Object.assign({}, inicial, guardado.leer() || {});
let mision = null;

/* ---------- utilities ---------- */

const $ = (s, r = document) => r.querySelector(s);
const crear = (tag, clase, texto) => {
  const el = document.createElement(tag);
  if (clase) el.className = clase;
  if (texto !== undefined) el.textContent = texto;
  return el;
};
const revolver = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(p => p[1]);
const clave = (nivel, i) => nivel.id + "-" + i;
const hecho = (nivel, i) => estado.hechos[clave(nivel, i)] !== undefined;
const nivelCompleto = n => n.ejercicios.every((_, i) => hecho(n, i));
// Todas las misiones están abiertas. Se pueden tomar en cualquier orden.
const nivelAbierto = () => true;
const nivelEmpezado = n => n.ejercicios.some((_, i) => hecho(n, i));
const persistir = () => guardado.escribir(estado);
const xpTotal = CURSO.niveles.reduce((s, n) => s + n.ejercicios.reduce((t, e) => t + e.xp, 0), 0);
const corto = (t, n) => t.length > n ? t.slice(0, n - 1).trim() + "…" : t;

function tinte(hex, alfa) {
  const h = (hex || "#cccccc").replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alfa + ")";
}

function rango() {
  let r = CURSO.rangos[0];
  CURSO.rangos.forEach(x => { if (estado.xp >= x.xp) r = x; });
  return r;
}

function estrellasNivel(nivel) {
  const vals = nivel.ejercicios.map((_, i) => estado.hechos[clave(nivel, i)]).filter(v => v !== undefined);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

/* ---------- sound ---------- */

let audio;
function sonar(tipo) {
  if (!estado.sonido) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const notas = { bien: [660, 880], mal: [220, 165], premio: [523, 659, 784], toque: [440] }[tipo] || [440];
    notas.forEach((f, i) => {
      const osc = audio.createOscillator(), vol = audio.createGain();
      osc.type = "triangle"; osc.frequency.value = f;
      vol.gain.setValueAtTime(0.0001, audio.currentTime + i * 0.09);
      vol.gain.exponentialRampToValueAtTime(0.14, audio.currentTime + i * 0.09 + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + i * 0.09 + 0.16);
      osc.connect(vol); vol.connect(audio.destination);
      osc.start(audio.currentTime + i * 0.09); osc.stop(audio.currentTime + i * 0.09 + 0.18);
    });
  } catch (e) {}
}

/* ---------- notices ---------- */

let temporizador;
function avisar(html, clase) {
  let caja = $(".aviso");
  if (!caja) { caja = crear("div", "aviso"); document.body.appendChild(caja); }
  caja.className = "aviso" + (clase ? " " + clase : "");
  caja.innerHTML = html;
  clearTimeout(temporizador);
  temporizador = setTimeout(() => caja.remove(), 3400);
}

/* ---------- image lightbox ---------- */

let lupaAbierta = null;

function abrirCapa(contenido, clase, etiquetaCerrar) {
  cerrarLupa();
  const capa = crear("div", "lupa" + (clase ? " " + clase : ""));
  const cerrar = crear("button", "lupa-cerrar", "✕");
  cerrar.setAttribute("aria-label", etiquetaCerrar || "Cerrar");
  cerrar.addEventListener("click", cerrarLupa);
  capa.appendChild(cerrar);
  capa.appendChild(contenido);
  capa.addEventListener("click", ev => { if (ev.target === capa) cerrarLupa(); });
  document.body.appendChild(capa);
  lupaAbierta = capa;
  cerrar.focus();
  return capa;
}

function abrirLupa(src, pie) {
  const marco = crear("figure", "lupa-marco");
  const img = document.createElement("img");
  img.src = src; img.alt = pie || "";
  marco.appendChild(img);
  if (pie) marco.appendChild(crear("figcaption", null, pie));
  abrirCapa(marco, null, "Cerrar la imagen");
}

// Small card with the full reference, so nobody loses their place in the mission.
function abrirReferencia(clave, cita) {
  const caja = crear("div", "tarjeta-ref");
  caja.appendChild(crear("p", "tarjeta-tipo", "Referencia"));
  const texto = referencia(clave);
  caja.appendChild(crear("p", "tarjeta-ref-texto", texto || "Esta cita todavía no tiene su ficha completa en la lista de referencias."));
  if (cita) caja.appendChild(crear("p", "tarjeta-cita", "En el texto se cita como (" + cita + ")."));
  const pie = crear("footer", "tarjeta-pie");
  const enlace = crear("button", "tarjeta-enlace", "Ver todas las referencias del curso");
  enlace.addEventListener("click", () => { cerrarLupa(); location.hash = "#referencias"; });
  pie.appendChild(enlace);
  pie.appendChild(crear("span", "tarjeta-nota", "Se cierra con Esc y vuelves justo donde estabas."));
  caja.appendChild(pie);
  abrirCapa(caja, "capa-ref", "Cerrar la referencia");
}

function cerrarLupa() {
  if (lupaAbierta) { lupaAbierta.remove(); lupaAbierta = null; }
}

// Turns a course image into one that opens in the lightbox.
function ampliable(img, pie) {
  img.classList.add("ampliable");
  img.tabIndex = 0;
  img.title = "Tocar para ampliar";
  const abrir = () => abrirLupa(img.src, pie);
  img.addEventListener("click", abrir);
  img.addEventListener("keydown", ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); abrir(); } });
  return img;
}

/* ---------- hud ---------- */

function pintarHud() {
  $(".hud-rango").textContent = rango().nombre;
  $(".hud-xp").textContent = estado.xp + " XP";
  $(".hud-barra i").style.width = Math.min(100, (estado.xp / xpTotal) * 100) + "%";
  $(".hud-insignias").textContent = "✦ " + estado.insignias.length + " / " + CURSO.niveles.length;
  $(".hud-sonido").textContent = estado.sonido ? "🔊" : "🔇";
  $(".hud-sonido").setAttribute("aria-label", estado.sonido ? "Apagar sonido" : "Encender sonido");
}

/* ---------- map ---------- */

function pintarMapa() {
  mision = null;
  const zona = $("#app");
  zona.innerHTML = "";
  const cont = crear("div", "mapa");

  const intro = crear("header", "mapa-intro");
  intro.appendChild(crear("h1", null, "Mapa de misiones"));
  intro.appendChild(crear("p", null, estado.xp === 0
    ? CURSO.niveles.length + " misiones sobre el QualCoder 4 real, desde la instalación. Se practica en un simulador de la ventana del programa, con sus menús y sus módulos. Equivocarse no descuenta, cada actividad resuelta suma sus XP."
    : "Rango actual " + rango().nombre + ". Puedes tomar las misiones en el orden que quieras y retomar en cualquier momento las actividades saltadas."));
  cont.appendChild(intro);

  const senda = crear("ol", "senda");
  CURSO.niveles.forEach((nivel, i) => {
    const listo = nivelCompleto(nivel), empezada = nivelEmpezado(nivel);
    const li = crear("li", "nodo" + (listo ? " listo" : empezada ? " en-marcha" : ""));
    const btn = crear("button", "nodo-btn");
    btn.appendChild(crear("span", "disco", listo ? nivel.insignia.icono : String(i + 1)));

    const bloque = crear("span", "nodo-texto");
    bloque.appendChild(crear("strong", null, (i + 1) + ". " + nivel.titulo));
    bloque.appendChild(crear("span", "nodo-lema", nivel.lema));
    if (empezada && !listo) {
      const hechas = nivel.ejercicios.filter((_, j) => hecho(nivel, j)).length;
      bloque.appendChild(crear("span", "nodo-avance", "En marcha, " + hechas + " de " + nivel.ejercicios.length + " actividades"));
    }
    const estrellas = crear("span", "estrellas");
    for (let e = 1; e <= 3; e++) estrellas.appendChild(crear("span", "estrella" + (estrellasNivel(nivel) >= e ? " viva" : ""), "★"));
    bloque.appendChild(estrellas);
    btn.appendChild(bloque);

    btn.addEventListener("click", () => { sonar("toque"); location.hash = "#" + nivel.id; });
    li.appendChild(btn);
    senda.appendChild(li);
  });
  cont.appendChild(senda);

  const todo = CURSO.niveles.every(nivelCompleto);
  const final = crear("div", "nodo-final" + (todo ? " listo" : ""));
  final.appendChild(crear("h2", null, todo ? "Constancia liberada" : "Constancia bloqueada"));
  final.appendChild(crear("p", null, todo
    ? "Completaste las " + CURSO.niveles.length + " misiones."
    : "Se libera al terminar las " + CURSO.niveles.length + " misiones."));
  if (todo) {
    const b = crear("button", "accion", "Ver mi constancia");
    b.addEventListener("click", () => { location.hash = "#constancia"; });
    final.appendChild(b);
  }
  cont.appendChild(final);

  zona.appendChild(cont);
  pintarHud();
}

/* ---------- mission ---------- */

function abrirMision(nivel, idx, directo, desdeCero) {
  const pendiente = nivel.ejercicios.findIndex((_, i) => !hecho(nivel, i));
  mision = {
    nivel: nivel, idx: idx, i: desdeCero || pendiente === -1 ? 0 : pendiente,
    paso: directo ? "ej" : "briefing", racha: 0, hechas: 0, saltadas: 0, ganado: 0
  };
  pintarMision();
}

function pintarMision() {
  const zona = $("#app");
  zona.innerHTML = "";
  const n = mision.nivel;
  if (mision.paso === "briefing") return zona.appendChild(pantallaBriefing(n));
  if (mision.paso === "fin") return zona.appendChild(pantallaFin(n));

  const marco = crear("div", "mision");
  marco.appendChild(barraMision(n));
  marco.appendChild(tarjetaEjercicio(n, n.ejercicios[mision.i], mision.i));
  zona.appendChild(marco);
}

function pantallaBriefing(n) {
  const c = crear("div", "briefing");
  c.appendChild(crear("p", "paso", "Misión " + (mision.idx + 1) + " de " + CURSO.niveles.length));
  c.appendChild(crear("h1", null, (mision.idx + 1) + ". " + n.titulo));
  c.appendChild(crear("p", "lema", n.lema));
  c.appendChild(bloqueMedios(n));
  const lec = crear("div", "lectura");
  lec.innerHTML = n.lectura;
  c.appendChild(lec);
  c.appendChild(bloqueDefiniciones(n));

  const fila = crear("div", "fila-acciones");
  const ir = crear("button", "accion", nivelCompleto(n) ? "Repasar la misión" : "Empezar la misión");
  ir.addEventListener("click", () => { sonar("toque"); mision.paso = "ej"; pintarMision(); });
  const volver = crear("button", "accion fantasma", "Volver al mapa");
  volver.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(ir); fila.appendChild(volver);
  c.appendChild(fila);
  return c;
}

// Video and screenshot gallery shown before the lesson. Fill "medios" in contenido.js.
function bloqueMedios(n) {
  const caja = crear("section", "medios");
  caja.appendChild(crear("h2", null, "Videos y capturas"));
  const rejilla = crear("div", "medios-rejilla");

  (n.medios || []).forEach(m => {
    const pieza = crear("figure", "medio" + (m.tipo === "video" ? " medio-video" : ""));
    if (m.tipo === "video" && m.id) {
      const marco = crear("div", "video-marco");
      const ifr = document.createElement("iframe");
      ifr.src = "https://www.youtube-nocookie.com/embed/" + m.id;
      ifr.title = m.titulo || n.titulo;
      ifr.allowFullscreen = true; ifr.loading = "lazy";
      marco.appendChild(ifr);
      pieza.appendChild(marco);
    } else if (m.tipo === "imagen" && m.src) {
      const img = document.createElement("img");
      img.src = m.src;
      img.alt = m.titulo || "";
      img.loading = "lazy";
      pieza.appendChild(ampliable(img, m.pie || m.titulo));
    } else {
      const hueco = crear("div", "medio-vacio");
      hueco.appendChild(crear("span", "medio-marca", m.tipo === "video" ? "Video" : "Captura"));
      hueco.appendChild(crear("p", "medio-sugerido", m.titulo || ""));
      hueco.appendChild(crear("p", "medio-como", m.tipo === "video"
        ? "Pon el identificador de YouTube en el campo id de este medio, dentro de assets/contenido.js"
        : "Guarda la imagen en assets/img/ y escribe su ruta en el campo src, dentro de assets/contenido.js"));
      pieza.appendChild(hueco);
    }
    const pie = m.pie || m.titulo;
    if (pie) pieza.appendChild(crear("figcaption", null, pie));
    rejilla.appendChild(pieza);
  });

  if (!(n.medios || []).length) {
    rejilla.appendChild(crear("p", "medio-como", "Esta misión todavía no tiene medios. Se añaden en el arreglo medios de assets/contenido.js"));
  }
  caja.appendChild(rejilla);
  return caja;
}

// Sourced conceptual definitions for the mission.
function bloqueDefiniciones(n) {
  const caja = crear("section", "definiciones");
  if (!(n.definiciones || []).length) return caja;
  caja.appendChild(crear("h2", null, "Definiciones"));
  const lista = crear("dl", "definiciones-lista");
  n.definiciones.forEach(d => {
    const dt = crear("dt", null, d.termino);
    const dd = crear("dd");
    dd.appendChild(crear("span", "definicion-texto", d.texto));
    if (d.cita) {
      const cita = crear("button", "cita", "(" + d.cita + ")");
      cita.title = referencia(d.clave) || "Ver la referencia";
      cita.addEventListener("click", () => abrirReferencia(d.clave, d.cita));
      dd.appendChild(cita);
    }
    lista.appendChild(dt);
    lista.appendChild(dd);
  });
  caja.appendChild(lista);
  return caja;
}

function referencia(clave) {
  const r = (CURSO.bibliografia || []).find(x => x.clave === clave);
  return r ? r.ref : "";
}

function barraMision(n) {
  const b = crear("div", "barra-mision");
  b.appendChild(crear("span", "cuenta-mision", (mision.i + 1) + " / " + n.ejercicios.length));
  const puntos = crear("div", "puntos-mision");
  n.ejercicios.forEach((_, i) => {
    const p = crear("span", "punto" + (i < mision.i ? " hecho" : i === mision.i ? " ahora" : ""));
    if (estado.hechos[clave(n, i)] === 0) p.classList.add("saltado");
    puntos.appendChild(p);
  });
  b.appendChild(puntos);
  b.appendChild(crear("div", "racha", mision.racha >= 2 ? "Racha " + mision.racha + " ✦" : ""));
  return b;
}

const NOMBRE_TIPO = {
  quiz: "Decisión comentada", parejas: "Parejas", secuencia: "Secuencia", codificar: "Codificar texto",
  clasificar: "Clasificación", abierta: "Escritura", interfaz: "Simulador", dialogo: "Ventana",
  explorar: "Exploración"
};

function tarjetaEjercicio(nivel, ej, idx) {
  const caja = crear("section", "ejercicio");
  const cabeza = crear("div", "ejercicio-cabeza");
  const etiqueta = crear("span", "ejercicio-tipo");
  etiqueta.appendChild(crear("b", "ejercicio-num", (mision.idx + 1) + "." + (idx + 1)));
  etiqueta.appendChild(crear("span", null, NOMBRE_TIPO[ej.tipo] || ""));
  cabeza.appendChild(etiqueta);
  cabeza.appendChild(crear("span", "ejercicio-xp", ej.xp + " XP"));
  caja.appendChild(cabeza);
  caja.appendChild(crear("p", "enunciado", ej.pregunta || ej.instruccion));

  const cuerpo = crear("div", "cuerpo-ejercicio");
  caja.appendChild(cuerpo);
  const pie = crear("div", "pie-ejercicio");
  caja.appendChild(pie);
  const salidas = crear("div", "salidas");
  caja.appendChild(salidas);

  let errores = 0, cerrado = false;

  const reiniciar = crear("button", "salida", "Reiniciar lección");
  reiniciar.addEventListener("click", () => { sonar("toque"); abrirMision(nivel, mision.idx, false, true); });
  const saltar = crear("button", "salida", "Saltar");
  saltar.addEventListener("click", () => {
    if (cerrado) return;
    cerrado = true;
    if (!hecho(nivel, idx)) { estado.hechos[clave(nivel, idx)] = 0; persistir(); }
    mision.racha = 0; mision.saltadas++;
    avisar("Actividad saltada, sin XP. Puedes volver a ella repasando la misión.");
    avanzar(nivel);
  });
  salidas.appendChild(reiniciar);
  salidas.appendChild(saltar);

  const api = {
    fallo(mensaje) {
      if (cerrado) return;
      errores++;
      sonar("toque");
      if (mensaje) avisar(mensaje);
    },
    aviso(mensaje) { avisar(mensaje); },
    resuelto(mensaje) {
      if (cerrado) return;
      cerrado = true;
      sonar("bien");
      const estrellas = 3;
      const previo = estado.hechos[clave(nivel, idx)];
      mision.hechas++;
      if (previo === undefined || previo === 0) {
        estado.xp += ej.xp; mision.ganado += ej.xp;
        estado.hechos[clave(nivel, idx)] = estrellas;
        mision.racha++;
        if (mision.racha % 3 === 0) { estado.xp += 5; mision.ganado += 5; avisar("Tres seguidas, <b>+5 XP</b>", "bueno"); }
      } else {
        estado.hechos[clave(nivel, idx)] = estrellas;
        mision.racha++;
      }
      persistir(); pintarHud();
      const barra = $(".barra-mision");
      if (barra) barra.replaceWith(barraMision(nivel));
      salidas.innerHTML = "";
      mostrarResultado(pie, mensaje || ej.dice, estrellas, nivel);
    }
  };

  ({
    quiz: montarQuiz, parejas: montarParejas, secuencia: montarSecuencia, codificar: montarCodificar,
    clasificar: montarClasificar, abierta: montarAbierta, interfaz: montarInterfaz,
    dialogo: montarDialogo, explorar: montarExplorar
  })[ej.tipo](cuerpo, ej, api);

  return caja;
}

function avanzar(nivel) {
  if (mision.i + 1 < nivel.ejercicios.length) { mision.i++; pintarMision(); }
  else cerrarMision(nivel);
}

function mostrarResultado(pie, mensaje, estrellas, nivel) {
  pie.innerHTML = "";
  const marca = crear("div", "resuelto-marca");
  const est = crear("span", "estrellas");
  for (let e = 1; e <= 3; e++) est.appendChild(crear("span", "estrella" + (estrellas >= e ? " viva" : ""), "★"));
  marca.appendChild(est);
  if (mensaje) marca.appendChild(crear("p", "dice bien", mensaje));
  pie.appendChild(marca);
  const btn = crear("button", "accion", mision.i + 1 < nivel.ejercicios.length ? "Siguiente" : "Terminar misión");
  btn.addEventListener("click", () => avanzar(nivel));
  pie.appendChild(btn);
  btn.focus();
}

function cerrarMision(nivel) {
  if (nivelCompleto(nivel) && !estado.insignias.includes(nivel.id)) {
    estado.insignias.push(nivel.id);
    sonar("premio");
  }
  persistir();
  mision.paso = "fin";
  pintarHud();
  pintarMision();
}

function pantallaFin(n) {
  const c = crear("div", "resultados");
  const gano = estado.insignias.includes(n.id);
  c.appendChild(crear("h1", null, gano ? "Misión cumplida" : "Misión repasada"));

  const est = crear("div", "estrellas grandes");
  const e = estrellasNivel(n);
  for (let i = 1; i <= 3; i++) est.appendChild(crear("span", "estrella" + (e >= i ? " viva" : ""), "★"));
  c.appendChild(est);

  const saltadas = n.ejercicios.filter((_, i) => estado.hechos[clave(n, i)] === 0).length;
  const tabla = crear("ul", "marcador");
  [
    ["Actividades resueltas", mision.hechas + " de " + n.ejercicios.length],
    ["XP ganado en esta misión", mision.ganado],
    ["Actividades saltadas", saltadas],
    ["XP total", estado.xp]
  ].forEach(([a, b]) => {
    const li = crear("li");
    li.appendChild(crear("span", null, a));
    li.appendChild(crear("b", null, String(b)));
    tabla.appendChild(li);
  });
  c.appendChild(tabla);
  if (saltadas) c.appendChild(crear("p", null, "Las saltadas siguen ahí. Vuelve a entrar a la misión cuando quieras cobrarlas."));

  if (gano) {
    const ins = crear("div", "insignia-ganada");
    ins.appendChild(crear("span", "disco", n.insignia.icono));
    ins.appendChild(crear("span", null, "Insignia " + n.insignia.nombre));
    c.appendChild(ins);
  }

  const fila = crear("div", "fila-acciones");
  const sig = CURSO.niveles[mision.idx + 1];
  if (sig) {
    const b = crear("button", "accion", "Misión " + (mision.idx + 2));
    b.addEventListener("click", () => { location.hash = "#" + sig.id; });
    fila.appendChild(b);
  } else {
    const b = crear("button", "accion", "Ver mi constancia");
    b.addEventListener("click", () => { location.hash = "#constancia"; });
    fila.appendChild(b);
  }
  const otra = crear("button", "accion fantasma", "Repetir la misión");
  otra.addEventListener("click", () => abrirMision(n, mision.idx, true));
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(otra); fila.appendChild(mapa);
  c.appendChild(fila);
  return c;
}

/* ---------- simulated QualCoder window ---------- */

// Only one dropdown can be open at a time; Esc or a click outside closes it.
let cerradorActivo = null;
function cerrarMenuAbierto() {
  if (cerradorActivo) { const f = cerradorActivo; cerradorActivo = null; f(); }
}

function logoQC() {
  const caja = crear("span", "qc-icono");
  caja.appendChild(crear("b", "qc-icono-q", "Q"));
  caja.appendChild(crear("b", "qc-icono-c", "C"));
  return caja;
}

// Optional screenshot slot. Shows a placeholder while it has no src.
function imagenOpcional(m, comoLlenarlo) {
  if (!m || (!m.src && CURSO.huecosVisibles === false)) return null;
  const fig = crear("figure", "medio medio-suelto");
  if (m.src) {
    const img = document.createElement("img");
    img.src = m.src; img.alt = m.titulo || ""; img.loading = "lazy";
    fig.appendChild(ampliable(img, m.pie || m.titulo));
    if (m.pie || m.titulo) fig.appendChild(crear("figcaption", null, m.pie || m.titulo));
  } else {
    const hueco = crear("div", "medio-vacio");
    hueco.appendChild(crear("span", "medio-marca", "Captura"));
    hueco.appendChild(crear("p", "medio-sugerido", m.titulo || "Captura de pantalla"));
    hueco.appendChild(crear("p", "medio-como", comoLlenarlo));
    fig.appendChild(hueco);
  }
  return fig;
}

// Builds the main window skin. opciones.vista is "principal" or "codificar".
function ventanaQC(opciones) {
  const I = CURSO.interfaz;
  const ventana = crear("div", "qc");

  const titulo = crear("div", "qc-titulo");
  titulo.appendChild(logoQC());
  titulo.appendChild(crear("span", "qc-nombre", "QualCoder " + I.proyecto));
  titulo.appendChild(crear("span", "qc-controles", "─  ▢  ✕"));
  ventana.appendChild(titulo);

  const barra = crear("div", "qc-menu");
  const capa = crear("div", "qc-desplegable");
  capa.hidden = true;

  function cerrarMenus() {
    capa.hidden = true;
    capa.innerHTML = "";
    if (cerradorActivo === cerrarMenus) cerradorActivo = null;
    barra.querySelectorAll("button").forEach(b => b.classList.remove("abierto"));
    ventana.querySelectorAll(".qc-codigo.abierto").forEach(b => b.classList.remove("abierto"));
  }

  function abrirLista(anclaje, items, alClic) {
    capa.innerHTML = "";
    capa.hidden = false;
    cerradorActivo = cerrarMenus;
    capa.style.left = anclaje.x + "px";
    capa.style.top = anclaje.y + "px";
    setTimeout(() => {
      const sobra = (capa.offsetLeft + capa.offsetWidth) - ventana.clientWidth;
      if (sobra > 0) capa.style.left = Math.max(2, anclaje.x - sobra - 4) + "px";
    }, 0);
    items.forEach(item => {
      const b = crear("button", "qc-item");
      b.appendChild(crear("span", null, item.t));
      if (item.k) b.appendChild(crear("span", "qc-tecla", item.k));
      else if (item.sub) b.appendChild(crear("span", "qc-tecla qc-sub", "▸"));
      b.addEventListener("click", ev => { ev.stopPropagation(); alClic(item); });
      capa.appendChild(b);
    });
  }

  I.menus.forEach(menu => {
    const b = crear("button", "qc-menu-btn", menu.nombre);
    b.addEventListener("click", ev => {
      ev.stopPropagation();
      if (b.classList.contains("abierto")) { cerrarMenus(); return; }
      cerrarMenus();
      b.classList.add("abierto");
      abrirLista({ x: b.offsetLeft, y: b.offsetTop + b.offsetHeight }, menu.items,
        item => { cerrarMenus(); opciones.onMenu(menu.id, item); });
    });
    barra.appendChild(b);
  });
  ventana.appendChild(barra);
  ventana.appendChild(capa);

  const pestanas = crear("div", "qc-pestanas-principales");
  I.pestanas.forEach(p => {
    const activa = p.id === (opciones.pestana || (opciones.vista === "codificar" ? "codificar" : "registro"));
    const b = crear("button", "qc-pestana-p" + (activa ? " activa" : ""), p.t);
    b.addEventListener("click", ev => {
      ev.stopPropagation(); cerrarMenus();
      if (opciones.onPestana) opciones.onPestana(p);
    });
    pestanas.appendChild(b);
  });
  ventana.appendChild(pestanas);

  ventana.addEventListener("click", cerrarMenus);
  return { ventana: ventana, capa: capa, cerrarMenus: cerrarMenus, abrirLista: abrirLista };
}

// Welcome panel shown in the main tabs while no module is open.
function panelBienvenida(texto) {
  const p = crear("div", "qc-bienvenida");
  p.appendChild(crear("h4", null, "Panel de bienvenida"));
  p.appendChild(crear("p", null, texto ||
    "Los módulos se abren dentro de esta pestaña. Mientras no haya ninguno abierto se ve este panel, con la descripción de cada módulo y sus enlaces directos."));
  return p;
}

// Code tree panel, shared by the interface and coding activities.
function arbolCodigos(codigos, alClic, titulo) {
  const panel = crear("div", "qc-arbol-caja");
  panel.appendChild(crear("div", "qc-cabecera-col", titulo || "Name"));
  const lista = crear("ul", "qc-arbol");
  codigos.forEach(c => {
    const li = crear("li");
    const b = crear("button", "qc-codigo");
    b.dataset.nombre = c.nombre;
    const punto = crear("span", "punto");
    punto.style.background = CURSO.paleta[c.color] || c.color || "#B9C6D1";
    b.appendChild(punto);
    b.appendChild(crear("span", null, c.nombre));
    b.addEventListener("click", ev => { ev.stopPropagation(); alClic(c, b); });
    li.appendChild(b);
    lista.appendChild(li);
  });
  panel.appendChild(lista);
  return panel;
}

function listaDocumentos(archivos, activo) {
  const caja = crear("div", "qc-docs");
  const tabs = crear("div", "qc-subpestanas");
  tabs.appendChild(crear("span", "qc-subpestana activa", "Documentos"));
  tabs.appendChild(crear("span", "qc-subpestana", "Asistencia de IA"));
  caja.appendChild(tabs);
  const lista = crear("ul", "qc-lista-docs");
  archivos.forEach((a, i) => lista.appendChild(crear("li", i === (activo || 0) ? "activo" : "", a)));
  caja.appendChild(lista);
  return caja;
}

/* ---------- activity: interfaz ---------- */

function montarInterfaz(zona, ej, api) {
  let cerrado = false;
  const I = CURSO.interfaz;
  const destinoCodigo = ej.ruta[0].indexOf("codigo:") === 0 ? ej.ruta[0].slice(7) : null;
  const esPestana = ej.ruta[0] === "pestana";
  const vista = destinoCodigo ? "codificar" : "principal";

  const marco = ventanaQC({
    vista: vista,
    onMenu: (menuId, item) => {
      if (cerrado) return;
      if (!destinoCodigo && !esPestana && menuId === ej.ruta[0] && item.id === ej.ruta[1]) return acertar();
      api.fallo("Eso abre " + corto(item.t.split(" (")[0], 40) + ", no es lo que se pidió.");
    },
    onPestana: (p) => {
      if (cerrado) return;
      if (esPestana && p.id === ej.ruta[1]) return acertar();
      api.fallo("Esa es la pestaña " + p.t + ", revisa el objetivo.");
    }
  });

  function acertar() {
    cerrado = true;
    marco.ventana.classList.add("qc-listo");
    api.resuelto(ej.dice);
  }

  const cuerpo = crear("div", "qc-cuerpo");
  if (vista === "codificar") {
    const lateral = crear("div", "qc-lateral");
    lateral.appendChild(listaDocumentos(I.archivos, 0));
    lateral.appendChild(arbolCodigos(I.codigos, (c, boton) => {
      if (cerrado) return;
      marco.cerrarMenus();
      boton.classList.add("abierto");
      marco.abrirLista(
        { x: boton.offsetLeft + 24, y: boton.getBoundingClientRect().top - marco.ventana.getBoundingClientRect().top + boton.offsetHeight },
        I.contextual,
        item => {
          marco.cerrarMenus();
          if (cerrado) return;
          if (c.nombre !== destinoCodigo) return api.fallo("Estás operando sobre " + c.nombre + ", revisa sobre qué código hay que actuar.");
          if (item.id !== ej.ruta[1]) return api.fallo(corto(item.t, 40) + " no resuelve lo que se pidió.");
          acertar();
        });
    }));
    cuerpo.appendChild(lateral);
    const doc = crear("div", "qc-doc");
    doc.appendChild(crear("div", "qc-doc-cabeza", I.archivos[0]));
    const texto = crear("div", "qc-texto");
    I.fragmento.forEach(f => texto.appendChild(crear("p", null, f)));
    doc.appendChild(texto);
    cuerpo.appendChild(doc);
  } else {
    cuerpo.appendChild(panelBienvenida(ej.panel));
  }
  marco.ventana.appendChild(cuerpo);
  marco.ventana.appendChild(crear("div", "qc-estado", "Objetivo, " + ej.objetivo));

  zona.appendChild(marco.ventana);
  if (destinoCodigo) zona.appendChild(crear("p", "nota-simulador", "Recuerda que el árbol de códigos se maneja con clic derecho. Aquí basta con tocar el código."));
  const guia = cajaPasos(ej);
  if (guia) zona.appendChild(guia);
  if (ej.pista) zona.appendChild(cajaPista(ej.pista));
}

/* ---------- activity: explorar ---------- */

function montarExplorar(zona, ej, api) {
  const vistos = {};
  let contados = 0, cerrado = false;

  const caja = crear("div", "explorador");
  const ficha = crear("aside", "ficha");
  const marcador = crear("p", "ficha-cuenta");

  function contar(llave) {
    if (vistos[llave]) return;
    vistos[llave] = true;
    contados++;
    marcador.textContent = contados === 1 ? "1 entrada explorada" : contados + " entradas exploradas";
  }

  function mostrar(titulo, item) {
    ficha.innerHTML = "";
    ficha.appendChild(marcador);
    const cab = crear("div", "ficha-cabeza");
    cab.appendChild(crear("span", "ficha-ruta", titulo));
    if (item.k) cab.appendChild(crear("span", "ficha-tecla", item.k));
    ficha.appendChild(cab);
    ficha.appendChild(crear("h4", null, item.t.split(" (")[0]));
    if (item.en) ficha.appendChild(crear("p", "ficha-en", "En inglés, " + item.en));
    ficha.appendChild(crear("p", "ficha-que", item.d || "Sin descripción todavía."));
    if (item.tip) {
      const nota = crear("div", "ficha-tip");
      nota.appendChild(crear("h5", null, "En la práctica"));
      nota.appendChild(crear("p", null, item.tip));
      ficha.appendChild(nota);
    }
    const img = imagenOpcional(
      item.img || { src: "", titulo: "Captura de " + item.t.split(" (")[0] },
      "Guarda la imagen en assets/img/ y añade img: { src: \"assets/img/…\" } a esta entrada del menú, dentro de assets/contenido.js");
    if (img) ficha.appendChild(img);
  }

  const marco = ventanaQC({
    vista: "principal",
    onMenu: (menuId, item) => {
      const menu = CURSO.interfaz.menus.find(m => m.id === menuId);
      mostrar(menu.nombre, item);
      contar(menuId + "-" + item.id);
    },
    onPestana: (p) => {
      mostrar("Ventana principal", p);
      contar("pestana-" + p.id);
    }
  });

  const cuerpo = crear("div", "qc-cuerpo");
  cuerpo.appendChild(panelBienvenida(ej.panel));
  marco.ventana.appendChild(cuerpo);
  marco.ventana.appendChild(crear("div", "qc-estado", "Objetivo, " + ej.objetivo));

  ficha.appendChild(marcador);
  marcador.textContent = "Ninguna entrada explorada todavía";
  ficha.appendChild(crear("p", "ficha-vacia",
    "Toca una entrada de menú o una pestaña y aquí aparece qué hace, con su consejo de uso. Recorre lo que quieras, esta pantalla no se cierra."));

  caja.appendChild(marco.ventana);
  caja.appendChild(ficha);

  const seguir = crear("button", "accion", "Terminé de explorar");
  seguir.addEventListener("click", () => {
    if (cerrado) return;
    cerrado = true;
    seguir.disabled = true;
    api.resuelto(ej.dice);
  });
  caja.appendChild(seguir);

  zona.appendChild(caja);
}

/* ---------- activity: codificar ---------- */

function montarCodificar(zona, ej, api) {
  let cerrado = false, codigoSel = null, seleccion = new Set();
  const I = CURSO.interfaz;
  const accionEsperada = ej.solucion.accion || "marcar";

  const marco = ventanaQC({
    vista: "codificar",
    onMenu: (menuId, item) => {
      if (cerrado) return;
      api.aviso("Ahora toca codificar dentro del módulo, no cambiar de menú.");
    },
    onPestana: () => { if (!cerrado) api.aviso("Sigue en la pestaña Codificar."); }
  });

  const cuerpo = crear("div", "qc-cuerpo");

  const lateral = crear("div", "qc-lateral");
  lateral.appendChild(listaDocumentos(I.archivos, 0));
  const arbol = arbolCodigos(ej.codigos, (c, boton) => {
    if (cerrado) return;
    arbol.querySelectorAll(".qc-codigo").forEach(x => x.classList.remove("elegido"));
    boton.classList.add("elegido");
    codigoSel = c;
  });
  lateral.appendChild(arbol);
  cuerpo.appendChild(lateral);

  const doc = crear("div", "qc-doc");

  const herramientas = crear("div", "qc-herramientas");
  const codificador = crear("span", "qc-coder");
  codificador.appendChild(crear("span", "qc-coder-icono", "👤"));
  codificador.appendChild(crear("span", "qc-coder-campo", I.codificador));
  herramientas.appendChild(codificador);
  const acciones = ["marcar", "invivo", "anotar", "desmarcar", "memo"];
  I.contextual_texto.filter(x => acciones.indexOf(x.id) !== -1).forEach(item => {
    const b = crear("button", "qc-herramienta");
    b.dataset.accion = item.id;
    b.appendChild(crear("span", null, item.t));
    b.appendChild(crear("span", "qc-tecla", item.k));
    b.addEventListener("click", ev => { ev.stopPropagation(); usar(item.id); });
    herramientas.appendChild(b);
  });
  doc.appendChild(herramientas);
  doc.appendChild(crear("div", "qc-doc-cabeza", "E01_Rosa.txt"));

  const rejilla = crear("div", "qc-lineas");
  const filas = [];
  ej.texto.forEach((frase, i) => {
    const num = crear("span", "qc-num", String(i + 1));
    const margen = crear("span", "qc-margen");
    const seg = crear("span", "qc-frase", frase);
    seg.addEventListener("click", ev => {
      ev.stopPropagation();
      if (cerrado) return;
      if (seleccion.has(i)) { seleccion.delete(i); seg.classList.remove("sel"); }
      else { seleccion.add(i); seg.classList.add("sel"); }
    });
    rejilla.appendChild(num); rejilla.appendChild(margen); rejilla.appendChild(seg);
    filas.push({ margen: margen, seg: seg });
  });
  doc.appendChild(rejilla);
  cuerpo.appendChild(doc);
  marco.ventana.appendChild(cuerpo);
  marco.ventana.appendChild(crear("div", "qc-estado", "Selecciona el tramo en el documento y aplica la acción"));

  function tramoOk() {
    return ej.solucion.segmentos.length === seleccion.size && ej.solucion.segmentos.every(i => seleccion.has(i));
  }

  function pintar(color, etiqueta) {
    filas.forEach((f, i) => {
      f.seg.classList.remove("sel");
      if (seleccion.has(i)) {
        f.seg.classList.add("codificado");
        f.seg.style.background = tinte(color, .5);
        f.margen.style.background = color;
        f.margen.classList.add("con-codigo");
        if (i === Math.min.apply(null, ej.solucion.segmentos)) {
          const et = crear("span", "qc-etiqueta-margen", corto(etiqueta, 26));
          et.style.color = color;
          f.margen.appendChild(et);
        }
      }
    });
    marco.ventana.classList.add("qc-listo");
    doc.querySelectorAll(".qc-herramienta").forEach(b => b.disabled = true);
  }

  function usar(accion) {
    if (cerrado) return;
    if (accion === "desmarcar") return api.fallo("Desmarcar quita codificaciones existentes, aquí no hay ninguna todavía.");
    if (accion === "memo") return api.fallo("El memo de la codificación se escribe sobre un segmento ya codificado.");
    if (seleccion.size === 0) return api.aviso("Primero selecciona el tramo en el documento.");

    if (accion === "marcar") {
      if (accionEsperada !== "marcar") return api.fallo(accionEsperada === "invivo"
        ? "Marcar aplica un código del árbol. Aquí se pedía crear la etiqueta con las palabras del texto."
        : "Marcar asigna un código. Aquí se pedía dejar una nota sin código.");
      if (!codigoSel) return api.aviso("Elige antes el código en el árbol, es el que se aplica al marcar.");
      if (!tramoOk()) return api.fallo("Revisa el tramo, el sentido queda incompleto o de más.");
      if (codigoSel.id !== ej.solucion.codigo) return api.fallo("El tramo está bien elegido, el código no.");
      cerrado = true;
      pintar(CURSO.paleta[codigoSel.color] || codigoSel.color, codigoSel.nombre);
      return api.resuelto("Segmento codificado. En el margen queda la franja del color del código, como en el programa.");
    }

    if (accion === "invivo") {
      if (accionEsperada !== "invivo") return api.fallo("El código in vivo crea una etiqueta nueva con el texto seleccionado. Aquí se pedía otra acción.");
      if (!tramoOk()) return api.fallo("Revisa el tramo. El nombre del código va a ser exactamente lo que selecciones.");
      cerrado = true;
      const nombre = "\"" + ej.texto[ej.solucion.segmentos[0]].replace(/^[,;\s]+|[.,;\s]+$/g, "") + "\"";
      pintar(CURSO.paleta.amarillo, nombre);
      const li = crear("li");
      const b = crear("button", "qc-codigo elegido");
      const punto = crear("span", "punto");
      punto.style.background = CURSO.paleta.amarillo;
      b.appendChild(punto); b.appendChild(crear("span", null, corto(nombre, 28)));
      li.appendChild(b);
      arbol.querySelector(".qc-arbol").appendChild(li);
      return api.resuelto("El código in vivo se creó con las palabras del texto y ya está en el árbol.");
    }

    if (accion === "anotar") {
      if (accionEsperada !== "anotar") return api.fallo("Anotar deja una nota sin asignar código, y aquí hacía falta codificar.");
      if (!tramoOk()) return api.fallo("Revisa el tramo que quieres anotar.");
      cerrado = true;
      pintar(CURSO.paleta.amarillo, "Anotación");
      return api.resuelto("Queda una anotación sobre el texto. No entra en ningún informe de codificación, y por eso sirve para lo que todavía no sabes nombrar.");
    }
  }

  zona.appendChild(marco.ventana);
  const guia = cajaPasos(ej);
  if (guia) zona.appendChild(guia);
  if (ej.pista) zona.appendChild(cajaPista(ej.pista));
}

/* ---------- activity: dialogo ---------- */

function montarDialogo(zona, ej, api) {
  const ventana = crear("div", "qc dialogo");
  const titulo = crear("div", "qc-titulo");
  titulo.appendChild(logoQC());
  titulo.appendChild(crear("span", "qc-nombre", ej.titulo));
  titulo.appendChild(crear("span", "qc-controles", "✕"));
  ventana.appendChild(titulo);

  const cuerpo = crear("div", "qc-formulario");
  const controles = {};
  ej.campos.forEach(campo => {
    const fila = crear("label", "campo");
    fila.appendChild(crear("span", "campo-etiqueta", campo.etiqueta));
    let control;
    if (campo.tipo === "select") {
      control = document.createElement("select");
      campo.opciones.forEach(o => {
        const op = document.createElement("option");
        op.value = o; op.textContent = o;
        control.appendChild(op);
      });
    } else if (campo.tipo === "casilla") {
      control = document.createElement("input");
      control.type = "checkbox";
      fila.classList.add("campo-casilla");
    } else {
      control = document.createElement("input");
      control.type = "text";
      control.placeholder = campo.marcador || "";
    }
    controles[campo.id] = control;
    fila.appendChild(control);
    cuerpo.appendChild(fila);
  });
  ventana.appendChild(cuerpo);

  const pie = crear("div", "qc-botones");
  const cancelar = crear("button", "qc-boton", "Cancelar");
  cancelar.addEventListener("click", () => api.aviso("Cancelar cierra la ventana sin guardar nada."));
  const aceptar = crear("button", "qc-boton primario", ej.boton || "Aceptar");
  aceptar.addEventListener("click", () => {
    if (aceptar.disabled) return;
    const malos = ej.campos.filter(campo => {
      const c = controles[campo.id];
      if (campo.tipo === "casilla") return c.checked !== campo.correcto;
      if (campo.tipo === "select") return c.value !== campo.correcto;
      const v = c.value.trim().toLowerCase();
      if (campo.correcto === "cualquiera") return v.length < 2;
      return !campo.correcto.some(x => v.indexOf(x) !== -1);
    });
    if (malos.length) return api.fallo("Revisa el campo " + malos[0].etiqueta.toLowerCase() + ".");
    aceptar.disabled = true; cancelar.disabled = true;
    Object.keys(controles).forEach(k => controles[k].disabled = true);
    ventana.classList.add("qc-listo");
    api.resuelto(ej.dice);
  });
  pie.appendChild(cancelar); pie.appendChild(aceptar);
  ventana.appendChild(pie);
  zona.appendChild(ventana);
}

/* ---------- activity: quiz ---------- */

function montarQuiz(zona, ej, api) {
  const lista = crear("div", "opciones");
  const dice = crear("div", "dice");
  dice.hidden = true;

  const opciones = revolver(ej.opciones.slice());
  opciones.forEach(op => {
    const btn = crear("button", "opcion", op.t);
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      dice.hidden = false;
      dice.textContent = op.dice;
      dice.classList.toggle("mal", !op.ok);
      btn.classList.add(op.ok ? "bien" : "tibio");
      if (op.ok) {
        lista.querySelectorAll("button").forEach(b => b.disabled = true);
        zona.appendChild(repaso(ej));
        api.resuelto(ej.dice);
      } else {
        btn.disabled = true;
        api.fallo("Por ahí no. Lee la nota y prueba con otra.");
      }
    });
    lista.appendChild(btn);
  });

  zona.appendChild(lista);
  zona.appendChild(dice);
  if (ej.pista) zona.appendChild(cajaPista(ej.pista));
}

// Shown once the question is answered: why each option works or not, plus the tip.
function repaso(ej) {
  const caja = crear("div", "repaso");
  caja.appendChild(crear("h4", null, "Qué pasa con cada respuesta"));
  const ul = crear("ul");
  ej.opciones.forEach(op => {
    const li = crear("li", op.ok ? "buena" : "");
    li.appendChild(crear("b", null, op.t));
    li.appendChild(crear("span", null, " " + op.dice));
    ul.appendChild(li);
  });
  caja.appendChild(ul);
  if (ej.consejo) {
    const tip = crear("div", "repaso-consejo");
    tip.appendChild(crear("h5", null, "Consejo práctico"));
    tip.appendChild(crear("p", null, ej.consejo));
    const img = imagenOpcional(ej.consejoImagen,
      "Guarda la imagen en assets/img/ y escribe su ruta en el campo src de consejoImagen, dentro de assets/contenido.js");
    if (img) tip.appendChild(img);
    caja.appendChild(tip);
  }
  return caja;
}

/* ---------- activity: parejas ---------- */

function montarParejas(zona, ej, api) {
  let elegido = null, listos = 0;
  const rejilla = crear("div", "parejas");
  const izq = crear("div", "columna-parejas"), der = crear("div", "columna-parejas");
  revolver(ej.pares.slice()).forEach(par => {
    const b = crear("button", "chip", par.a);
    b.dataset.par = par.a;
    b.addEventListener("click", () => {
      if (b.disabled) return;
      izq.querySelectorAll(".chip").forEach(x => x.classList.remove("elegido"));
      b.classList.add("elegido"); elegido = b;
    });
    izq.appendChild(b);
  });
  revolver(ej.pares.slice()).forEach(par => {
    const b = crear("button", "chip", par.b);
    b.dataset.par = par.a;
    b.addEventListener("click", () => {
      if (!elegido || b.disabled) return;
      if (b.dataset.par === elegido.dataset.par) {
        b.classList.add("puesto"); elegido.classList.add("puesto");
        b.disabled = true; elegido.disabled = true;
        elegido.classList.remove("elegido"); elegido = null; listos++;
        if (listos === ej.pares.length) api.resuelto("Sistema ordenado.");
      } else {
        b.classList.add("error"); setTimeout(() => b.classList.remove("error"), 500);
        api.fallo("Esa pareja no es. Lee la definición completa antes de decidir.");
      }
    });
    der.appendChild(b);
  });
  rejilla.appendChild(izq); rejilla.appendChild(der);
  zona.appendChild(rejilla);
}

/* ---------- activity: secuencia ---------- */

function montarSecuencia(zona, ej, api) {
  let paso = 0;
  const hechos = crear("ol", "secuencia-hechos");
  const banco = crear("div", "chips");
  revolver(ej.pasos.map((t, i) => ({ t: t, i: i }))).forEach(item => {
    const b = crear("button", "chip", item.t);
    b.addEventListener("click", () => {
      if (item.i === paso) {
        hechos.appendChild(crear("li", null, item.t)); b.remove(); paso++;
        if (paso === ej.pasos.length) api.resuelto("Ese es el orden.");
      } else {
        b.classList.add("error"); setTimeout(() => b.classList.remove("error"), 500);
        api.fallo("Ese paso todavía no toca.");
      }
    });
    banco.appendChild(b);
  });
  zona.appendChild(hechos); zona.appendChild(banco);
}

/* ---------- activity: clasificar ---------- */

function montarClasificar(zona, ej, api) {
  let elegido = null, colocados = 0;
  const banco = crear("div", "chips");
  const tablero = crear("div", "tablero");
  revolver(ej.items.slice()).forEach(item => {
    const b = crear("button", "chip", item.t);
    b.dataset.cat = item.cat;
    b.addEventListener("click", () => {
      banco.querySelectorAll(".chip").forEach(x => x.classList.remove("elegido"));
      b.classList.add("elegido"); elegido = b;
      tablero.querySelectorAll(".categoria").forEach(c => c.classList.add("destino"));
    });
    banco.appendChild(b);
  });
  ej.categorias.forEach(cat => {
    const caja = crear("div", "categoria");
    caja.appendChild(crear("h3", null, cat.nombre));
    const lista = crear("ul"); caja.appendChild(lista);
    caja.addEventListener("click", () => {
      if (!elegido) return;
      if (elegido.dataset.cat === cat.id) {
        lista.appendChild(crear("li", null, elegido.textContent));
        elegido.remove(); elegido = null; colocados++;
        tablero.querySelectorAll(".categoria").forEach(c => c.classList.remove("destino"));
        if (colocados === ej.items.length) api.resuelto("Sistema armado. Así se vería el árbol con sus categorías.");
      } else {
        caja.classList.add("mal"); setTimeout(() => caja.classList.remove("mal"), 500);
        api.fallo("Ahí no encaja. Mira qué comparten los códigos que ya están dentro.");
      }
    });
    tablero.appendChild(caja);
  });
  zona.appendChild(banco); zona.appendChild(tablero);
}

/* ---------- activity: abierta ---------- */

function montarAbierta(zona, ej, api) {
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
  const ver = crear("button", "accion", "Comparar con la respuesta modelo");
  const cobrar = crear("button", "accion fantasma", "La mía cumple");
  cobrar.hidden = true;
  fila.appendChild(ver); fila.appendChild(cobrar);
  caja.appendChild(fila);

  const modelo = crear("div", "modelo"); modelo.hidden = true;
  modelo.appendChild(crear("h4", null, "Respuesta modelo"));
  modelo.appendChild(crear("p", null, ej.modelo));
  caja.appendChild(modelo);

  ver.addEventListener("click", () => {
    if (area.value.trim().length < 120) { api.aviso("Escribe tu versión primero, aunque salga tosca."); area.focus(); return; }
    modelo.hidden = false; ver.disabled = true; cobrar.hidden = false;
  });
  cobrar.addEventListener("click", () => { cobrar.disabled = true; api.resuelto("Escritura registrada."); });
  zona.appendChild(caja);
}

// Step by step reminder for the simulator activities.
function pasosDe(ej) {
  if (ej.pasos) return ej.pasos;
  const I = CURSO.interfaz;
  if (ej.tipo === "interfaz") {
    if (ej.ruta[0] === "pestana") {
      const p = I.pestanas.find(x => x.id === ej.ruta[1]);
      return ["Mira la fila de pestañas, debajo de la barra de menús.",
              "Toca la pestaña " + (p ? p.t : "") + "."];
    }
    if (ej.ruta[0].indexOf("codigo:") === 0) {
      const item = I.contextual.find(x => x.id === ej.ruta[1]) || {};
      return ["Busca el código " + ej.ruta[0].slice(7) + " en el árbol de códigos, en el panel izquierdo.",
              "En el programa se abre con clic derecho sobre el código. Aquí basta con tocarlo.",
              "Elige " + (item.t || "") + (item.k ? ", atajo " + item.k : "") + "."];
    }
    const menu = I.menus.find(m => m.id === ej.ruta[0]) || { items: [] };
    const item = (menu.items || []).find(x => x.id === ej.ruta[1]) || {};
    return ["Abre el menú " + (menu.nombre || "") + " en la barra de menús.",
            "Elige " + (item.t || "") + "." + (item.k ? " El atajo es " + item.k + "." : "")];
  }
  if (ej.tipo === "codificar") {
    const accion = (ej.solucion || {}).accion || "marcar";
    if (accion === "invivo") {
      return ["Selecciona en el documento el tramo cuyas palabras quieres conservar.",
              "Aplica Código in vivo, tecla V. El nombre del código sale del propio texto."];
    }
    if (accion === "anotar") {
      return ["Selecciona en el documento el tramo que quieres comentar.",
              "Aplica Anotar, tecla A. No se asigna ningún código y no entra en los informes."];
    }
    return ["Selecciona en el documento el tramo que vas a codificar.",
            "Elige el código en el árbol de códigos, en el panel izquierdo.",
            "Aplica Marcar, tecla Q."];
  }
  return null;
}

function cajaPasos(ej) {
  const pasos = pasosDe(ej);
  if (!pasos || !pasos.length) return null;
  const cont = crear("div", "instructivo");
  const btn = crear("button", "instructivo-btn", "Ver los pasos");
  const lista = crear("ol", "instructivo-lista");
  pasos.forEach(t => lista.appendChild(crear("li", null, t)));
  lista.hidden = true;
  btn.addEventListener("click", () => {
    lista.hidden = !lista.hidden;
    btn.textContent = lista.hidden ? "Ver los pasos" : "Ocultar los pasos";
  });
  cont.appendChild(btn); cont.appendChild(lista);
  return cont;
}

function cajaPista(texto) {
  const cont = crear("div");
  const btn = crear("button", "pista", "Ver pista");
  const p = crear("p", "pista-texto", texto); p.hidden = true;
  btn.addEventListener("click", () => { p.hidden = !p.hidden; btn.textContent = p.hidden ? "Ver pista" : "Ocultar pista"; });
  cont.appendChild(btn); cont.appendChild(p);
  return cont;
}

/* ---------- certificate ---------- */

function folio(nombre) {
  const base = (nombre || "sin nombre") + "|" + CURSO.titulo;
  let h = 0;
  for (let i = 0; i < base.length; i++) { h = (h * 31 + base.charCodeAt(i)) >>> 0; }
  return "QC4-" + h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7);
}

function fechaLarga() {
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const d = new Date();
  return d.getDate() + " de " + meses[d.getMonth()] + " de " + d.getFullYear();
}

function pintarConstancia() {
  mision = null;
  const zona = $("#app");
  zona.innerHTML = "";
  if (!CURSO.niveles.every(nivelCompleto)) { location.hash = ""; return; }

  const actividades = CURSO.niveles.reduce((t, n) => t + n.ejercicios.length, 0);
  const estrellas = CURSO.niveles.reduce((t, n) => t + estrellasNivel(n), 0);

  const hoja = crear("section", "constancia");
  const marco = crear("div", "constancia-marco");

  const cab = crear("header", "constancia-cabeza");
  cab.appendChild(crear("p", "constancia-tipo", "Constancia de participación"));
  cab.appendChild(crear("h1", null, CURSO.titulo));
  cab.appendChild(crear("p", "constancia-sub", "Curso de autoformación en análisis cualitativo asistido por computadora"));
  marco.appendChild(cab);

  marco.appendChild(crear("p", "constancia-formula", "Se hace constar que"));

  const nombre = document.createElement("input");
  nombre.className = "constancia-nombre";
  nombre.placeholder = "Escribe aquí tu nombre";
  nombre.value = estado.nombre || "";
  nombre.setAttribute("aria-label", "Nombre de quien recibe la constancia");
  marco.appendChild(nombre);

  const cuerpo = crear("p", "constancia-cuerpo");
  cuerpo.textContent = "concluyó las " + CURSO.niveles.length + " misiones del curso, con sus " +
    actividades + " actividades prácticas sobre el manejo de QualCoder 4 y los fundamentos del análisis " +
    "cualitativo, con una dedicación estimada de " + CURSO.duracion + ".";
  marco.appendChild(cuerpo);

  const datos = crear("ul", "constancia-datos");
  [
    ["Experiencia acumulada", estado.xp + " XP"],
    ["Insignias obtenidas", estado.insignias.length + " de " + CURSO.niveles.length],
    ["Estrellas", estrellas + " de " + (CURSO.niveles.length * 3)],
    ["Nivel alcanzado", rango().nombre]
  ].forEach(([a, b]) => {
    const li = crear("li");
    li.appendChild(crear("span", "dato-etiqueta", a));
    li.appendChild(crear("span", "dato-valor", b));
    datos.appendChild(li);
  });
  marco.appendChild(datos);

  const pie = crear("footer", "constancia-pie");
  const izq = crear("div");
  izq.appendChild(crear("span", "pie-etiqueta", "Fecha de emisión"));
  izq.appendChild(crear("span", "pie-valor", fechaLarga()));
  const der = crear("div");
  der.appendChild(crear("span", "pie-etiqueta", "Folio"));
  const cifra = crear("span", "pie-valor pie-folio", folio(estado.nombre));
  der.appendChild(cifra);
  pie.appendChild(izq); pie.appendChild(der);
  marco.appendChild(pie);

  marco.appendChild(crear("p", "constancia-nota",
    "Documento de autoformación generado por el propio sitio del curso a partir del avance registrado en este navegador. Deja constancia del trabajo realizado y no constituye una acreditación institucional."));

  nombre.addEventListener("input", () => {
    estado.nombre = nombre.value; persistir();
    cifra.textContent = folio(estado.nombre);
  });

  hoja.appendChild(marco);

  const fila = crear("div", "fila-acciones");
  const imprimir = crear("button", "accion", "Imprimir o guardar en PDF");
  imprimir.addEventListener("click", () => {
    if (!nombre.value.trim()) { nombre.focus(); avisar("Escribe tu nombre antes de imprimir."); return; }
    window.print();
  });
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(imprimir); fila.appendChild(mapa);
  hoja.appendChild(fila);

  zona.appendChild(hoja);
  pintarHud();
}

/* ---------- references ---------- */

function pintarReferencias() {
  mision = null;
  const zona = $("#app");
  zona.innerHTML = "";
  const c = crear("div", "referencias");
  c.appendChild(crear("h1", null, "Referencias"));
  c.appendChild(crear("p", null,
    "Las definiciones conceptuales de las misiones salen de estas obras. Las citas de cada misión llevan aquí."));

  c.appendChild(crear("h2", null, "Obras citadas"));
  const ol = crear("ul", "lista-referencias");
  (CURSO.bibliografia || []).forEach(r => ol.appendChild(crear("li", null, r.ref)));
  c.appendChild(ol);

  if ((CURSO.lecturas || []).length) {
    c.appendChild(crear("h2", null, "Lecturas recomendadas"));
    const ul = crear("ul", "lista-referencias");
    CURSO.lecturas.forEach(r => ul.appendChild(crear("li", null, r)));
    c.appendChild(ul);
  }

  const fila = crear("div", "fila-acciones");
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(mapa);
  c.appendChild(fila);
  zona.appendChild(c);
  pintarHud();
}

/* ---------- routing ---------- */

function enrutar() {
  const id = location.hash.replace("#", "");
  if (id === "constancia") return pintarConstancia();
  if (id === "referencias") return pintarReferencias();
  const idx = CURSO.niveles.findIndex(n => n.id === id);
  if (idx === -1) return pintarMapa();
  abrirMision(CURSO.niveles[idx], idx);
  pintarHud();
  window.scrollTo(0, 0);
}

function reiniciar() {
  if (!confirm("Esto borra tus XP, tus insignias y tus estrellas. ¿Seguimos?")) return;
  guardado.borrar();
  estado = JSON.parse(JSON.stringify(inicial));
  location.hash = "";
  enrutar();
}

window.addEventListener("hashchange", enrutar);
document.addEventListener("DOMContentLoaded", () => {
  $(".hud-titulo").textContent = CURSO.titulo;
  $(".hud-sonido").addEventListener("click", () => { estado.sonido = !estado.sonido; persistir(); pintarHud(); sonar("toque"); });
  $(".hud-mapa").addEventListener("click", () => { if (location.hash) location.hash = ""; else enrutar(); });
  $(".hud-referencias").addEventListener("click", () => { location.hash = "#referencias"; });
  $(".hud-reinicio").addEventListener("click", reiniciar);
  document.addEventListener("click", cerrarMenuAbierto);
  document.addEventListener("keydown", ev => {
    if (ev.key !== "Escape") return;
    if (lupaAbierta) return cerrarLupa();
    cerrarMenuAbierto();
  });
  enrutar();
});
