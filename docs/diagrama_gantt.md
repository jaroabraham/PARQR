# Diagrama de Gantt - Proyecto PARQR

Este diagrama detalla la planificación de los 5 sprints del proyecto, abarcando desde la infraestructura inicial hasta la entrega final y el pulido del sistema.

```mermaid
gantt
    title Plan de Proyecto PARQR - Evolución por Sprints
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b

    section Sprint 1: Cimientos
    Dockerización y MySQL        :s1_1, 2026-03-16, 2d
    Esquema de BD Inicial        :s1_2, after s1_1, 1d
    Registro de Usuarios         :s1_3, after s1_2, 2d
    Autenticación Base           :s1_4, after s1_3, 2d

    section Sprint 2: UI/UX
    Dashboard Layout             :s2_1, 2026-03-23, 2d
    Interfaz de Invitados        :s2_2, after s2_1, 2d
    Diseño Responsivo            :s2_3, after s2_2, 1d
    Configuración Perfil         :s2_4, after s2_3, 2d

    section Sprint 3: Datos Reales
    Migración Mocks -> MySQL     :s3_1, 2026-03-30, 2d
    Lógica de Aprobación Admin   :s3_2, after s3_1, 2d
    Persistencia de Invitados    :s3_3, after s3_2, 2d
    Refactorización Prisma       :s3_4, after s3_3, 1d

    section Sprint 4: IoT & Seguridad
    QR con Firmas JWT            :s4_1, 2026-04-06, 2d
    API de Validación (ESP32)    :s4_2, after s4_1, 1d
    Comunicación con Hardware    :s4_3, after s4_2, 2d
    Historial de Accesos         :s4_4, after s4_3, 2d

    section Sprint 5: Entrega
    Panel Admin Full             :s5_1, 2026-04-13, 2d
    Simulador de Escáner GUI      :s5_2, after s5_1, 2d
    Notificaciones Tiempo Real   :s5_3, after s5_2, 2d
    Documentación y Cierre       :s5_4, after s5_3, 1d
```

## Resumen de Fases

1.  **Fase de Cimientos (Semana 1):** Establecimiento del entorno Docker y seguridad básica.
2.  **Fase de Experiencia (Semana 2):** Desarrollo visual y adaptabilidad móvil.
3.  **Fase de Robustez (Semana 3):** Conexión real a base de datos y flujos de negocio.
4.  **Fase de Conectividad (Semana 4):** Integración con el hardware (ESP32) y blindaje de tokens QR.
5.  **Fase de Finalización (Semana 5):** Herramientas administrativas avanzadas y simuladores de pruebas.
