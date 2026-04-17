# Sprint 1 — Fundación & Autenticación Real

**Duración:** Semanas 1–2  
**Objetivo:** Sustituir la simulación de login/registro por autenticación real con persistencia de datos.  
**Total:** 22 Story Points

---

## Historias de Usuario

### S1-01 · Configurar BD PostgreSQL + Prisma ORM
**Prioridad:** 🔴 Alta | **Estimación:** 3 pts

**Descripción:**  
Añadir servicio PostgreSQL a `docker-compose.yml`, instalar Prisma, crear schema inicial con modelos `User` y `Resident`.

**Criterios de aceptación:**
- [ ] PostgreSQL corriendo como servicio Docker
- [ ] Prisma configurado con `DATABASE_URL` desde variable de entorno
- [ ] Schema con modelos `User` (id, email, passwordHash, role, createdAt) y `Resident` (id, userId, fullName, lot, status, createdAt)
- [ ] Migración inicial ejecutable con `npx prisma migrate dev`
- [ ] Prisma Client generado y funcional

---

### S1-02 · Registro real de residentes
**Prioridad:** 🔴 Alta | **Estimación:** 5 pts

**Descripción:**  
Conectar formulario de registro a nueva API route que hashee contraseña con bcrypt y persista en BD.

**Criterios de aceptación:**
- [ ] `POST /api/auth/register` creado
- [ ] Contraseña hasheada con bcrypt (salt rounds ≥ 10)
- [ ] Validaciones server-side: email único, contraseña mínimo 8 caracteres, campos obligatorios
- [ ] Feedback de errores visible en formulario
- [ ] Registro exitoso redirige a pantalla de "pendiente de aprobación"

---

### S1-03 · Login real con JWT/Sessions
**Prioridad:** 🔴 Alta | **Estimación:** 5 pts

**Descripción:**  
Implementar autenticación con JWT o `next-auth`. Crear middleware de protección para rutas `/dashboard/*`.

**Criterios de aceptación:**
- [ ] `POST /api/auth/login` que valida credenciales y devuelve token JWT
- [ ] Token almacenado en cookie httpOnly secure
- [ ] Middleware que redirige a `/login` si no hay sesión válida en `/dashboard/*`
- [ ] Datos del usuario disponibles en el dashboard (nombre, lote)
- [ ] Logout destruye la sesión/cookie

---

### S1-04 · Página Settings funcional
**Prioridad:** 🟡 Media | **Estimación:** 3 pts

**Descripción:**  
Mostrar datos del usuario logueado y permitir cambiar nombre y contraseña.

**Criterios de aceptación:**
- [ ] Muestra nombre, email, lote del usuario actual
- [ ] Formulario para actualizar nombre
- [ ] Formulario para cambiar contraseña (pide contraseña actual + nueva)
- [ ] Feedback visual de éxito/error

---

### S1-05 · Flujo de aprobación de residente
**Prioridad:** 🟡 Media | **Estimación:** 3 pts

**Descripción:**  
Los registros quedan en estado "pendiente" hasta que un administrador los apruebe.

**Criterios de aceptación:**
- [ ] Campo `status` en modelo Resident: `PENDING | APPROVED | REJECTED`
- [ ] Nuevos registros se crean con `status = PENDING`
- [ ] Dashboard muestra mensaje de "cuenta pendiente" si el residente no está aprobado
- [ ] QR solo se genera para residentes aprobados

---

### S1-06 · Migrar estado de pluma a Redis
**Prioridad:** 🔴 Alta | **Estimación:** 2 pts

**Descripción:**  
Reemplazar `global.openGate` por una clave en Redis para persistencia y escalabilidad.

**Criterios de aceptación:**
- [ ] Redis corriendo como servicio Docker
- [ ] Librería `ioredis` instalada
- [ ] `/api/qr/validate` escribe clave `gate:open` con TTL de 10s
- [ ] `/api/gate/status` lee clave `gate:open` de Redis
- [ ] Si Redis no disponible, responde con error 503

---

### S1-07 · Variables de entorno & configuración
**Prioridad:** 🟡 Media | **Estimación:** 1 pt

**Descripción:**  
Centralizar configuración sensible en variables de entorno.

**Criterios de aceptación:**
- [ ] `.env.example` creado con todas las variables necesarias
- [ ] `.env` añadido a `.gitignore`
- [ ] Variables: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET`, `NEXTAUTH_SECRET`
- [ ] `docker-compose.yml` actualizado con variables de entorno para todos los servicios
