# Casos de Uso - Proyecto PARQR

Este documento define las interacciones entre los diferentes actores y el sistema PARQR.

## Diagrama de Casos de Uso

```mermaid
useCaseDiagram
    actor "Residente" as R
    actor "Administrador" as A
    actor "Invitado" as I
    actor "Hardware ESP32" as H
    
    package "Sistema PARQR" {
        usecase "Registrarse" as UC1
        usecase "Iniciar Sesión" as UC2
        usecase "Generar QR Personal" as UC3
        usecase "Gestionar Invitados" as UC4
        usecase "Aprobar Residentes" as UC5
        usecase "Ver Logs de Acceso" as UC6
        usecase "Validar QR" as UC7
        usecase "Accionar Pluma" as UC8
    }
    
    R --> UC1
    R --> UC2
    R --> UC3
    R --> UC4
    
    A --> UC2
    A --> UC5
    A --> UC6
    
    I --> UC7
    
    UC7 ..> UC8 : <<include>>
    H --> UC8
```

## Definición de Casos de Uso

### 1. Gestión de Residentes
- **Registrarse:** Un nuevo usuario crea una cuenta proporcionando sus datos. Su estado inicial es "Pendiente".
- **Iniciar Sesión:** Acceso al dashboard mediante credenciales (JWT).
- **Generar QR Personal:** El sistema genera un token dinámico (60s) para que el residente entre.

### 2. Gestión de Invitados
- **Gestionar Invitados:** El residente crea pases temporales especificando nombre y fecha. El sistema genera un QR único para el invitado.

### 3. Administración y Seguridad (Panel Admin)
- **Aprobar Residentes:** El administrador revisa registros pendientes y los activa para permitirles usar el sistema.
- **Ver Logs de Acceso:** El administrador consulta quién ha entrado, a qué hora y mediante qué tipo de pase (residente/invitado).

### 4. Automatización de Acceso (Hardware/Core)
- **Validar QR:** El sistema (vía escáner) verifica la firma JWT, la fecha de expiración y el estado del usuario.
- **Accionar Pluma:** El hardware ESP32 detecta la autorización y activa el relé físico para abrir la barrera.
