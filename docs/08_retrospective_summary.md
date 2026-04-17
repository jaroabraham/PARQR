# Reporte de Mejora Continua — PARQR

Este informe detalla el ciclo de aprendizaje y optimización aplicado durante los 5 sprints del proyecto, basándose en la corrección de errores críticos detectados en el desarrollo.

## Evolución del Sistema: De "Mock" a Producción

El proyecto comenzó como un prototipo estático (MVP) y evolucionó mediante iteraciones semanales que corrigieron fallas estructurales y de lógica.

| Sprint | Error Detectado | Acción de Mejora | Impacto en el Proyecto |
| :--- | :--- | :--- | :--- |
| **S1** | Volatilidad de datos en Docker. | Implementación de volúmenes MySQL persistentes. | Estabilidad de la información. |
| **S2** | Rutas 404 en navegación dinámica. | Reestructuración de `app/dashboard` en Next.js. | Experiencia de usuario fluida. |
| **S3** | Datos de usuario hardcoded ("Juan Pérez"). | Vinculación real a sesión JWT y DB MySQL. | Autenticidad y seguridad. |
| **S3** | Fuga de seguridad en pases ajenos. | Validación de propiedad por `residentId` en API. | Privacidad de datos garantizada. |
| **S4** | Tokens QR fáciles de clonar. | Implementación de JWT firmados y con expiración. | Seguridad de acceso robusta. |
| **S5** | Fallos intermitentes en build de Docker. | Automatización de `prisma generate` en el build. | Despliegue CI/CD confiable. |

## Conclusiones del Ciclo Scrum
El uso de una metodología ágil permitió que cada error se transformara en una historia de usuario de mejora para el sprint siguiente. Esto resultó en:
1. **Reducción técnica de deuda:** Refactorización constante de mocks a servicios reales.
2. **Seguridad por diseño:** Corrección proactiva de vulnerabilidades en la generación de QR.
3. **Escalabilidad:** Transición exitosa de SQLite/Mock a un entorno MySQL conteneurizado.

---
*Este reporte sirve como base para la retrospectiva final y planificación de futuras fases del proyecto PARQR.*
