// ============================================================
//  DATOS DE LA INVITACIÓN
//  Aquí se cambia todo lo que se lee en la invitación.
//  Edita solo lo que está entre comillas y no borres las comas.
//  (Los datos de ahora son de ejemplo.)
// ============================================================

const INVITACION = {
  // ---------- Colores ----------
  // "neutral" (crema y dorado) o "berenjena" (plateado y morado berenjena).
  // Para probar otra sin cambiar esta, agrega al enlace: ?paleta=berenjena
  paleta: "berenjena",

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
  padres: ["Carlos Ramírez", "Ana López"],
  padrinos: ["Jorge Méndez", "Laura Torres"],

  // ---------- Fecha (la usa el conteo) ----------
  // Año-mes-día T hora:minutos:segundos y la zona horaria al final.
  // Pon la hora en que empieza la ceremonia. -06:00 = hora del centro de México.
  fechaHora: "2027-03-13T18:00:00-06:00",
  zonaHoraria: "America/Mexico_City",
  duracionHoras: 7, // cuánto dura todo (para "Agregar a mi calendario")

  // ---------- Ceremonia religiosa (va antes de la fiesta) ----------
  // "mapa" es el enlace de Google Maps. Vacío = se busca la dirección sola.
  // Si no hay ceremonia, cambia todo el bloque por: ceremonia: null,
  ceremonia: {
    tipo: "Misa de acción de gracias",
    templo: "Parroquia de San Juan Bautista",
    hora: "6:00 p.m.",
    direccion: "Calle Ejemplo 123, Centro",
    mapa: "",
    nota: "Te pedimos llegar 15 minutos antes.",
  },

  // ---------- Recepción (la fiesta) ----------
  recepcion: {
    lugar: "Jardín Los Olivos",
    hora: "8:00 p.m.",
    direccion: "Av. Ejemplo 456, Col. Jardines",
    mapa: "",
    nota: "",
  },

  // ---------- Itinerario de la noche ----------
  // Si no lo quieres, deja la lista vacía: []
  itinerario: [
    { hora: "6:00 p.m.", que: "Misa de acción de gracias" },
    { hora: "8:00 p.m.", que: "Recepción" },
    { hora: "9:00 p.m.", que: "Vals" },
    { hora: "9:30 p.m.", que: "Cena" },
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
    coloresReservados: [{ nombre: "Morado", color: "#6b2d78" }],
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
        pregunta: "¿Cuál es mi color favorito?",
        opciones: ["Azul", "Rosa", "Verde", "Morado"],
        correcta: "Rosa",
      },
      {
        pregunta: "¿Cuál es mi comida favorita?",
        opciones: ["Pizza", "Sushi", "Tacos", "Pasta"],
        correcta: "Sushi",
      },
      {
        pregunta: "¿Qué me gusta hacer en mi tiempo libre?",
        opciones: ["Bailar", "Leer", "Dibujar", "Jugar videojuegos"],
        correcta: "Bailar",
      },
      {
        pregunta: "¿Qué animal me encanta?",
        opciones: ["Perros", "Gatos", "Caballos", "Pandas"],
        correcta: "Gatos",
      },
      {
        pregunta: "¿A dónde me gustaría viajar?",
        opciones: ["París", "Tokio", "Nueva York", "Cancún"],
        correcta: "París",
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
    whatsapp: "5215500000000", // número temporal
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
