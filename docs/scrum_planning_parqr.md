# Planificación Integral de Proyecto (Scrum) - PARQR

Este documento detalla la estrategia de gestión del proyecto PARQR bajo la metodología ágil Scrum, estructurado en un ciclo de **5 Sprints de una semana de duración cada uno**.

---

## 1. Visión del Proyecto
**PARQR** es un sistema de control de acceso vehicular inteligente que utiliza códigos QR dinámicos para simplificar la entrada de residentes y visitantes a fraccionamientos privados, eliminando la dependencia de guardias físicos y tarjetas magnéticas.

---

## 2. Roles de Scrum
*   **Product Owner:** Encargado de priorizar el Product Backlog y asegurar el valor del sistema para el cliente (Administradores de Fraccionamientos).
*   **Scrum Master:** Facilita las ceremonias, elimina impedimentos técnicos y asegura que el equipo siga los principios de mejora continua.
*   **Equipo de Desarrollo:** Desarrolladores Full-stack (Next.js, Prisma, IoT/C++) responsables de entregar incrementos funcionales.

---

## 3. Product Backlog Priorizado
| ID | Historia de Usuario | Prioridad |
|----|---------------------|-----------|
| PBL-01 | Infraestructura base con Docker y MySQL | Crítica |
| PBL-02 | Registro y autenticación de residentes | Alta |
| PBL-03 | Generación de códigos QR personales (Seguros) | Alta |
| PBL-04 | Gestión de pases para invitados temporales | Alta |
| PBL-05 | Panel de aprobación administrativa | Media |
| PBL-06 | Integración con hardware ESP32 y Relé | Media |
| PBL-07 | Logs de acceso y auditoría en tiempo real | Baja |

---

## 4. Estructura de Sprints (Cronograma Ágil)

### Sprint 1: Cimientos y Persistencia
*   **Objetivo:** Establecer el entorno de contenedores y la base de datos MySQL funcional.
*   **Incremento:** App dockerizada con login funcional y persistencia real.

### Sprint 2: UI/UX e Interfaz del Residente
*   **Objetivo:** Desarrollar un dashboard intuitivo y responsivo.
*   **Incremento:** Frontend completo con layouts de dashboard y sección de invitados.

### Sprint 3: Lógica de Negocio y Robustez
*   **Objetivo:** Migrar lógica mock a queries reales y añadir sistema de aprobaciones.
*   **Incremento:** CRUD real de invitados y flujo administrativo de activación de usuarios.

### Sprint 4: Seguridad IoT y Hardware
*   **Objetivo:** Establecer la conexión segura entre el código QR y la pluma física.
*   **Incremento:** API de validación con tokens JWT y firmware del ESP32 capaz de consultar el servidor.

### Sprint 5: Entrega y Pulido Final
*   **Objetivo:** Finalizar el simulador de hardware y optimizar el feedback en tiempo real.
*   **Incremento:** Sistema completo con documentación técnica y simulador de escáner.

---

## 5. Eventos Scrum
*   **Sprint Planning:** Lunes, 08:00 AM (Definición del Sprint Goal y Backlog).
*   **Daily Scrum:** Diario, 09:00 AM (15 mins - ¿Qué hice?, ¿Qué haré?, Impedimentos).
*   **Sprint Review:** Viernes, 02:00 PM (Demostración del incremento al Product Owner).
*   **Sprint Retrospective:** Viernes, 04:00 PM (¿Qué funcionó?, ¿Qué falló?, Plan de mejora).

---

## 6. Definición de Hecho (DoD)
Un ítem se considera "Hecho" cuando:
1.  El código ha sido revisado y no tiene errores de linting.
2.  Funciona correctamente en el entorno de Docker local.
3.  La interfaz es responsiva (móvil y escritorio).
4.  Cualquier nueva tabla en la base de datos está migrada y documentada.
5.  El Product Owner ha aprobado la funcionalidad.
