# Sprint 1 — Cimientos y Entorno Real

**Duración:** Semana 1  
**Objetivo:** Establecer la infraestructura de contenedores y el sistema de autenticación base con persistencia real.

## Backlog del Sprint
- **S1.1: Dockerización Core:** Configurar `docker-compose.yml` con servicios para la App y MySQL.
- **S1.2: Esquema Inicial:** Definir modelos `User` y `Resident` en MySQL.
- **S1.3: Registro de Usuarios:** Implementar formulario de registro conectado a la API con hashing de contraseñas.
- **S1.4: Login Básico:** Implementar autenticación simple para acceder al dashboard.

## Ciclo de Mejora Continua (Identificación de Errores)
Durante esta fase inicial, se detectaron los siguientes problemas que requirieron ajustes inmediatos:
1. **Error de Persistencia:** Los datos se perdían al reiniciar el contenedor.
   - *Corrección:* Se implementaron volúmenes de Docker para MySQL.
2. **Conflictos de Dependencia:** `bcryptjs` causaba problemas en el build de Docker Alpine.
   - *Corrección:* Se ajustó el `Dockerfile` para incluir las herramientas de compilación necesarias.

## Definición de Hecho (DoD)
- [x] Contenedores corriendo y comunicándose.
- [x] Usuario puede registrarse y los datos persisten en MySQL.
- [x] Acceso restringido al dashboard sin sesión activa.
