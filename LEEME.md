# Invitación digital de XV años

Página para abrir en el celular (formato vertical 9:16) con:
sobre que se abre, presentación, conteo en vivo, cuándo y dónde con mapa,
carrusel de fotos, quiz, código de vestimenta, confirmar por WhatsApp y música.

## Cómo verla

Doble clic en `index.html` y se abre en el navegador.

## Qué se cambia y dónde

| Quiero cambiar…                         | Archivo                 |
| --------------------------------------- | ----------------------- |
| Nombre, frases, papás, padrinos         | `datos.js`              |
| Fecha y hora (el conteo)                | `datos.js` → `fechaHora` |
| Lugares y mapas                         | `datos.js` → `eventos`  |
| Preguntas del quiz                      | `datos.js` → `quiz`     |
| Número de WhatsApp para confirmar       | `datos.js` → `confirmar` |
| Colores y letras                        | `estilos.css` (arriba de todo) |
| Fotos                                   | carpeta `fotos/` y la lista `fotos` de `datos.js` |
| Canción                                 | carpeta `musica/` y `musica` de `datos.js` |
| Lo que se ve al mandar el enlace por WhatsApp | `index.html` (las líneas `og:`) |

**Fotos:** guarda las fotos en `fotos/` (de preferencia verticales, JPG) y
escribe su nombre en `datos.js`, por ejemplo `{ src: "fotos/valentina-1.jpg", texto: "" }`.
Las que dicen "Foto 1… Foto 5" son de ejemplo.

**Canción:** pon el archivo en `musica/` (MP3) y en `datos.js` escribe
`musica: "musica/cancion.mp3"`. Con `"demo"` suena una melodía de prueba y con
`""` no hay música. La música empieza al tocar el sello (los celulares no dejan
que suene sola).

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
