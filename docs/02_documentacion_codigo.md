# PARQR — Documentación del Código Existente

## Páginas (App Router)

### `src/app/page.jsx` — Landing Page (`/`)

- **Tipo:** Server Component
- **Descripción:** Página pública principal con sección hero (título con gradiente, CTA de registro/login) y sección de features con tarjetas glassmorphism.
- **Componentes usados:** `TopNav`, `FeatureCard` (definido inline).
- **Notas:** `FeatureCard` es un componente interno que recibe `title` y `desc`.

---

### `src/app/login/page.jsx` — Login (`/login`)

- **Tipo:** Client Component (`"use client"`)
- **Descripción:** Formulario de email + contraseña. Al enviar, simula un login con `setTimeout(1000ms)` y redirige a `/dashboard`.
- **Componentes usados:** `AuthLayout`
- **Estado:** `loading` (boolean)
- **⚠️ Deuda técnica:** No hay autenticación real. No se valida contra ninguna BD.

---

### `src/app/register/page.jsx` — Registro (`/register`)

- **Tipo:** Client Component (`"use client"`)
- **Descripción:** Formulario de registro con campos: nombre completo, lote/casa, email, contraseña. Simula registro y redirige a `/dashboard`.
- **Componentes usados:** `AuthLayout`
- **Estado:** `loading` (boolean)
- **⚠️ Deuda técnica:** No persiste datos. No hashea contraseñas.

---

### `src/app/dashboard/page.jsx` — Dashboard Principal (`/dashboard`)

- **Tipo:** Client Component (`"use client"`)
- **Descripción:** Pantalla principal del residente. Genera un código QR dinámico usando `qrcode.react` con un token que se renueva cada 60 segundos. Muestra información de estado del sistema (caseta en línea, último acceso, cuota de mantenimiento).
- **Componentes usados:** `DashboardLayout`, `QRCodeSVG`, `RefreshCw`, `CheckCircle2`
- **Estado:** `qrToken` (string), `timeLeft` (number, countdown 60→0)
- **Lógica clave:** `useEffect` con `setInterval` que decrementa `timeLeft` y regenera token al llegar a 0.
- **⚠️ Deuda técnica:** Token es `parqr_demo_<random>_<timestamp>`, no está firmado criptográficamente.

---

### `src/app/dashboard/invitados/page.jsx` — Invitados (`/dashboard/invitados`)

- **Tipo:** Client Component (`"use client"`)
- **Descripción:** Página placeholder "Próximamente". Sin funcionalidad.

---

### `src/app/dashboard/settings/page.jsx` — Configuración (`/dashboard/settings`)

- **Tipo:** Client Component (`"use client"`)
- **Descripción:** Página placeholder "Próximamente". Sin funcionalidad.

---

## Componentes Compartidos

### `src/components/TopNav.jsx`

- **Tipo:** Server Component
- **Props:** Ninguna
- **Descripción:** Barra de navegación superior fija con logo PARQR (icono `QrCode` + texto) y botón "Ingresar" que lleva a `/login`. Usa glassmorphism (`backdrop-filter: blur`).

---

### `src/components/AuthLayout.jsx`

- **Tipo:** Server Component
- **Props:** `children`, `title` (string), `subtitle` (string)
- **Descripción:** Wrapper centrado para pantallas de autenticación. Incluye decoración de fondo con gradiente radial, icono QR, flecha de regreso a `/`, y renderiza `children` dentro de una tarjeta glass.

---

### `src/components/DashboardLayout.jsx`

- **Tipo:** Client Component (`"use client"`)
- **Props:** `children`
- **Descripción:** Layout principal del dashboard. Sidebar izquierdo (260px) con:
  - Logo PARQR
  - Navegación: "Mi Acceso QR" → `/dashboard`, "Mis Invitados" → `/dashboard/invitados`, "Configuración" → `/dashboard/settings`
  - Botón "Cerrar Sesión" (redirige a `/`)
- **Subcomponente:** `NavItem({ href, icon, label, active })` — link con highlight si está activo y hover effect.
- **⚠️ Deuda técnica:** Logout simplemente redirige a `/`, no destruye sesión.

---

## API Routes

### `POST /api/qr/validate` — `src/app/api/qr/validate/route.js`

- **Entrada:** `{ qrToken: string }`
- **Lógica:**
  1. Valida que `qrToken` exista (400 si no)
  2. Si empieza con `"parqr_demo_"` → `global.openGate = true` y `setTimeout` lo resetea a `false` en 10s
  3. Responde `{ success: true, message, resident: "Juan Pérez" }` o `401` si es inválido
- **⚠️ Deuda técnica:** Validación por prefijo de string, no por firma criptográfica. Residente hardcodeado.

---

### `GET /api/gate/status` — `src/app/api/gate/status/route.js`

- **Salida:** `{ open: boolean }`
- **Lógica:** Lee `global.openGate` y lo devuelve.
- **⚠️ Deuda técnica:** `global.openGate` es una variable en memoria del proceso Node.js. Se pierde al reiniciar. No funciona con múltiples instancias.

---

## Firmware ESP32

### `esp32_pluma_acceso/esp32_pluma_acceso.ino`

- **Librerías:** `WiFi.h`, `HTTPClient.h`
- **Configuración:**
  - `ssid` / `password` — credenciales WiFi (placeholders)
  - `serverUrl` — URL de `/api/gate/status` (placeholder)
  - `RELAY_PIN = 4` — pin GPIO del relé
- **`setup()`:** Inicializa serial (115200), configura pin como OUTPUT (LOW), conecta a WiFi con reintentos.
- **`loop()`:** Cada 1s hace `GET` al servidor. Busca `"open":true` en el payload como substring. Si lo encuentra, llama a `abrirPluma()`.
- **`abrirPluma()`:** Activa relé (HIGH) 2s → desactiva (LOW) → espera 5s antes de volver a consultar.
- **⚠️ Deuda técnica:** Parseo JSON por substring (frágil). Sin autenticación del ESP32. Sin reconexión WiFi automática.

---

## Estilos Globales — `src/app/globals.css`

- **Fuente:** Inter (Google Fonts) — pesos 300–700
- **Variables CSS:**
  - `--background: #0f172a` (Slate 900)
  - `--foreground: #f8fafc` (Slate 50)
  - `--primary: #3b82f6` / `--primary-hover: #2563eb` (Blue 500/600)
  - `--card-bg: rgba(30, 41, 59, 0.7)` | `--card-border: rgba(255,255,255,0.1)`
  - `--success: #10b981` | `--danger: #ef4444`
- **Clases utilitarias:** `.glass` (glassmorphism), `.btn` / `.btn-primary` (botones), `.input-field` (inputs)
