# Invitación digital de XV años

Página para abrir en el celular (formato vertical 9:16). Se desliza hacia
arriba, pantalla por pantalla:

1. Sobre con sello que se abre (y empieza la música)
2. Portada: foto en arco, monograma, nombre y fecha
3. Bienvenida: frase, papás y padrinos
4. Conteo en vivo y "Agregar a mi calendario"
5. Ceremonia religiosa: templo, hora, dirección y mapa
6. Recepción: lugar, hora, dirección y mapa
7. Itinerario de la noche
8. Carrusel de fotos
9. Quiz "¿Qué tanto me conoces?"
10. Código de vestimenta
11. Regalos (lluvia de sobres y mesas de regalos)
12. Confirmar asistencia por WhatsApp
13. Despedida

Las partes que no se llenan (sin ceremonia, sin itinerario, sin regalos, sin
fotos o sin quiz) desaparecen solas.

## Cómo verla

Doble clic en `index.html` y se abre en el navegador.

## Qué se cambia y dónde

| Quiero cambiar…                         | Archivo                 |
| --------------------------------------- | ----------------------- |
| Nombre, apellidos, frases, papás, padrinos | `datos.js`           |
| Colores (berenjena o neutral)           | `datos.js` → `paleta`   |
| Foto de la portada                      | `datos.js` → `fotoPortada` |
| Fecha y hora (el conteo)                | `datos.js` → `fechaHora` |
| Templo y hora de la misa                | `datos.js` → `ceremonia` |
| Lugar y hora de la fiesta               | `datos.js` → `recepcion` |
| Itinerario (vals, cena, baile…)         | `datos.js` → `itinerario` |
| Lluvia de sobres y mesas de regalos     | `datos.js` → `regalos`  |
| Preguntas del quiz                      | `datos.js` → `quiz`     |
| Número de WhatsApp para confirmar       | `datos.js` → `confirmar` |
| Colores y letras                        | `estilos.css` (arriba de todo) |
| Fotos                                   | carpeta `fotos/` y la lista `fotos` de `datos.js` |
| Canción                                 | carpeta `musica/` y `musica` de `datos.js` |
| Lo que se ve al mandar el enlace por WhatsApp | `index.html` (las líneas `og:`) |

**Fotos:** guarda las fotos en `fotos/` (de preferencia verticales, JPG) y
escribe su nombre en `datos.js`, por ejemplo `{ src: "fotos/daniela-1.jpg", texto: "" }`.
Las que dicen "Foto 1… Foto 5" son de ejemplo.

**Canción:** en `datos.js`, `musica` lleva el enlace de una canción de Spotify
(ahora "Tears On My Pillow" de Grease). Al abrir el sobre sale su reproductor
arriba; el invitado le da play y la canción sigue sonando al pasar de pantalla
(la notita musical vuelve a mostrar el reproductor). Spotify no deja que suene
sola, y sin sesión de Spotify solo suenan unos 30 segundos. Con `"demo"` suena
una melodía de prueba y con `""` no hay música. No subas canciones con derechos
de autor como MP3: el repositorio es público y cualquiera podría descargarlas.

## Invitaciones con nombre

Al final del enlace puedes poner para quién es y cuántos lugares tiene:

```
https://tu-pagina/?para=Familia%20Pérez&pases=4
```

La invitación dirá "Para: Familia Pérez", el nombre ya sale escrito al
confirmar y solo deja confirmar hasta 4 personas. Los espacios se escriben `%20`.

## Ojo

- El número de WhatsApp de `confirmar` se ve dentro de la página. Si no quieres
  eso, usa un Formulario de Google (`formulario` en `datos.js`) y deja `whatsapp: ""`.
- Cualquiera con el enlace ve la fecha y el lugar.
- La carpeta `.claude/` solo sirve para probarla en la computadora; no se publica.
