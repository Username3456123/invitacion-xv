// Lógica de la invitación. Los textos y datos se cambian en datos.js.
(() => {
  "use strict";

  const D = INVITACION;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];
  const crear = (tag, clase, texto) => {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  };
  const poner = (sel, texto) => {
    const el = $(sel);
    el.textContent = texto || "";
    el.hidden = !texto;
  };
  const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const marco = $("#marco");
  const app = $("#app");
  let puntajeQuiz = "";

  // Invitación con nombre: index.html?para=Familia%20Pérez&pases=4
  const params = new URLSearchParams(location.search);
  const invitado = (params.get("para") || "").trim().slice(0, 60);
  const pasesUrl = parseInt(params.get("pases"), 10);
  const pasesMax = pasesUrl > 0 ? Math.min(pasesUrl, 30) : Math.max(1, D.confirmar.pasesMaximos || 1);

  /* ---------- Textos ---------- */
  $$("[data-dato=nombre]").forEach((el) => (el.textContent = D.nombre));
  document.title = `Mis XV años · ${D.nombre}`;
  poner("#bendicion", D.bendicion);
  poner("#frase", D.frase);
  poner("#despedida-frase", D.despedida);
  if (invitado) {
    poner("#invitado", `Para: ${invitado}`);
    poner("#sobre-para", `Para: ${invitado}`);
  }

  // Portada: foto en el arco y monograma
  const inicial = (D.monograma || D.nombre || "").trim().charAt(0).toUpperCase();
  $("#monograma").textContent = inicial;
  $("#sello span").textContent = inicial || "XV";
  if (D.fotoPortada) {
    const foto = $("#foto-portada");
    foto.src = D.fotoPortada;
    foto.alt = `Foto de ${D.nombre}`;
  } else {
    $("#arco").classList.add("sin-foto");
  }

  function nombresEnLineas(el, lista) {
    el.replaceChildren();
    (lista || []).forEach((n, i) => {
      if (i) el.append(crear("br"));
      el.append(n);
    });
  }
  nombresEnLineas($("#padres"), D.padres);
  nombresEnLineas($("#padrinos"), D.padrinos);
  $("#bloque-padres").hidden = !(D.padres || []).length;
  $("#bloque-padrinos").hidden = !(D.padrinos || []).length;
  const bloques = [D.padres, D.padrinos].filter((l) => (l || []).length).length;
  $("#familia").hidden = bloques === 0;
  $("#familia").classList.toggle("uno", bloques === 1);

  /* ---------- Fecha y conteo ---------- */
  const fecha = new Date(D.fechaHora);
  const objetivo = fecha.getTime();
  const tz = D.zonaHoraria;
  const mayuscula = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  if (!isNaN(objetivo)) {
    const larga = new Intl.DateTimeFormat("es-MX", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz,
    }).format(fecha);
    const hora = new Intl.DateTimeFormat("es-MX", {
      hour: "numeric", minute: "2-digit", hour12: true, timeZone: tz,
    }).format(fecha);
    const partes = Object.fromEntries(
      new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: tz })
        .formatToParts(fecha)
        .map((p) => [p.type, p.value])
    );
    $("#fecha-larga").textContent = mayuscula(larga.replace(",", ""));
    $("#hora-larga").textContent = hora;
    $$("[data-dato=fecha-corta]").forEach((el) => (el.textContent = `${partes.day} · ${partes.month} · ${partes.year}`));
    $("#calendario").href = enlaceCalendario();
  } else {
    console.warn("La fecha de datos.js no se entiende:", D.fechaHora);
  }

  function enlaceCalendario() {
    const formato = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const fin = new Date(objetivo + (D.duracionHoras || 6) * 3600 * 1000);
    const c = D.ceremonia;
    const r = D.recepcion;
    const primero = c ? { lugar: c.templo, direccion: c.direccion } : r || {};
    const detalles = [
      c && `${c.hora} · ${c.tipo || "Ceremonia religiosa"}: ${c.templo}, ${c.direccion}`,
      r && `${r.hora} · Recepción: ${r.lugar}, ${r.direccion}`,
    ].filter(Boolean).join("\n");
    const datos = new URLSearchParams({
      action: "TEMPLATE",
      text: `XV años de ${D.nombre}`,
      dates: `${formato(fecha)}/${formato(fin)}`,
      location: [primero.lugar, primero.direccion].filter(Boolean).join(", "),
      details: `${detalles}\n\n${location.href.split("?")[0]}`,
    });
    return `https://calendar.google.com/calendar/render?${datos}`;
  }

  const unidades = Object.fromEntries($$("#conteo-numeros .num").map((el) => [el.dataset.u, el]));
  function ponerNumero(u, valor) {
    const el = unidades[u];
    const texto = String(valor).padStart(2, "0");
    if (el.textContent === texto) return;
    el.textContent = texto;
    el.classList.remove("cambia");
    void el.offsetWidth; // reinicia la animación
    el.classList.add("cambia");
  }
  let reloj = 0;
  function tic() {
    if (isNaN(objetivo)) return;
    const resta = objetivo - Date.now();
    if (resta <= 0) {
      clearInterval(reloj);
      $("#conteo-numeros").classList.add("termino");
      $("#conteo-titulo").textContent = resta > -(D.duracionHoras || 6) * 3600 * 1000
        ? "¡Hoy es el gran día!"
        : "¡Gracias por celebrar conmigo!";
      return;
    }
    const s = Math.floor(resta / 1000);
    ponerNumero("dias", Math.floor(s / 86400));
    ponerNumero("horas", Math.floor((s % 86400) / 3600));
    ponerNumero("minutos", Math.floor((s % 3600) / 60));
    ponerNumero("segundos", s % 60);
  }
  tic();
  reloj = setInterval(tic, 1000);

  /* ---------- Ceremonia religiosa y recepción ---------- */
  function pintarEvento(id, ev, lugar) {
    const seccion = $(`#${id}`);
    if (!ev || !lugar) {
      seccion.remove();
      return;
    }
    const campo = (k) => $(`[data-ev=${k}]`, seccion);
    const ponerEv = (k, texto) => {
      campo(k).textContent = texto || "";
      campo(k).hidden = !texto;
    };
    ponerEv("tipo", ev.tipo);
    ponerEv("lugar", lugar);
    ponerEv("hora", ev.hora);
    ponerEv("direccion", ev.direccion);
    ponerEv("nota", ev.nota);
    campo("mapa").href = ev.mapa || "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent([lugar, ev.direccion].filter(Boolean).join(", "));
  }
  pintarEvento("ceremonia", D.ceremonia, D.ceremonia && D.ceremonia.templo);
  pintarEvento("recepcion", D.recepcion, D.recepcion && D.recepcion.lugar);

  /* ---------- Itinerario ---------- */
  const itinerario = D.itinerario || [];
  if (itinerario.length) {
    const linea = $("#linea-tiempo");
    itinerario.forEach((paso) => {
      const li = crear("li", "aparece");
      li.append(crear("span", "lt-hora", paso.hora), crear("span", "lt-punto"), crear("span", "lt-que", paso.que));
      linea.append(li);
    });
  } else {
    $("#itinerario").remove();
  }

  /* ---------- Regalos ---------- */
  const R = D.regalos;
  if (R) {
    poner("#regalos-texto", R.texto);
    const mesas = $("#mesas");
    (R.mesas || []).forEach((m) => {
      const t = crear("div", "mesa");
      t.append(crear("p", "mesa-tienda", m.tienda));
      if (m.numero) t.append(crear("p", "mesa-numero", m.numero));
      if (m.enlace) {
        const a = crear("a", "boton secundario", "Ver mesa de regalos");
        a.href = m.enlace;
        a.target = "_blank";
        a.rel = "noopener";
        t.append(a);
      }
      mesas.append(t);
    });
    mesas.hidden = !(R.mesas || []).length;
  } else {
    $("#regalos").remove();
  }

  /* ---------- Fotos ---------- */
  const pista = $("#pista");
  const puntitos = $("#puntitos");
  const flechaIzq = $("#carrusel .izq");
  const flechaDer = $("#carrusel .der");
  const fotos = D.fotos || [];
  fotos.forEach((f, i) => {
    const fig = crear("figure");
    const img = crear("img");
    img.src = f.src;
    img.alt = f.texto || `Foto ${i + 1} de ${D.nombre}`;
    img.loading = i === 0 ? "eager" : "lazy";
    img.draggable = false;
    fig.append(img);
    if (f.texto) fig.append(crear("figcaption", "", f.texto));
    pista.append(fig);
    const p = crear("button");
    p.type = "button";
    p.setAttribute("aria-label", `Ver foto ${i + 1}`);
    p.addEventListener("click", () => irAFoto(i, true));
    puntitos.append(p);
  });
  if (fotos.length < 2) $$("#carrusel .flecha, #puntitos").forEach((el) => (el.hidden = true));
  if (!fotos.length) $("#galeria").remove();

  let fotoActual = 0;
  let pausaHasta = 0;
  const anchoFoto = () => Math.max(1, pista.getBoundingClientRect().width);
  function irAFoto(i, porUsuario) {
    if (!fotos.length) return;
    fotoActual = (i + fotos.length) % fotos.length;
    pista.scrollTo({ left: fotoActual * anchoFoto(), behavior: sinMovimiento ? "auto" : "smooth" });
    if (porUsuario) pausaHasta = Date.now() + 8000;
  }
  function marcarFoto() {
    const i = Math.round(pista.scrollLeft / anchoFoto());
    fotoActual = i;
    $$("button", puntitos).forEach((b, n) => b.classList.toggle("activo", n === i));
  }
  pista.addEventListener("scroll", marcarFoto, { passive: true });
  pista.addEventListener("pointerdown", () => (pausaHasta = Date.now() + 8000));
  pista.addEventListener("touchstart", () => (pausaHasta = Date.now() + 8000), { passive: true });
  flechaIzq.addEventListener("click", () => irAFoto(fotoActual - 1, true));
  flechaDer.addEventListener("click", () => irAFoto(fotoActual + 1, true));
  marcarFoto();

  /* ---------- Quiz ---------- */
  const Q = D.quiz || {};
  const preguntas = Q.preguntas || [];
  const caja = $("#quiz-caja");
  const limpiar = (t) => String(t).trim().toLowerCase();
  $("#quiz-titulo").textContent = Q.titulo || "Quiz";
  let pregunta = 0;
  let aciertos = 0;

  function quizInicio() {
    caja.replaceChildren(crear("p", "texto", Q.intro || ""));
    const b = crear("button", "boton", "Empezar");
    b.type = "button";
    b.addEventListener("click", () => {
      pregunta = 0;
      aciertos = 0;
      quizPregunta();
    });
    caja.append(b);
  }
  function quizPregunta() {
    const p = preguntas[pregunta];
    caja.replaceChildren();
    caja.append(crear("p", "quiz-cuenta", `Pregunta ${pregunta + 1} de ${preguntas.length}`));
    const barra = crear("div", "quiz-barra");
    const relleno = crear("span");
    relleno.style.width = `${(pregunta / preguntas.length) * 100}%`;
    barra.append(relleno);
    caja.append(barra);
    caja.append(crear("p", "quiz-pregunta", p.pregunta));
    const botones = p.opciones.map((texto, n) => {
      const b = crear("button", "opcion");
      b.type = "button";
      b.append(crear("span", "letra", "ABCDEF"[n]), crear("span", "", texto));
      b.addEventListener("click", () => quizResponder(b, texto, botones, p));
      caja.append(b);
      return b;
    });
    requestAnimationFrame(() => (relleno.style.width = `${((pregunta + 1) / preguntas.length) * 100}%`));
  }
  function quizResponder(boton, texto, botones, p) {
    const bien = limpiar(texto) === limpiar(p.correcta);
    botones.forEach((b, n) => {
      b.disabled = true;
      if (limpiar(p.opciones[n]) === limpiar(p.correcta)) b.classList.add("correcta");
    });
    if (bien) aciertos++;
    else boton.classList.add("incorrecta");
    setTimeout(() => {
      pregunta++;
      if (pregunta < preguntas.length) quizPregunta();
      else quizResultado();
    }, 1100);
  }
  function quizResultado() {
    const total = preguntas.length;
    const r = Q.resultados || {};
    const mensaje = aciertos === total ? r.todas : aciertos >= Math.ceil(total * 0.6) ? r.muchas : r.pocas;
    puntajeQuiz = `${aciertos}/${total}`;
    caja.replaceChildren(
      crear("p", "quiz-cuenta", "Tu resultado"),
      crear("p", "quiz-puntaje", puntajeQuiz),
      crear("p", "quiz-mensaje", mensaje || "")
    );
    const otra = crear("button", "boton secundario", "Jugar otra vez");
    otra.type = "button";
    otra.addEventListener("click", () => {
      pregunta = 0;
      aciertos = 0;
      quizPregunta();
    });
    caja.append(otra);
  }
  if (preguntas.length) quizInicio();
  else $("#quiz").remove();

  /* ---------- Código de vestimenta ---------- */
  const V = D.vestimenta || {};
  poner("#vestimenta-tipo", V.tipo);
  poner("#vestimenta-nota", V.nota);
  const reservados = $("#reservados");
  const colores = V.coloresReservados || [];
  if (colores.length) {
    reservados.append(crear("p", "etiqueta reservados-titulo", "Color reservado"));
    colores.forEach((c) => {
      const r = crear("div", "reservado");
      const muestra = crear("i");
      muestra.style.background = c.color;
      r.append(muestra, crear("span", "", c.nombre));
      reservados.append(r);
    });
  } else {
    reservados.hidden = true;
  }

  /* ---------- Confirmar asistencia ---------- */
  const C = D.confirmar || {};
  const numero = String(C.whatsapp || "").replace(/\D/g, "");
  const form = $("#formulario");
  poner("#fecha-limite", C.fechaLimite ? `Por favor confirma antes del ${C.fechaLimite}.` : "");
  if (pasesUrl > 0) {
    poner("#pases-texto", pasesMax === 1 ? "Tenemos 1 lugar reservado para ti." : `Tenemos ${pasesMax} lugares reservados para ti.`);
  }

  if (!numero) {
    form.hidden = true;
    if (C.formulario) {
      const b = $("#boton-formulario");
      b.href = C.formulario;
      b.hidden = false;
    }
  } else {
    let personas = 1;
    const salida = $("#personas");
    const menos = $("#menos");
    const mas = $("#mas");
    const nombre = $("#rsvp-nombre");
    if (invitado) nombre.value = invitado;
    $("#etiqueta-mensaje").textContent = `Un mensaje para ${D.nombre} (opcional)`;
    $("#pases-max").textContent = pasesMax > 1 ? `de ${pasesMax}` : "";
    const pintarPersonas = () => {
      salida.textContent = personas;
      menos.disabled = personas <= 1;
      mas.disabled = personas >= pasesMax;
    };
    menos.addEventListener("click", () => { personas = Math.max(1, personas - 1); pintarPersonas(); });
    mas.addEventListener("click", () => { personas = Math.min(pasesMax, personas + 1); pintarPersonas(); });
    pintarPersonas();
    if (pasesMax === 1) $("#campo-personas").hidden = true;

    const asiste = () => form.elements.asiste.value === "si";
    form.addEventListener("change", () => {
      $("#campo-personas").hidden = !asiste() || pasesMax === 1;
    });
    nombre.addEventListener("input", () => {
      nombre.closest(".campo").classList.remove("mal");
      $("#rsvp-error").hidden = true;
    });

    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const quien = nombre.value.trim();
      if (quien.length < 2) {
        nombre.closest(".campo").classList.add("mal");
        $("#rsvp-error").hidden = false;
        nombre.focus();
        return;
      }
      const mensaje = $("#rsvp-mensaje").value.trim();
      const lineas = asiste()
        ? [
            `¡Hola! Soy ${quien} y confirmo mi asistencia a los XV años de ${D.nombre}. 🎉`,
            `Asistiremos: ${personas} ${personas === 1 ? "persona" : "personas"}.`,
          ]
        : [`¡Hola! Soy ${quien}. Lamentablemente no podré asistir a los XV años de ${D.nombre}. ¡Muchas felicidades!`];
      if (mensaje) lineas.push(`Mensaje: ${mensaje}`);
      if (puntajeQuiz) lineas.push(`En el quiz saqué ${puntajeQuiz} 😄`);
      window.open(`https://wa.me/${numero}?text=${encodeURIComponent(lineas.join("\n"))}`, "_blank", "noopener");
      $("#rsvp-enviado").hidden = false;
    });
  }

  /* ---------- Música ---------- */
  const Musica = (() => {
    const modo = D.musica;
    const boton = $("#boton-musica");
    let audio = null;
    let ctx = null;
    let encendida = false; // lo que eligió la persona

    // Melodía de prueba hecha con el navegador (cajita musical)
    const ACORDES = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]];
    const PATRON = [0, 2, 3, 4, 5, 4, 3, 2];
    const CORCHEA = 60 / 80 / 2;
    let salida = null;
    let siguiente = 0;
    let paso = 0;

    function nota(midi, cuando, dura, volumen) {
      const f = 440 * Math.pow(2, (midi - 69) / 12);
      const o1 = ctx.createOscillator();
      const o2 = ctx.createOscillator();
      const g = ctx.createGain();
      const g2 = ctx.createGain();
      o1.type = "triangle";
      o1.frequency.value = f;
      o2.type = "sine";
      o2.frequency.value = f * 2;
      g2.gain.value = 0.25;
      g.gain.setValueAtTime(0.0001, cuando);
      g.gain.exponentialRampToValueAtTime(volumen, cuando + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, cuando + dura);
      o1.connect(g);
      o2.connect(g2);
      g2.connect(g);
      g.connect(salida);
      o1.start(cuando);
      o2.start(cuando);
      o1.stop(cuando + dura + 0.05);
      o2.stop(cuando + dura + 0.05);
    }
    function programar() {
      while (siguiente < ctx.currentTime + 0.15) {
        const acorde = ACORDES[Math.floor(paso / 8) % ACORDES.length];
        const tonos = [...acorde, ...acorde.map((n) => n + 12)];
        nota(tonos[PATRON[paso % 8]], siguiente, 1.4, 0.5);
        if (paso % 8 === 0) nota(acorde[0] - 12, siguiente, 2.6, 0.35);
        siguiente += CORCHEA;
        paso++;
      }
    }
    function iniciarDemo() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      salida = ctx.createGain();
      salida.gain.value = 0.11;
      const eco = ctx.createDelay();
      const vuelta = ctx.createGain();
      const mojado = ctx.createGain();
      eco.delayTime.value = 0.32;
      vuelta.gain.value = 0.28;
      mojado.gain.value = 0.35;
      salida.connect(ctx.destination);
      salida.connect(eco);
      eco.connect(vuelta);
      vuelta.connect(eco);
      eco.connect(mojado);
      mojado.connect(ctx.destination);
      siguiente = ctx.currentTime + 0.1;
      setInterval(programar, 30);
      return true;
    }

    function pintar(sonando) {
      boton.classList.toggle("sonando", sonando);
      boton.setAttribute("aria-label", sonando ? "Pausar música" : "Poner música");
    }
    function sonar() {
      if (audio) audio.play().catch(() => pintar(false));
      if (ctx) ctx.resume();
      pintar(true);
    }
    function callar() {
      if (audio) audio.pause();
      if (ctx) ctx.suspend();
      pintar(false);
    }

    function iniciar() {
      if (!modo) return;
      if (modo === "demo") {
        if (!iniciarDemo()) return;
      } else {
        audio = new Audio(modo);
        audio.loop = true;
        audio.volume = 0.6;
        audio.addEventListener("error", () => (boton.hidden = true));
      }
      boton.hidden = false;
      encendida = true;
      sonar();
    }
    boton.addEventListener("click", () => {
      encendida = !encendida;
      encendida ? sonar() : callar();
    });
    // Si la persona cambia a WhatsApp u otra app, la música se pausa
    document.addEventListener("visibilitychange", () => {
      if (!encendida) return;
      document.hidden ? callar() : sonar();
    });
    return { iniciar };
  })();

  /* ---------- Brillitos ---------- */
  $$(".brillos").forEach((caja) => {
    for (let i = 0; i < 14; i++) {
      const b = crear("span", "brillo");
      b.style.left = `${Math.random() * 100}%`;
      b.style.top = `${20 + Math.random() * 75}%`;
      b.style.setProperty("--t", `${2 + Math.random() * 3}px`);
      b.style.setProperty("--dur", `${5 + Math.random() * 5}s`);
      b.style.setProperty("--del", `${-Math.random() * 8}s`);
      caja.append(b);
    }
  });

  /* ---------- Puntitos de secciones y animación al llegar ---------- */
  const vivas = $$(".pantalla"); // sin las que se quitaron (sin fotos o sin quiz)
  vivas.forEach((s) => $$(".aparece", s).forEach((el, n) => el.style.setProperty("--i", n)));
  const nav = $("#puntos");
  const botonesNav = vivas.map((s) => {
    const b = crear("button");
    b.type = "button";
    b.setAttribute("aria-label", s.dataset.titulo);
    b.addEventListener("click", () => s.scrollIntoView({ behavior: sinMovimiento ? "auto" : "smooth" }));
    nav.append(b);
    return b;
  });
  let galeriaVisible = false;
  function vigilar() {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.target.id === "galeria") galeriaVisible = e.intersectionRatio >= 0.5;
          if (e.intersectionRatio < 0.5) return;
          e.target.classList.add("vista");
          const n = vivas.indexOf(e.target);
          botonesNav.forEach((b, i) => b.classList.toggle("activo", i === n));
          marco.dataset.tema = e.target.classList.contains("tema-oscuro") ? "oscuro" : "claro";
        });
      },
      { root: app, threshold: [0, 0.5] }
    );
    vivas.forEach((s) => obs.observe(s));
  }
  // El carrusel avanza solo mientras se ve
  setInterval(() => {
    if (galeriaVisible && Date.now() > pausaHasta && fotos.length > 1 && !document.hidden) {
      irAFoto(fotoActual + 1, false);
    }
  }, 4500);

  /* ---------- Abrir el sobre ---------- */
  const sobre = $("#sobre");
  function abrir() {
    if (sobre.classList.contains("abriendo")) return;
    sobre.classList.add("abriendo");
    Musica.iniciar();
    nav.hidden = false;
    setTimeout(vigilar, sinMovimiento ? 0 : 500);
    setTimeout(() => sobre.remove(), sinMovimiento ? 0 : 1500);
  }
  $("#sello").addEventListener("click", abrir);
})();
