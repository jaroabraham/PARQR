# Sprint 2 — QR Seguro, Invitados & Panel Admin

**Duración:** Semanas 3–4  
**Objetivo:** Tokens QR firmados con JWT, gestión completa de invitados, y panel de administración.  
**Total:** 32 Story Points  
**Dependencia:** Requiere Sprint 1 completado (BD, Auth, Redis).

---

## Historias de Usuario

### S2-01 · QR con JWT firmado
**Prioridad:** 🔴 Alta | **Estimación:** 5 pts

**Descripción:**  
Reemplazar token `parqr_demo_*` por un JWT firmado con payload que incluya `userId`, `residentId`, `exp`, `iat`.

**Criterios de aceptación:**
- [ ] Dashboard genera JWT firmado con `JWT_SECRET` y expiración de 60s
- [ ] `/api/qr/validate` verifica firma y expiración del JWT
- [ ] Token rechazado si está expirado, firma inválida, o usuario no aprobado
- [ ] Log de validación incluye `residentId` extraído del JWT
- [ ] Error descriptivo si el token es inválido

---

### S2-02 · Gestión de invitados
**Prioridad:** 🔴 Alta | **Estimación:** 8 pts

**Descripción:**  
CRUD completo en `/dashboard/invitados` para crear invitaciones con QR temporal compartible.

**Criterios de aceptación:**
- [ ] Modelo `GuestPass` (id, residentId, guestName, validFrom, validUntil, maxUses, usedCount, token, createdAt)
- [ ] Formulario para crear invitación: nombre del invitado, fecha, número de usos
- [ ] Lista de invitaciones activas/expiradas con estado visual
- [ ] Botón para copiar link / compartir QR del invitado
- [ ] Posibilidad de revocar un pase activo
- [ ] `/api/qr/validate` también valida tokens de invitados (verifica fecha, usos restantes)

---

### S2-03 · Panel de Administración
**Prioridad:** 🔴 Alta | **Estimación:** 8 pts

**Descripción:**  
Nuevo layout `/admin` con funcionalidades de gestión para administradores del fraccionamiento.

**Criterios de aceptación:**
- [ ] Layout `/admin` con sidebar propio y protección por rol `ADMIN`
- [ ] Lista de residentes con filtros por estado (pendiente, aprobado, rechazado)
- [ ] Botones para aprobar/rechazar registros pendientes
- [ ] Vista de detalle de residente con sus invitados activos
- [ ] Página de logs de acceso con tabla paginada y filtros por fecha/residente

---

### S2-04 · Historial de accesos
**Prioridad:** 🟡 Media | **Estimación:** 5 pts

**Descripción:**  
Registrar cada escaneo validado y mostrar historial en el dashboard del residente y panel admin.

**Criterios de aceptación:**
- [ ] Modelo `AccessLog` (id, residentId, guestPassId?, type, timestamp, success)
- [ ] `/api/qr/validate` crea un `AccessLog` en cada validación (exitosa o fallida)
- [ ] Dashboard del residente muestra sus últimos 10 accesos
- [ ] Panel admin muestra tabla completa de accesos con paginación
- [ ] Exportable a CSV desde el panel admin

---

### S2-05 · Notificaciones en dashboard
**Prioridad:** 🟢 Baja | **Estimación:** 3 pts

**Descripción:**  
Alertas en tiempo real cuando se use un QR del residente o de sus invitados.

**Criterios de aceptación:**
- [ ] Toast notification al validar QR exitosamente
- [ ] Indicador de "último acceso" se actualiza en tiempo real
- [ ] Notificación cuando un invitado usa su pase

---

### S2-06 · Responsive & Mobile-first
**Prioridad:** 🟡 Media | **Estimación:** 3 pts

**Descripción:**  
Adaptar toda la interfaz para uso óptimo en dispositivos móviles.

**Criterios de aceptación:**
- [ ] Sidebar del dashboard se convierte en menú hamburguesa en pantallas < 768px
- [ ] QR centrado y dimensionado para pantalla de celular
- [ ] Formularios de auth usables en mobile
- [ ] Landing page responsive
- [ ] Todas las tablas con scroll horizontal en mobile
