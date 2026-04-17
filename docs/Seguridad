# Implementación de Protocolos de Seguridad: Anti-Passback y Cooldown

## 1. Introducción e Identificación del Problema
Para elevar el nivel de seguridad del sistema **PARQR**, identifiqué la necesidad de prevenir el uso indebido de los códigos QR. En sistemas de acceso reales, un problema común es el "doble ingreso" o el préstamo de códigos (cuando un residente entra y le pasa su QR al vehículo de atrás). Para resolver esto, implementé dos mecanismos de seguridad avanzados: **Anti-Passback** y **Cooldown**.

## 2. Mecanismo 1: Anti-Passback (Control de Estado Entrada/Salida)
Este protocolo asegura que un residente no pueda ingresar dos veces seguidas sin haber registrado una salida previa. El sistema ahora tiene "memoria" de la ubicación del usuario.

### Implementación Técnica:
*   **Base de Datos:** Modifiqué el modelo de `User` en Prisma para incluir un campo booleano `isInside`.
*   **Lógica de Validación:** Al intentar entrar, el servidor verifica si el usuario ya está marcado como `true` en `isInside`. Si es así, deniega el acceso automáticamente.
*   **Salida Obligatoria:** Se habilitó un nuevo endpoint de salida que libera este estado, permitiendo un flujo ordenado de una sola entrada por cada salida.

## 3. Mecanismo 2: Cooldown de Re-entrada (50 Segundos)
Establecí un tiempo de espera obligatorio de **50 segundos** entre cada validación exitosa de ingreso para residentes.

### Implementación Técnica:
*   **Control de Tiempo:** Utilicé el campo `lastAccess` para registrar la estampa de tiempo exacta de cada entrada exitosa.
*   **Cálculo de Diferencia:** El servidor calcula la diferencia entre la petición actual y el último acceso. Si han pasado menos de 50 segundos, el sistema bloquea la apertura de la pluma.
*   **Propósito:** Proteger el mecanismo físico de la pluma y evitar ingresos accidentales múltiples en intervalos cortos.

## 4. Desarrollo de Infraestructura y UI
Para soportar estas reglas, realicé los siguientes cambios en la arquitectura:
1.  **API Dual:** Desarrollé el endpoint `/api/qr/exit` que permite registrar las salidas de forma independiente.
2.  **Interfaz Inteligente:** Actualicé el **Simulador de Caseta** añadiendo un selector de **Modo Entrada / Modo Salida**. La interfaz ahora cambia de color (Azul/Naranja) para indicar visualmente el tipo de operación.
3.  **Logs de Seguridad:** Las denegaciones por Anti-Passback o Cooldown quedan registradas en la tabla `AccessLog` para auditoría administrativa.

## 5. Conclusión
Con estas implementaciones, PARQR demuestra ser una solución robusta y profesional. No solo se limita a leer un código, sino que gestiona de manera inteligente el flujo y la seguridad del recinto, cumpliendo con los estándares de ingeniería de software actuales.
