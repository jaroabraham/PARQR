# Sprint 3 — Base de Datos Robusta y Mejora Continua

**Duración:** Semana 3  
**Objetivo:** Migrar la lógica de "datos quemados" a una estructura relacional robusta en MySQL y corregir errores de flujo.

## Backlog del Sprint
- **S3.1: Migración a MySQL:** Reemplazar mocks de frontend por consultas reales a la base de datos.
- **S3.2: Flujo de Aprobación:** Implementar lógica donde el Admin debe aprobar residentes antes de que puedan generar QR.
- **S3.3: Gestión de Invitados Real:** Persistencia de invitados en BD con fechas de validez vinculadas al residente.
- **S3.4: Optimización de Consultas:** Refactorizar el uso de Prisma para evitar fugas de memoria y asegurar conexiones estables.

## Ciclo de Mejora Continua (Refactorización)
- **Error Crítico de Datos:** Se detectó que cualquier usuario podía ver pases de otros residentes si conocía el ID.
  - *Corrección:* Se implementaron validaciones de propiedad (`residentId`) en todas las API routes de invitados.
- **Inconsistencia de Auth:** El usuario "Juan Pérez" aparecía por defecto en el dashboard debido a un mock hardcoded.
  - *Corrección:* Se eliminó el mock y se vinculó la UI directamente al estado de la sesión JWT.

## Definición de Hecho (DoD)
- [x] CRUD de invitados funcional con persistencia en MySQL.
- [x] Solo los residentes aprobados pueden operar en el sistema.
- [x] La información del dashboard es 100% dinámica y real.
