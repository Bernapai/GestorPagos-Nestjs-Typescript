# 💳 Sistema de Procesamiento de Pagos y Facturación

Este sistema se compone de varios **microservicios independientes** que trabajan juntos para gestionar pagos, generar facturas y enviar notificaciones a los usuarios. Su propósito es manejar pagos de forma **segura y escalable**, asegurando que cada transacción sea procesada correctamente sin afectar el rendimiento del sistema principal.

---

## 🔹 Tecnologías Utilizadas

- **Lenguaje**: TypeScript
- **Framework**: [NestJS](https://nestjs.com/)
- **Bases de datos**: PostgreSQL y MongoDB
- **Mensajería**: RabbitMQ o Kafka
- **Autenticación**: JWT u OAuth2
- **Notificaciones**: SendGrid, Twilio
- **Testing**: Jest

---

## 🔹 Arquitectura General

El sistema está compuesto por los siguientes microservicios:

### 1. Payment Service (Servicio de Pagos)
- Procesa pagos (Simulados).
- Emite eventos como `pago exitoso` o `pago fallido` para que otros servicios reaccionen.

### 2. Invoice Service (Servicio de Facturación)
- Escucha eventos del `Payment Service` cuando una transacción se completa con éxito.
- Genera una factura en formato PDF.
- Guarda la factura en la base de datos y la expone para descarga.

### 3. Notification Service (Servicio de Notificaciones)
- Escucha eventos como `pago aprobado`, `pago rechazado` o `factura generada`.
- Envía emails o SMS usando proveedores como SendGrid o Twilio.

### 4. User Service (Servicio de Usuarios)
- Gestiona la información del cliente (nombre, dirección, método de pago).
- Proporciona datos requeridos por otros servicios al momento de realizar pagos o facturar.

### 5. API Gateway
- Punto de entrada único del sistema.
- Redirige las solicitudes al microservicio correspondiente.
- Maneja la autenticación de usuarios mediante JWT u OAuth2.

---
