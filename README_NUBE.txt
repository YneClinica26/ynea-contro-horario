YNEA CONTROL HORARIO - VERSIÓN NUBE

1) En Supabase abre SQL Editor.
2) Copia el contenido del archivo SUPABASE_SQL.txt.
3) Pulsa Run.
4) En Supabase ve a Database > Replication > Tables y activa Realtime para ynea_app_state si aparece desactivado.
5) Sube estos archivos a GitHub y Vercel.

Acceso inicial:
Administrador / 1234
Susana / 1234

La app ya incluye:
- URL de Supabase del proyecto ynea-control-horario.
- clave pública anon.
- sincronización en tiempo real mediante Supabase.
- funcionamiento local si Supabase aún no está configurado.

Nota sobre emails:
El aviso en pantalla funciona con notificaciones del navegador.
Para envío real de emails hay que configurar después un proveedor de correo en Vercel, por ejemplo Resend, SendGrid o Gmail SMTP.
