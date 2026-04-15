# Sprint 3 — IoT Robusto, Testing & Despliegue

**Duración:** Semanas 5–6  
**Objetivo:** Firmware production-ready, tests automatizados, CI/CD, y despliegue a producción.  
**Total:** 31 Story Points  
**Dependencia:** Requiere Sprint 2 completado (APIs completas, JWT, invitados).

---

## Historias de Usuario

### S3-01 · ESP32: Parser JSON con ArduinoJson
**Prioridad:** 🔴 Alta | **Estimación:** 3 pts

**Descripción:**  
Reemplazar parseo por substring con la librería `ArduinoJson`. Añadir autenticación del ESP32 con API key.

**Criterios de aceptación:**
- [ ] Librería `ArduinoJson` integrada
- [ ] Parseo de `{ "open": true/false }` con `deserializeJson()`
- [ ] Header `X-API-Key` enviado en cada request
- [ ] `/api/gate/status` valida la API key del ESP32
- [ ] Manejo de errores de parseo sin crash

---

### S3-02 · ESP32: Reconexión WiFi & watchdog
**Prioridad:** 🟡 Media | **Estimación:** 3 pts

**Descripción:**  
Implementar reconexión automática a WiFi, LED indicador de estado, y watchdog timer.

**Criterios de aceptación:**
- [ ] Reconexión automática si WiFi se desconecta (sin reiniciar)
- [ ] LED integrado indica estado: parpadeo = conectando, fijo = conectado, apagado = error
- [ ] Watchdog timer reinicia ESP32 si se cuelga más de 30s
- [ ] Log serial con timestamps para debugging

---

### S3-03 · ESP32: Comunicación bidireccional
**Prioridad:** 🟢 Baja | **Estimación:** 5 pts

**Descripción:**  
Migrar de polling HTTP cada 1s a WebSocket o Server-Sent Events para latencia inmediata.

**Criterios de aceptación:**
- [ ] Conexión WebSocket o SSE entre ESP32 y servidor
- [ ] Latencia de apertura < 500ms desde validación de QR
- [ ] Fallback a polling HTTP si WebSocket falla
- [ ] Reconexión automática del canal

---

### S3-04 · Tests unitarios de API
**Prioridad:** 🔴 Alta | **Estimación:** 5 pts

**Descripción:**  
Tests con Jest o Vitest para las API routes, con mocking de BD y Redis.

**Criterios de aceptación:**
- [ ] Tests para `/api/auth/register` (registro válido, email duplicado, campos faltantes)
- [ ] Tests para `/api/auth/login` (credenciales válidas, inválidas, usuario pendiente)
- [ ] Tests para `/api/qr/validate` (JWT válido, expirado, firma inválida, invitado)
- [ ] Tests para `/api/gate/status` (con/sin API key, Redis activo/caído)
- [ ] Cobertura mínima del 80% en API routes

---

### S3-05 · Tests E2E
**Prioridad:** 🟡 Media | **Estimación:** 5 pts

**Descripción:**  
Tests end-to-end con Playwright o Cypress para flujos completos.

**Criterios de aceptación:**
- [ ] Flujo: Registro → esperar aprobación → login → ver QR
- [ ] Flujo: Login → crear invitado → compartir QR
- [ ] Flujo: Admin login → aprobar residente → ver logs
- [ ] Tests corren en CI con Docker Compose de testing
- [ ] Screenshots en caso de fallo

---

### S3-06 · CI/CD Pipeline
**Prioridad:** 🟡 Media | **Estimación:** 3 pts

**Descripción:**  
Pipeline de GitHub Actions para lint, tests, build y push de imagen Docker.

**Criterios de aceptación:**
- [ ] Trigger en push a `main` y en pull requests
- [ ] Steps: install → lint → test → build Docker → push a registry
- [ ] Cache de `node_modules` y capas Docker
- [ ] Badge de status en README
- [ ] Notificación de fallos

---

### S3-07 · Despliegue a producción
**Prioridad:** 🔴 Alta | **Estimación:** 5 pts

**Descripción:**  
Configurar servidor con Docker Compose completo, dominio y HTTPS.

**Criterios de aceptación:**
- [ ] VPS o instancia cloud provisionada
- [ ] `docker-compose.prod.yml` con servicios: web, PostgreSQL, Redis
- [ ] Proxy reverso (nginx/Caddy) con HTTPS automático (Let's Encrypt)
- [ ] Dominio configurado apuntando al servidor
- [ ] Backups automáticos de BD
- [ ] Monitoreo básico (uptime, logs)

---

### S3-08 · Documentación técnica
**Prioridad:** 🟢 Baja | **Estimación:** 2 pts

**Descripción:**  
README completo y guía de contribución.

**Criterios de aceptación:**
- [ ] README con: descripción, screenshots, requisitos, setup local, variables de entorno
- [ ] Diagrama de arquitectura actualizado
- [ ] Guía para flashear el ESP32
- [ ] CONTRIBUTING.md con convenciones de código y flujo de PRs
