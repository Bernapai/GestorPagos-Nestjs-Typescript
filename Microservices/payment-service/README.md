# 💳 Payment Service

Este microservicio se encarga de **procesar pagos** (Simulados)

## 🚀 Funcionalidades
- Validación de datos de pago.
- Emisión de eventos `pago_exitoso` o `pago_fallido` vía RabbitMQ/Kafka.

## 🛠 Tecnologías
- NestJS
- TypeScript
- RabbitMQ / Kafka
- PostgreSQL

## 📡 Endpoints REST
- `POST /payments`: Procesa un nuevo pago.
- `GET /payments/:id`: Obtiene el estado de un pago.


## 🧪 Pruebas
- Unitarias con Jest.