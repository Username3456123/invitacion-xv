// ============================================================
//  DATOS DE LA INVITACIÓN
//  Aquí se cambia todo lo que se lee en la invitación.
//  Edita solo lo que está entre comillas y no borres las comas.
//  (Los datos de ahora son de ejemplo.)
// ============================================================

const INVITACION = {
  // ---------- La quinceañera ----------
  nombre: "Valentina",

  // Frase de arriba (si no la quieres, déjala vacía: "")
  bendicion: "Con la bendición de Dios y el amor de mis padres",

  // Frase principal de la portada
  frase:
    "Hay sueños que se esperan toda la vida. Hoy quiero vivir el mío rodeada de las personas que más quiero.",

  // Un nombre por línea. Si no van, deja la lista vacía: []
  padres: ["Carlos Ramírez", "Ana López"],
  padrinos: ["Jorge Méndez", "Laura Torres"],

  // ---------- Fecha (la usa el conteo) ----------
  // Año-mes-día T hora:minutos:segundos y la zona horaria al final.
  // -06:00 es la hora del centro de México.
  fechaHora: "2027-03-13T18:00:00-06:00",
  zonaHoraria: "America/Mexico_City",
  duracionHoras: 7, // cuánto dura la fiesta (para "Agregar a mi calendario")

  // ---------- Cuándo y dónde ----------
  // "mapa" es el enlace de Google Maps. Si lo dejas vacío, se busca la dirección sola.
  eventos: [
    {
      titulo: "Misa de acción de gracias",
      hora: "6:00 p.m.",
      lugar: "Parroquia de San Juan",
      direccion: "Calle Ejemplo 123, Centro",
      mapa: "",
    },
    {
      titulo: "Recepción",
      hora: "8:00 p.m.",
      lugar: "Jardín Los Olivos",
      direccion: "Av. Ejemplo 456, Col. Jardines",
      mapa: "",
    },
  ],

  // ---------- Código de vestimenta ----------
  vestimenta: {
    tipo: "Formal",
    nota: "Te pedimos no usar el color reservado para la quinceañera.",
    // Colores que nadie más debe llevar. Si no hay, deja la lista vacía: []
    coloresReservados: [{ nombre: "Champaña", color: "#e6d3b3" }],
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

  // ---------- Confirmar asistencia ----------
  confirmar: {
    // Número de WhatsApp que recibe las confirmaciones: lada del país + número,
    // sin espacios ni "+" (52 = México). OJO: este número se verá en la página.
    whatsapp: "5215500000000",
    // Si prefieres un Formulario de Google, pega aquí su enlace y deja whatsapp vacío: ""
    formulario: "",
    fechaLimite: "1 de marzo",
    pasesMaximos: 5, // cuántas personas puede confirmar cada invitado
  },

  // ---------- Música de fondo ----------
  // "demo" = melodía de prueba. Para tu canción: "musica/cancion.mp3".
  // Para no poner música: ""
  musica: "demo",

  // ---------- Despedida ----------
  despedida: "¡Te espero para celebrar juntos este día tan especial!",
};
