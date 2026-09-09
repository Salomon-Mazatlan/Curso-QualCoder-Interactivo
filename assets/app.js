// Game engine: progress, map, missions, lives, streak, stars and activities.

const CLAVE = "curso-qualcoder-v2";
const VIDAS = 3;

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
const nivelAbierto = i => i === 0 || nivelCompleto(CURSO.niveles[i - 1]);
const persistir = () => guardado.escribir(estado);
const xpTotal = CURSO.niveles.reduce((s, n) => s + n.ejercicios.reduce((t, e) => t + e.xp, 0), 0);

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
      vol.gain.exponentialRampToValueAtTime(0.15, audio.currentTime + i * 0.09 + 0.02);
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
  temporizador = setTimeout(() => caja.remove(), 3200);
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
  const p = crear("p", null, estado.xp === 0
    ? "Nueve misiones. En cada una tienes tres vidas, cada error cuesta una. Terminar sin fallar da tres estrellas."
    : "Rango actual " + rango().nombre + ". Retomar una misión terminada no quita ni suma XP, pero sí puede mejorar tus estrellas.");
  intro.appendChild(p);
  cont.appendChild(intro);

  const senda = crear("ol", "senda");
  CURSO.niveles.forEach((nivel, i) => {
    const abierto = nivelAbierto(i), listo = nivelCompleto(nivel);
    const li = crear("li", "nodo" + (abierto ? "" : " cerrado") + (listo ? " listo" : ""));
    const btn = crear("button", "nodo-btn");
    btn.disabled = !abierto;

    const disco = crear("span", "disco", listo ? nivel.insignia.icono : String(i + 1));
    btn.appendChild(disco);

    const bloque = crear("span", "nodo-texto");
    bloque.appendChild(crear("strong", null, nivel.titulo));
    bloque.appendChild(crear("span", "nodo-lema", abierto ? nivel.lema : "Se abre al terminar la misión anterior"));
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
    ? "Completaste las nueve misiones."
    : "Se libera al terminar las nueve misiones."));
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

function abrirMision(nivel, idx, directo) {
  const pendiente = nivel.ejercicios.findIndex((_, i) => !hecho(nivel, i));
  mision = { nivel: nivel, idx: idx, i: pendiente === -1 ? 0 : pendiente, paso: directo ? "ej" : "briefing", vidas: VIDAS, racha: 0, errores: 0, ganado: 0, nuevas: 0 };
  pintarMision();
}

function pintarMision() {
  const zona = $("#app");
  zona.innerHTML = "";
  const n = mision.nivel;

  if (mision.paso === "briefing") return zona.appendChild(pantallaBriefing(n));
  if (mision.paso === "fallo") return zona.appendChild(pantallaFallo(n));
  if (mision.paso === "fin") return zona.appendChild(pantallaFin(n));

  const marco = crear("div", "mision");
  marco.appendChild(barraMision(n));
  const ej = n.ejercicios[mision.i];
  marco.appendChild(tarjetaEjercicio(n, ej, mision.i));
  zona.appendChild(marco);
}

function pantallaBriefing(n) {
  const c = crear("div", "briefing");
  c.appendChild(crear("p", "paso", "Misión " + (mision.idx + 1) + " de " + CURSO.niveles.length));
  c.appendChild(crear("h1", null, n.titulo));
  c.appendChild(crear("p", "lema", n.lema));

  const lec = crear("div", "lectura");
  lec.innerHTML = n.lectura;
  c.appendChild(lec);
  c.appendChild(bloqueVideo(n));

  const fila = crear("div", "fila-acciones");
  const ir = crear("button", "accion", nivelCompleto(n) ? "Repasar la misión" : "Empezar la misión");
  ir.addEventListener("click", () => { sonar("toque"); mision.paso = "ej"; pintarMision(); });
  const volver = crear("button", "accion fantasma", "Volver al mapa");
  volver.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(ir); fila.appendChild(volver);
  c.appendChild(fila);
  return c;
}

function bloqueVideo(n) {
  const caja = crear("section", "video");
  caja.appendChild(crear("h2", null, n.videoTitulo || "Video de la lección"));
  if (n.video) {
    const marco = crear("div", "video-marco");
    const ifr = document.createElement("iframe");
    ifr.src = "https://www.youtube-nocookie.com/embed/" + n.video;
    ifr.title = n.videoTitulo || n.titulo;
    ifr.allowFullscreen = true; ifr.loading = "lazy";
    marco.appendChild(ifr);
    caja.appendChild(marco);
  } else {
    caja.appendChild(crear("div", "video-vacio",
      "Espacio reservado para el video. Se activa poniendo el identificador de YouTube en el campo video de esta misión, dentro de assets/contenido.js"));
  }
  return caja;
}

function barraMision(n) {
  const b = crear("div", "barra-mision");

  const izq = crear("div", "vidas");
  for (let v = 0; v < VIDAS; v++) izq.appendChild(crear("span", "vida" + (v < mision.vidas ? " viva" : ""), "♥"));
  b.appendChild(izq);

  const puntos = crear("div", "puntos-mision");
  n.ejercicios.forEach((_, i) => {
    puntos.appendChild(crear("span", "punto" + (i < mision.i ? " hecho" : i === mision.i ? " ahora" : "")));
  });
  b.appendChild(puntos);

  const der = crear("div", "racha", mision.racha >= 2 ? "Racha " + mision.racha + " ✦" : "");
  b.appendChild(der);
  return b;
}

const NOMBRE_TIPO = {
  quiz: "Decisión", parejas: "Parejas", secuencia: "Secuencia", codificar: "Codificación",
  clasificar: "Clasificación", abierta: "Escritura", interfaz: "Simulador", dialogo: "Ventana"
};

function tarjetaEjercicio(nivel, ej, idx) {
  const caja = crear("section", "ejercicio");
  const cabeza = crear("div", "ejercicio-cabeza");
  cabeza.appendChild(crear("span", "ejercicio-tipo", NOMBRE_TIPO[ej.tipo] || ""));
  cabeza.appendChild(crear("span", "ejercicio-xp", ej.xp + " XP"));
  caja.appendChild(cabeza);
  caja.appendChild(crear("p", "enunciado", ej.pregunta || ej.instruccion));

  const cuerpo = crear("div", "cuerpo-ejercicio");
  caja.appendChild(cuerpo);

  const pie = crear("div", "pie-ejercicio");
  caja.appendChild(pie);

  let errores = 0, cerrado = false;
  const api = {
    fallo(mensaje) {
      if (cerrado) return;
      errores++; mision.errores++; mision.racha = 0; mision.vidas--;
      sonar("mal");
      const marco = $(".mision");
      if (marco) { marco.classList.add("golpe"); setTimeout(() => marco.classList.remove("golpe"), 400); }
      if (mensaje) avisar(mensaje, "malo");
      const barra = $(".barra-mision");
      if (barra) barra.replaceWith(barraMision(nivel));
      if (mision.vidas <= 0) { cerrado = true; setTimeout(() => { mision.paso = "fallo"; pintarMision(); }, 700); }
    },
    resuelto(mensaje) {
      if (cerrado) return;
      cerrado = true;
      sonar("bien");
      const estrellas = errores === 0 ? 3 : errores === 1 ? 2 : 1;
      const previo = estado.hechos[clave(nivel, idx)];
      if (previo === undefined) {
        const gana = errores === 0 ? ej.xp : Math.ceil(ej.xp / 2);
        estado.xp += gana; mision.ganado += gana; mision.nuevas++;
        estado.hechos[clave(nivel, idx)] = estrellas;
        mision.racha++;
        if (mision.racha > 0 && mision.racha % 3 === 0) {
          estado.xp += 5; mision.ganado += 5;
          avisar("Racha de " + mision.racha + ", <b>+5 XP</b>", "bueno");
        }
      } else {
        estado.hechos[clave(nivel, idx)] = Math.max(previo, estrellas);
        mision.racha++;
      }
      persistir(); pintarHud();
      const barra = $(".barra-mision");
      if (barra) barra.replaceWith(barraMision(nivel));
      mostrarResultado(pie, mensaje || ej.dice, estrellas, nivel);
    }
  };

  ({
    quiz: montarQuiz, parejas: montarParejas, secuencia: montarSecuencia, codificar: montarCodificar,
    clasificar: montarClasificar, abierta: montarAbierta, interfaz: montarInterfaz, dialogo: montarDialogo
  })[ej.tipo](cuerpo, ej, api);

  return caja;
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
  btn.addEventListener("click", () => {
    if (mision.i + 1 < nivel.ejercicios.length) { mision.i++; pintarMision(); }
    else { cerrarMision(nivel); }
  });
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

  const tabla = crear("ul", "marcador");
  [
    ["XP ganado en esta misión", mision.ganado],
    ["Errores", mision.errores],
    ["Vidas restantes", Math.max(0, mision.vidas)],
    ["XP total", estado.xp]
  ].forEach(([a, b]) => {
    const li = crear("li");
    li.appendChild(crear("span", null, a));
    li.appendChild(crear("b", null, String(b)));
    tabla.appendChild(li);
  });
  c.appendChild(tabla);

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
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(mapa);
  c.appendChild(fila);
  return c;
}

function pantallaFallo(n) {
  const c = crear("div", "resultados fallo");
  c.appendChild(crear("h1", null, "Se acabaron las vidas"));
  c.appendChild(crear("p", null,
    "Nada se perdió. Los ejercicios que ya resolviste siguen contando, vuelve a entrar y retoma desde donde te quedaste."));
  const fila = crear("div", "fila-acciones");
  const otra = crear("button", "accion", "Reintentar la misión");
  otra.addEventListener("click", () => { abrirMision(n, mision.idx, true); });
  const rep = crear("button", "accion fantasma", "Releer la lección");
  rep.addEventListener("click", () => { abrirMision(n, mision.idx); });
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(otra); fila.appendChild(rep); fila.appendChild(mapa);
  c.appendChild(fila);
  return c;
}

/* ---------- activity: quiz ---------- */

function montarQuiz(zona, ej, api) {
  const lista = crear("div", "opciones");
  const dice = crear("div", "dice"); dice.hidden = true;
  revolver(ej.opciones.slice()).forEach(op => {
    const btn = crear("button", "opcion", op.t);
    btn.addEventListener("click", () => {
      if (btn.disabled) return;
      dice.hidden = false; dice.textContent = op.dice;
      dice.classList.toggle("mal", !op.ok);
      btn.classList.add(op.ok ? "bien" : "mal");
      if (op.ok) { lista.querySelectorAll("button").forEach(b => b.disabled = true); api.resuelto(); }
      else { btn.disabled = true; api.fallo("Respuesta incorrecta"); }
    });
    lista.appendChild(btn);
  });
  zona.appendChild(lista); zona.appendChild(dice);
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

/* ---------- activity: codificar ---------- */

function montarCodificar(zona, ej, api) {
  let seleccion = new Set(), cerrado = false;
  const texto = crear("p", "transcripcion");
  const paleta = crear("div", "paleta");

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
    b.appendChild(punto); b.appendChild(crear("span", null, c.nombre));
    b.addEventListener("click", () => {
      if (cerrado) return;
      if (seleccion.size === 0) { avisar("Primero marca el fragmento en el texto."); return; }
      const tramoOk = ej.solucion.segmentos.length === seleccion.size && ej.solucion.segmentos.every(i => seleccion.has(i));
      const codigoOk = c.id === ej.solucion.codigo;
      if (tramoOk && codigoOk) {
        cerrado = true;
        texto.querySelectorAll(".seg").forEach((s, i) => {
          s.classList.remove("sel"); s.classList.add("bloqueado");
          if (seleccion.has(i)) { s.classList.add("pintado"); s.style.background = tinte(CURSO.paleta[c.color] || c.color, .55); }
        });
        paleta.querySelectorAll("button").forEach(x => x.disabled = true);
        api.resuelto("Segmento marcado. Así queda en Codificar texto (Code text), con el color del código.");
      } else if (tramoOk) {
        api.fallo("El tramo está bien elegido, el código no.");
      } else {
        api.fallo("Revisa el tramo, el sentido queda incompleto o de más.");
      }
    });
    paleta.appendChild(b);
  });

  zona.appendChild(texto);
  zona.appendChild(paleta);
  if (ej.pista) zona.appendChild(cajaPista(ej.pista));
}

function cajaPista(texto) {
  const cont = crear("div");
  const btn = crear("button", "pista", "Ver pista");
  const p = crear("p", "pista-texto", texto); p.hidden = true;
  btn.addEventListener("click", () => { p.hidden = !p.hidden; btn.textContent = p.hidden ? "Ver pista" : "Ocultar pista"; });
  cont.appendChild(btn); cont.appendChild(p);
  return cont;
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
        if (colocados === ej.items.length) api.resuelto("Sistema armado. Así se vería el árbol de códigos.");
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
    if (area.value.trim().length < 120) { avisar("Escribe tu versión primero, aunque salga tosca."); area.focus(); return; }
    modelo.hidden = false; ver.disabled = true; cobrar.hidden = false;
  });
  cobrar.addEventListener("click", () => { cobrar.disabled = true; api.resuelto("Escritura registrada."); });
  zona.appendChild(caja);
}

/* ---------- activity: interfaz ---------- */

function montarInterfaz(zona, ej, api) {
  let cerrado = false, abierto = null, codigoAbierto = null;
  const esperaContextual = ej.ruta[0].indexOf("codigo:") === 0;
  const codigoObjetivo = esperaContextual ? ej.ruta[0].slice(7) : null;

  const ventana = crear("div", "qc");
  const titulo = crear("div", "qc-titulo");
  titulo.appendChild(crear("span", "qc-puntos", "●●●"));
  titulo.appendChild(crear("span", null, "QualCoder 4  ·  " + CURSO.interfaz.proyecto));
  ventana.appendChild(titulo);

  const barra = crear("div", "qc-menu");
  const capa = crear("div", "qc-desplegable"); capa.hidden = true;

  function cerrarMenus() { capa.hidden = true; abierto = null; barra.querySelectorAll("button").forEach(b => b.classList.remove("abierto")); }

  CURSO.interfaz.menus.forEach(menu => {
    const b = crear("button", "qc-menu-btn", menu.nombre);
    b.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (cerrado) return;
      if (abierto === menu.id) { cerrarMenus(); return; }
      cerrarMenus();
      abierto = menu.id; codigoAbierto = null;
      b.classList.add("abierto");
      capa.innerHTML = ""; capa.hidden = false;
      capa.style.left = b.offsetLeft + "px";
      capa.style.top = (b.offsetTop + b.offsetHeight) + "px";
      menu.items.forEach(item => {
        const opcion = crear("button", "qc-item", item.t);
        opcion.addEventListener("click", (e2) => {
          e2.stopPropagation();
          if (cerrado) return;
          if (!esperaContextual && menu.id === ej.ruta[0] && item.id === ej.ruta[1]) {
            cerrado = true; cerrarMenus();
            ventana.classList.add("qc-listo");
            api.resuelto(ej.dice);
          } else {
            cerrarMenus();
            api.fallo("Eso abre " + item.t.split(" (")[0] + ", no es lo que se pidió.");
          }
        });
        capa.appendChild(opcion);
      });
    });
    barra.appendChild(b);
  });
  ventana.appendChild(barra);
  ventana.appendChild(capa);

  const cuerpo = crear("div", "qc-cuerpo");

  const panel = crear("div", "qc-panel");
  panel.appendChild(crear("h4", null, "Códigos"));
  const arbol = crear("ul", "qc-arbol");
  CURSO.interfaz.codigos.forEach(c => {
    const li = crear("li");
    const b = crear("button", "qc-codigo");
    const punto = crear("span", "punto");
    punto.style.background = CURSO.paleta[c.color];
    b.appendChild(punto); b.appendChild(crear("span", null, c.nombre));
    b.addEventListener("click", (ev) => {
      ev.stopPropagation();
      if (cerrado) return;
      cerrarMenus();
      codigoAbierto = c.nombre;
      capa.innerHTML = ""; capa.hidden = false;
      capa.style.left = (b.offsetLeft + 20) + "px";
      capa.style.top = (b.offsetTop + panel.offsetTop + b.offsetHeight + barra.offsetHeight) + "px";
      CURSO.interfaz.contextual.forEach(item => {
        const opcion = crear("button", "qc-item", item.t);
        opcion.addEventListener("click", (e2) => {
          e2.stopPropagation();
          if (cerrado) return;
          if (esperaContextual && codigoAbierto === codigoObjetivo && item.id === ej.ruta[1]) {
            cerrado = true; cerrarMenus();
            ventana.classList.add("qc-listo");
            api.resuelto(ej.dice);
          } else if (esperaContextual && codigoAbierto !== codigoObjetivo) {
            cerrarMenus();
            api.fallo("Estás operando sobre " + codigoAbierto + ", revisa sobre qué código hay que actuar.");
          } else {
            cerrarMenus();
            api.fallo(item.t + " no resuelve lo que se pidió.");
          }
        });
        capa.appendChild(opcion);
      });
    });
    li.appendChild(b);
    arbol.appendChild(li);
  });
  panel.appendChild(arbol);
  cuerpo.appendChild(panel);

  const doc = crear("div", "qc-doc");
  const pestanas = crear("div", "qc-pestanas");
  CURSO.interfaz.archivos.forEach((a, i) => pestanas.appendChild(crear("span", "qc-pestana" + (i === 0 ? " activa" : ""), a)));
  doc.appendChild(pestanas);
  doc.appendChild(crear("p", "qc-texto", CURSO.interfaz.fragmento));
  cuerpo.appendChild(doc);

  ventana.appendChild(cuerpo);
  ventana.appendChild(crear("div", "qc-estado", "Objetivo, " + ej.objetivo));
  ventana.addEventListener("click", cerrarMenus);

  zona.appendChild(ventana);
  if (ej.pista) zona.appendChild(cajaPista(ej.pista));
}

/* ---------- activity: dialogo ---------- */

function montarDialogo(zona, ej, api) {
  const ventana = crear("div", "qc dialogo");
  const titulo = crear("div", "qc-titulo");
  titulo.appendChild(crear("span", "qc-puntos", "●●●"));
  titulo.appendChild(crear("span", null, ej.titulo));
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
  cancelar.addEventListener("click", () => avisar("Cancelar cierra la ventana sin guardar nada."));
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
    if (malos.length) {
      api.fallo("Revisa el campo " + malos[0].etiqueta.toLowerCase() + ".");
      return;
    }
    aceptar.disabled = true; cancelar.disabled = true;
    Object.keys(controles).forEach(k => controles[k].disabled = true);
    ventana.classList.add("qc-listo");
    api.resuelto(ej.dice);
  });
  pie.appendChild(cancelar); pie.appendChild(aceptar);
  ventana.appendChild(pie);
  zona.appendChild(ventana);
}

/* ---------- certificate ---------- */

function pintarConstancia() {
  mision = null;
  const zona = $("#app");
  zona.innerHTML = "";
  if (!CURSO.niveles.every(nivelCompleto)) { location.hash = ""; return; }

  const caja = crear("section", "constancia");
  caja.appendChild(crear("h1", null, "Constancia de participación"));
  caja.appendChild(crear("p", null, "acredita haber completado las nueve misiones del curso " + CURSO.titulo));

  const nombre = document.createElement("input");
  nombre.placeholder = "Escribe tu nombre";
  nombre.value = estado.nombre || "";
  nombre.addEventListener("input", () => { estado.nombre = nombre.value; persistir(); });
  caja.appendChild(nombre);

  const totalEstrellas = CURSO.niveles.reduce((s, n) => s + estrellasNivel(n), 0);
  caja.appendChild(crear("p", "cifras", estado.xp + " XP · " + estado.insignias.length + " insignias · " +
    totalEstrellas + " de " + (CURSO.niveles.length * 3) + " estrellas · rango " + rango().nombre));
  caja.appendChild(crear("p", null, CURSO.autoria));

  const fila = crear("div", "fila-acciones");
  const imprimir = crear("button", "accion", "Imprimir o guardar en PDF");
  imprimir.addEventListener("click", () => window.print());
  const mapa = crear("button", "accion fantasma", "Volver al mapa");
  mapa.addEventListener("click", () => { location.hash = ""; });
  fila.appendChild(imprimir); fila.appendChild(mapa);
  caja.appendChild(fila);
  zona.appendChild(caja);
  pintarHud();
}

/* ---------- routing ---------- */

function enrutar() {
  const id = location.hash.replace("#", "");
  if (id === "constancia") return pintarConstancia();
  const idx = CURSO.niveles.findIndex(n => n.id === id);
  if (idx === -1) return pintarMapa();
  if (!nivelAbierto(idx)) { avisar("Esa misión todavía está cerrada.", "malo"); location.hash = ""; return; }
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
  $(".hud-mapa").addEventListener("click", () => { location.hash = ""; if (!location.hash) enrutar(); });
  $(".hud-reinicio").addEventListener("click", reiniciar);
  enrutar();
});
