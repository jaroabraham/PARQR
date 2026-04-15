# Sprint 2 — UI/UX y Dashboard Interactivo

**Duración:** Semana 2  
**Objetivo:** Desarrollar la interfaz de usuario completa y preparar la lógica de invitados en el frontend.

## Backlog del Sprint
- **S2.1: Layout del Dashboard:** Crear barra lateral, navegación y visualización de perfil.
- **S2.2: Interfaz de Invitados:** Diseñar el formulario para creación de pases temporales.
- **S2.3: Diseño Responsivo:** Ajustar componentes para visualización óptima en dispositivos móviles.
- **S2.4: Perfil de Usuario:** Implementar la página de configuración para actualizar datos del residente.

## Ciclo de Mejora Continua (Correcciones UI)
- **Error de Navegación:** Los enlaces de invitados y configuración daban error 404.
  - *Corrección:* Se estructuraron correctamente las rutas dinámicas en Next.js.
- **Visualización en Móvil:** El código QR se desbordaba en pantallas pequeñas.
  - *Corrección:* Se aplicaron estilos CSS Flexbox y Media Queries para centrar y escalar el QR.

## Definición de Hecho (DoD)
- [x] Todas las secciones del dashboard son accesibles.
- [x] La interfaz es usable en navegadores de escritorio y móviles.
- [x] El usuario puede navegar entre su perfil, invitados y vista principal sin errores.
