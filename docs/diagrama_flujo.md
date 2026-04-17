# Diagramas de Flujo - Proyecto PARQR

Este documento detalla los flujos lógicos principales del sistema, desde la generación del acceso hasta la activación física de la barrera.

## 1. Flujo Global de Acceso (Residente/Invitado)

Este diagrama describe el proceso desde que se presenta el código QR hasta que la pluma se abre.

```mermaid
flowchart TD
    Start((Inicio)) --> GenerateQR[Residente genera QR en Dashboard]
    GenerateQR --> PresentQR[Presenta QR al Escáner]
    PresentQR --> Scan[Escáner lee el Token]
    Scan --> APIValidate{API /api/qr/validate}
    
    APIValidate -- Token Inválido o Expirado --> Error[Mostrar Error en Pantalla]
    APIValidate -- Token Válido --> DBUpdate[(Actualizar Logs y Flag de Puerta)]
    
    DBUpdate --> FlagOpen[Set openGate = true]
    
    subgraph IoT_Hardware [Hardware ESP32]
        FlagOpen -.-> Polling[ESP32 consulta /api/gate/status]
        Polling --> CheckStatus{¿open == true?}
        CheckStatus -- No --> Polling
        CheckStatus -- Sí --> OpenRelay[Activar Relé 2s]
        OpenRelay --> PhysicalOpen[Pluma se Abre]
        PhysicalOpen --> ResetGate[API resetea Flag openGate = false]
    end
    
    ResetGate --> End((Fin))
    Error --> End
```

## 2. Flujo de Registro y Aprobación de Residentes

Lógica de seguridad para asegurar que solo personas autorizadas usen el sistema.

```mermaid
flowchart TD
    RegStart[Usuario se Registra] --> StoreDB[(Guardar en MySQL como Pendiente)]
    StoreDB --> AdminLogin[Admin inicia sesión en Panel]
    AdminLogin --> Review[Revisar Lista de Solicitudes]
    Review --> Decision{¿Aprobar?}
    
    Decision -- No --> Deny[Notificar Rechazo / Bloquear]
    Decision -- Sí --> Activate[Marcar como Activo en BD]
    
    Activate --> CanLogin[Usuario ya puede generar códigos QR]
```

## 3. Flujo de Creación de Invitaciones Temporales

```mermaid
flowchart TD
    ResLogin[Residente Logueado] --> Form[Completa Formulario de Invitado]
    Form --> ValidDate{¿Fecha Válida?}
    ValidDate -- No --> Form
    ValidDate -- Sí --> SaveInv[(Guardar en BD vinculada al Residente)]
    SaveInv --> GenLink[Generar Link/Código QR para Invitado]
    GenLink --> Share[Compartir con Invitado]
```
