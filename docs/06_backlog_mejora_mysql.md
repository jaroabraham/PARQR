# Backlog de Mejora: Migración MVP a MySQL

## Objetivo Principal
Reemplazar los datos simulados (mock) tanto en el frontend (`setTimeout` en UI) como en el backend (`global.openGate` y tokens estáticos) por una implementación real y completamente funcional basada en **MySQL** conteneurizado con Docker.

Este backlog detalla los modelos de base de datos relacional y las adaptaciones necesarias en las rutas API para habilitar operaciones CRUD en todas las secciones de la aplicación utilizando MySQL.

---

## 1. Diseño de Arquitectura de Datos (Modelos MySQL)

Se sugiere el uso de Prisma, Drizzle o Sequelize para conectarse a MySQL, facilitando el esquema y las migraciones.

### Tabla `User` (Usuarios y Residentes)
- `id` (VARCHAR UUID o INT PK AUTO_INCREMENT)
- `name` (VARCHAR): Nombre completo.
- `email` (VARCHAR UNIQUE): Correo del usuario.
- `passwordHash` (VARCHAR): Contraseña encriptada (ej. con bcrypt).
- `role` (ENUM): 'ADMIN' o 'RESIDENT'.
- `status` (ENUM): 'PENDING', 'APPROVED', 'REJECTED' (Para control de acceso por administrador).
- `qrToken` (VARCHAR): Token permanente para el residente (si aplica).
- `createdAt` (DATETIME)

### Tabla `Guest` (Invitados temporales)
- `id` (VARCHAR UUID o INT PK AUTO_INCREMENT)
- `residentId` (FK -> User.id): Identifica al residente anfitrión.
- `guestName` (VARCHAR): Nombre del visitante.
- `qrToken` (VARCHAR UNIQUE): Código QR temporal de un solo uso o tiempo limitado.
- `validFrom` (DATETIME)
- `validUntil` (DATETIME)
- `isUsed` (BOOLEAN): Marca si ya fue escaneado (para únicos accesos).

### Tabla `AccessLog` (Historial de la Pluma)
- `id` (INT PK AUTO_INCREMENT)
- `userId` (FK -> User.id, Opcional)
- `guestId` (FK -> Guest.id, Opcional)
- `action` (ENUM): 'ENTRY', 'DENIED'.
- `timestamp` (DATETIME DEFAULT CURRENT_TIMESTAMP)

---

## 2. Adaptación de Rutas API (CRUD)

### Autenticación y Gestión de Usuarios
- **`POST /api/auth/register` (Create):** 
  - Recibe datos del formulario de registro.
  - Encripta la contraseña y guarda el usuario en MySQL con `status = PENDING`.
- **`POST /api/auth/login` (Read/Auth):** 
  - Verifica el usuario en MySQL por su email y checa password/`status`. Retorna un JWT de sesión.
- **`GET /api/users` (Read):**
  - Devuelve usuarios (Residentes) para que el Admin los vea y apruebe.
- **`PUT /api/users/:id/status` (Update):**
  - Endpoint donde un Admin puede marcar al Residente como 'APPROVED' o 'REJECTED'.

### Gestión de Invitados (Panel del Residente)
- **`POST /api/guests` (Create):** 
  - Genera y emite un `qrToken` único en MySQL asociado a un `residentId`.
- **`GET /api/guests` (Read):**
  - Devuelve todos los invitados pertenecientes al residente loggeado.
- **`DELETE /api/guests/:id` (Delete/Revoke):**
  - Permite borrar/revocar un código QR antes de que expire.

### Validación QR y Pluma IoT
- **`POST /api/qr/validate` (Read & Create):**
  - **Lógica:** Recibe un `qrToken` y valida si está en `Guest` y en tiempo válido (o en `User` si es un residente válido).
  - Si es válido, inserta evento 'ENTRY' en `AccessLog` y actualiza la pluma. Marca `isUsed = 1` si corresponde.
- **`GET /api/gate/status` (Read):**
  - Endpoint que el ESP32 consume para saber si debe accionar la pluma físicamente debido a una lectura de código exitosa reciente.

---

## 3. Modificaciones en la Infraestructura

- **Docker Compose:**
  - Agregar un contenedor `mysql:8.0` al `docker-compose.yml`. Configurar esquema por defecto, credenciales y volúmenes de persistencia.

## 4. Modificaciones en el Frontend (UI)

- **`src/app/login/page.jsx` & `register/page.jsx`:**
  - Remover simulación y hacer un fetch real a los endpoints de backend. Manejar posibles errores (como "Usuario no aprobado aún").
- **`src/app/dashboard/page.jsx`:**
  - Mostrar contenido dinámico según rol (`ADMIN` gestiona residentes en la DB; `RESIDENT` gestiona sus invitados conectados a la DB).
