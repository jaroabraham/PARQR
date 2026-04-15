# Sprint 4 — Seguridad y Conectividad IoT

**Duración:** Semana 4  
**Objetivo:** Asegurar los tokens de acceso y establecer la comunicación estable con el hardware (ESP32).

## Backlog del Sprint
- **S4.1: QR Seguro con JWT:** Implementar firma de tokens QR para evitar suplantación.
- **S4.2: API de Validación:** Crear endpoint `/api/qr/validate` que verifique firma y vigencia del token.
- **S4.3: Integración ESP32:** Desarrollar el cliente para que el hardware consulte el estado de la pluma.
- **S4.4: Logs de Acceso:** Registrar cada intento de entrada (exitoso/fallido) en la base de datos.

## Ciclo de Mejora Continua (Seguridad y Hardware)
- **Vulnerabilidad de Token:** Los tokens QR eran predecibles y fáciles de duplicar.
  - *Corrección:* Se migró a JWT firmados con una clave secreta y expiración corta (60 segundos).
- **Latencia de Pluma:** El hardware tardaba demasiado en detectar la apertura.
  - *Corrección:* Se optimizó el endpoint de estado y se preparó el terreno para comunicación en tiempo real.

## Definición de Hecho (DoD)
- [x] El escáner solo valida códigos generados por el servidor con firma válida.
- [x] Cada escaneo genera un registro en el historial de accesos.
- [x] El ESP32 recibe correctamente la instrucción de "abrir" tras un escaneo exitoso.
