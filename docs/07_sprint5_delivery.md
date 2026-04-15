# Sprint 5 — Entrega Final y Pulido de Sistema

**Duración:** Semana 5  
**Objetivo:** Completar el panel administrativo, implementar mejoras de tiempo real y validar el sistema completo.

## Backlog del Sprint
- **S5.1: Panel Administrativo Completo:** Tabla de gestión de usuarios, aprobación masiva y visualización de logs globales.
- **S5.2: Simulador de Escáner:** GUI para simular la cámara y la barrera física, facilitando pruebas sin hardware.
- **S5.3: Notificaciones Real-time:** Feedback visual inmediato al validar un QR (usando polling optimizado o SSE).
- **S5.4: Documentación Final:** Manual de usuario y guías técnicas para mantenimiento.

## Ciclo de Mejora Continua (Pulido Final)
- **Feedback de Usuario:** Los residentes no sabían si su invitado ya había entrado.
  - *Corrección:* Se añadió un estado de "Usado" en la lista de invitados que se actualiza automáticamente.
- **Estabilidad de Docker:** El build de producción fallaba intermitentemente por caché de Prisma.
  - *Corrección:* Se añadió `npx prisma generate` al paso de construcción del Dockerfile.

## Definición de Hecho (DoD)
- [x] El administrador puede gestionar todo el fraccionamiento desde su panel.
- [x] El sistema ha sido probado con el simulador de escáner exitosamente.
- [x] Toda la documentación técnica está actualizada y disponible.
