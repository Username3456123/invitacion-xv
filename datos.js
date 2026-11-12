// ============================================================
//  DATOS DE LA INVITACIÓN
//  Aquí se cambia todo lo que se lee en la invitación.
//  Edita solo lo que está entre comillas y no borres las comas.
//  (Los datos de ahora son de ejemplo.)
// ============================================================

const INVITACION = {
  // ---------- Colores ----------
  // "neutral" (crema y dorado), "berenjena" (plateado y morado berenjena)
  // o "vestido" (morado del vestido, lavanda y plateado).
  // Para probar otra sin cambiar esta, agrega al enlace: ?paleta=berenjena
  paleta: "vestido",

  // ---------- La quinceañera ----------
  nombre: "Daniela",            // va grande, en letra manuscrita
  apellidos: "García Padilla",  // va debajo, más pequeño (vacío = no se pone)
  monograma: "", // letra del sello de la portada; vacío = la primera letra del nombre

  // Foto de la portada (va dentro del arco). Vacío = sin foto.
  fotoPortada: "fotos/portada.svg",

  // ---------- Mensaje de bienvenida ----------
  bendicion: "Con la bendición de Dios y el amor de mis padres",
  frase:
    "Hay sueños que se esperan toda la vida. Hoy quiero vivir el mío rodeada de las personas que más quiero.",

  // Un nombre por línea. Si no van, deja la lista vacía: []
  padres: ["Guillermo García Osorio", "Gabriela Padilla Villalobos"],
  padrinos: ["Renata García Padilla"],
  padrinosTitulo: "Mi madrina", // "Mis padrinos", "Mi madrina", "Mi padrino"…

  // ---------- Fecha (la usa el conteo) ----------
  // Año-mes-día T hora:minutos:segundos y la zona horaria al final.
  // Pon la hora en que empieza la ceremonia. -06:00 = hora del centro de México.
  fechaHora: "2027-04-10T17:00:00-06:00", // sábado 10 de abril de 2027, 5:00 p.m.
  zonaHoraria: "America/Mexico_City",
  duracionHoras: 9, // cuánto dura todo (para "Agregar a mi calendario"): de 5 p.m. a 2 a.m.

  // ---------- Ceremonia religiosa (va antes de la fiesta) ----------
  // "mapa" es el enlace de Google Maps. Vacío = se busca la dirección sola.
  // Si no hay ceremonia, cambia todo el bloque por: ceremonia: null,
  ceremonia: {
    tipo: "", // línea extra bajo el título (vacío = no se pone; el título ya dice "Ceremonia religiosa")
    templo: "Parroquia Corpus Christi",
    hora: "5:00 p.m.",
    direccion: "Av. Manuel Jesús Clouthier 525, Prados Guadalupe, Zapopan",
    mapa: "https://www.google.com/maps/dir//Corpus+Cristi,+Av+Manuel+J.+Clouthier+525,+Col,+Prados+Guadalupe,+45020+Zapopan,+Jal./@20.6651031,-103.4324079,13z/data=!4m7!4m6!1m1!4e2!1m2!1m1!1s0x8428ae900678f73d:0x614d213629dbcae!3e0",
    nota: "Te pedimos llegar 15 minutos antes.",
  },

  // ---------- Recepción (la fiesta) ----------
  recepcion: {
    lugar: "Monet Salón de Eventos",
    hora: "7:00 p.m.",
    direccion: "Anillo Periférico Pte. Manuel Gómez Morín 3000, Paraísos del Colli, Zapopan",
    mapa: "https://www.google.com/maps/dir//Av.+Perif.+Pte.+Manuel+G%C3%B3mez+Morin+3000,+Para%C3%ADsos+del+Colli,+45069+Zapopan,+Jal./data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x8428ad0d86ce9bc5:0xf62b048d4169047b",
    nota: "",
  },

  // ---------- Itinerario de la noche ----------
  // Los dos primeros son reales; los demás son de ejemplo (cámbialos por los horarios reales).
  // Si no lo quieres, deja la lista vacía: []
  itinerario: [
    { hora: "5:00 p.m.", que: "Ceremonia religiosa" },
    { hora: "7:00 p.m.", que: "Recepción" },
    { hora: "8:30 p.m.", que: "Entrada y vals" },
    { hora: "9:00 p.m.", que: "Cena" },
    { hora: "10:00 p.m.", que: "Brindis" },
    { hora: "10:30 p.m.", que: "Baile sorpresa" },
    { hora: "11:00 p.m.", que: "¡A bailar!" },
  ],

  // ---------- Código de vestimenta ----------
  vestimenta: {
    tipo: "Formal casual",
    estilo: "All black", // sale en una etiqueta debajo (vacío = no se pone)
    nota: "Ven vestido de negro de pies a cabeza. El morado es solo para la quinceañera.",
    // Colores que deben llevar los invitados (sale "Viste de"). Vacío = no se pone.
    // Ejemplo: [{ nombre: "Negro", color: "#161216" }]
    coloresSugeridos: [],
    // Colores que nadie más debe llevar. Si no hay, deja la lista vacía: []
    coloresReservados: [{ nombre: "Morado", color: "#56298c" }], // el morado de su vestido
  },

  // ---------- Fotos del carrusel ----------
  // Pon las fotos en la carpeta "fotos" y escribe aquí su nombre.
  // "texto" es opcional (sale abajo de la foto).
  fotos: [
    { src: "fotos/foto-1.svg", texto: "" },
    { src: "fotos/foto-2.svg", texto: "" },
    { src: "fotos/foto-3.svg", texto: "" },
    { src: "fotos/foto-4.svg", texto: "" },
    { src: "fotos/foto-5.svg", texto: "" },
  ],

  // ---------- Quiz ----------
  // En "correcta" escribe la respuesta igual que en las opciones.
  quiz: {
    titulo: "¿Qué tanto me conoces?",
    intro: "Responde estas preguntas y descubre qué tanto sabes de mí.",
    preguntas: [
      {
        pregunta: "¿Cuál es mi musical favorito?",
        opciones: ["Grease", "Mamma Mia", "Wicked", "High School Musical"],
        correcta: "Grease",
      },
      {
        pregunta: "¿Cuál es mi comida favorita?",
        opciones: ["Pizza hawaiana", "Sushi empanizado", "Papa rellena de pastor", "Espagueti a la boloñesa"],
        correcta: "Papa rellena de pastor",
      },
      {
        pregunta: "Algo que hacía y casi nadie sabe…",
        opciones: ["Jugué tenis", "Fui monaguilla", "Estuve en banda de guerra", "Escribía canciones"],
        correcta: "Estuve en banda de guerra",
      },
      {
        pregunta: "¿Qué número de jersey usé en la primaria?",
        opciones: ["10", "29", "12", "4"],
        correcta: "10",
      },
      {
        pregunta: "¿Quién es mi cantante favorito?",
        opciones: ["Luis Miguel", "Benny Ibarra", "Britney Spears", "Lady Gaga"],
        correcta: "Luis Miguel",
      },
    ],
    resultados: {
      todas: "¡Me conoces mejor que nadie!",
      muchas: "¡Muy bien! Me conoces bastante.",
      pocas: "¡Tenemos mucho de qué platicar en la fiesta!",
    },
  },

  // ---------- Regalos ----------
  // Si no quieres esta parte, cambia todo el bloque por: regalos: null,
  regalos: {
    texto: "Tu presencia es mi mejor regalo. Si quieres tener un detalle conmigo, habrá lluvia de sobres.",
    // Mesas de regalos (opcional). Ejemplo:
    // { tienda: "Nombre de la tienda", numero: "Evento 12345678", enlace: "https://..." }
    mesas: [],
  },

  // ---------- Confirmar asistencia ----------
  confirmar: {
    // Número de WhatsApp que recibe las confirmaciones: lada del país + número,
    // sin espacios ni "+" (52 = México). OJO: este número se verá en la página.
    whatsapp: "523332002750",
    // Si prefieres un Formulario de Google, pega aquí su enlace y deja whatsapp vacío: ""
    formulario: "",
    fechaLimite: "1 de marzo",
    // Los invitados no eligen cuántas personas van. Para darle lugares a una
    // familia, mándale el enlace con pases: ...?para=Familia%20Pérez&pases=4
  },

  // ---------- Música de fondo ----------
  // "demo" = melodía de prueba. Para tu canción: "musica/cancion.mp3".
  // Para no poner música: ""
  musica: "demo",

  // ---------- Despedida ----------
  despedida: "¡Te espero para celebrar juntos este día tan especial!",
};
