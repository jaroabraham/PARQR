# Informe Final de Proyecto: Sistema PARQR
## Gestión de Proyectos bajo el Marco de Trabajo SCRUM

**Institución:**DASC Instituto Tecnológico Universitario 
**Curso:** Proyecto profecional 2  
**Fecha:** 16 de abril de 2026 
**Presentado por:** Abraham Francisco Torres Lezama 
**Proyecto:** PARQR - Control de Acceso Vehicular Inteligente  

---

## 1. Introducción y Visión del Proyecto
El proyecto **PARQR** surge como una respuesta tecnológica a la ineficiencia de los sistemas de acceso vehicular tradicionales en fraccionamientos residenciales. La problemática central radica en la dependencia de medios físicos (tarjetas, llaves) y la intervención humana constante, lo cual genera cuellos de botella y vulnerabilidades de seguridad.

**Objetivo:** Desarrollar un sistema automatizado que utilice códigos QR dinámicos, una plataforma web de gestión y hardware dedicado (ESP32) para permitir un acceso fluido, seguro y auditable tanto para residentes como para invitados.

---

## 2. Fases del Proceso de Gestión
Para asegurar una supervisión integral, el proyecto se estructuró siguiendo las 5 fases esenciales de la gestión de proyectos:
*   **Inicio:** Identificación de la problemática de acceso vehicular y definición de la visión del sistema PARQR.
*   **Planificación:** Diseño de la arquitectura de contenedores, modelado de la base de datos MySQL y priorización del Product Backlog.
*   **Ejecución:** Desarrollo de los incrementos funcionales durante los 5 Sprints.
*   **Monitoreo y Control:** Inspección continua de logs, validación de seguridad y revisión de la calidad (Definition of Done).
*   **Cierre:** Estabilización final, documentación técnica y entrega del informe final.


### 2.1 Pilares del Empirismo
*   **Transparencia:** Se mantuvo un repositorio centralizado con documentación en el directorio `/docs`, asegurando que el estado del sistema fuera visible en todo momento.
*   **Inspección:** A través de la revisión de logs y pruebas unitarias en el entorno Docker, se evaluó el progreso de cada funcionalidad.
*   **Adaptación:** El proyecto pivotó de un modelo de datos simulado (Mock) a una base de datos MySQL robusta tras detectar limitaciones en la persistencia de datos.

### 2.2 Roles del Equipo
*   **Product Owner:** Responsable de la visión del producto y la priorización del *Product Backlog*.
*   **Scrum Master:** Facilitador encargado de eliminar impedimentos técnicos (ej. errores de build en Docker o configuración de Prisma).
*   **Equipo de Desarrollo:** Célula multidisciplinaria encargada del desarrollo full-stack (Next.js) y programación de sistemas embebidos (C++/Arduino).

---

## 3. Planificación Estructurada (Product Backlog)
El desarrollo se dividió en historias de usuario priorizadas por valor de negocio:

| ID | Historia de Usuario | Prioridad |
|----|---------------------|-----------|
| PBL-01 | Infraestructura base con contenedores Docker y MySQL | Crítica |
| PBL-02 | Sistema de autenticación seguro para residentes | Alta |
| PBL-03 | Generación de códigos QR con tokens dinámicos | Alta |
| PBL-04 | Integración con hardware ESP32 y control de relé | Media |
| PBL-05 | Panel administrativo de auditoría y logs de acceso | Media |

---

## 4. Ciclo de Vida del Desarrollo (Sprints)
El proyecto se ejecutó en **5 Sprints** de una semana cada uno:

1.  **Sprint 1 (Cimientos):** Configuración del entorno Docker, arquitectura de carpetas y base de datos inicial.
2.  **Sprint 2 (UI/UX):** Desarrollo del Dashboard del residente y layouts responsivos con CSS vainilla.
3.  **Sprint 3 (Lógica de Negocio):** Migración de servicios simulados a operaciones CRUD reales con Prisma y MySQL.
4.  **Sprint 4 (Seguridad e IoT):** Implementación de validación de tokens JWT y firmware del ESP32 para apertura de barrera.
5.  **Sprint 5 (Estabilización):** Pulido de errores, optimización del despliegue y documentación final.

---

## 5. Arquitectura Técnica y Estándares
El sistema sigue una arquitectura moderna desacoplada:
*   **Frontend/Backend:** Next.js (App Router) comunicándose vía API RESTful.
*   **Persistencia:** MySQL gestionado por Prisma ORM.
*   **Seguridad:** Autenticación basada en JSON Web Tokens (JWT) para asegurar la integridad de los códigos QR.
*   **IoT:** Comunicación vía HTTP Polling entre el hardware ESP32 y el servidor central.

---

## 6. Aseguramiento de la Calidad (Definition of Done)
Para garantizar una entrega de grado académico, cada incremento funcional cumplió con:
1.  **Clean Code:** Código libre de errores de linting y comentarios técnicos pertinentes.
2.  **Portabilidad:** Funcionamiento verificado dentro de contenedores Docker.
3.  **Seguridad:** Validación de roles y permisos en todas las rutas de la API.
4.  **UX:** Interfaz totalmente responsiva y accesible.

---

## 7. Lecciones Aprendidas y Conclusiones
La implementación de SCRUM permitió transformar un prototipo teórico en un sistema funcional capaz de operar en condiciones reales. La principal lección aprendida fue el valor de la **mejora continua**; los errores detectados en la integración de Docker al inicio del proyecto se tradujeron en un pipeline de despliegue más robusto al final del ciclo.

**Impacto Final:** PARQR demuestra ser una solución escalable y profesional que cumple con los estándares actuales de ingeniería de software y gestión de proyectos ágiles.

---Andrés Valdez Acuña---
**Firmas de Entrega**

_Abraham Francisco Torres Lezama_ 
**Estudiante de Ingeniería**  

_Andrés Valdez Acuña_ 
**Revisión de Gestión de Proyecto**
