// Servidor sencillo para ver la invitación en la computadora (solo para probar).
// No se necesita para publicarla.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const raiz = resolve(process.argv[2] || ".");
const puerto = Number(process.argv[3] || 5500);
const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".m4a": "audio/mp4",
};

createServer(async (req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const archivo = normalize(join(raiz, ruta.endsWith("/") ? ruta + "index.html" : ruta));
  if (archivo !== raiz && !archivo.startsWith(raiz + sep)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const datos = await readFile(archivo);
    res.writeHead(200, {
      "content-type": tipos[extname(archivo).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(datos);
  } catch {
    res.writeHead(404).end("No existe");
  }
}).listen(puerto, "127.0.0.1", () => console.log(`Invitación en http://127.0.0.1:${puerto}`));
