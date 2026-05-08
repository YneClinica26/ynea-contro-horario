YNEA CONTROL HORARIO - APP INSTALABLE, NUBE Y COPIA LOCAL PC

QUÉ INCLUYE
- App web/PWA instalable en móvil y PC.
- Sincronización en la nube con Supabase.
- Versión de escritorio para PC con copia local diaria al cerrar.
- Botón en Exportaciones para elegir la ruta de copia.
- Copia en JSON y CSV.

MÓVIL / PC COMO APP INSTALABLE
1. Sube todos los archivos a GitHub.
2. Vercel actualizará la web.
3. Abre la URL de Vercel.
4. Instala la app:
   - iPhone: Safari > Compartir > Añadir a pantalla de inicio.
   - Android/Chrome: menú > Instalar aplicación.
   - PC/Chrome: menú > Guardar y compartir > Instalar página como aplicación.

PC CON COPIA LOCAL AL CERRAR
Para que el PC pueda guardar copias en una carpeta local, no basta con la PWA del navegador.
Hay que usar la versión escritorio incluida en la carpeta /desktop.

PASOS TÉCNICOS PARA GENERAR EL EJECUTABLE
1. Instalar Node.js en el PC.
2. Abrir una terminal dentro de esta carpeta.
3. Ejecutar:
   npm install
   npm run dist
4. Se generará una app de escritorio en la carpeta dist.

USO DE COPIA LOCAL
1. Abre la app de escritorio.
2. Entra como Administrador.
3. Ve a Exportaciones.
4. Pulsa "Elegir ruta de copia".
5. Elige la carpeta.
6. Cada día, al cerrar la app de PC, se guardará una copia local.

IMPORTANTE
Por seguridad, una web normal no puede guardar archivos automáticamente en una ruta del PC.
Por eso la copia automática al cerrar solo funciona con la app de escritorio.
