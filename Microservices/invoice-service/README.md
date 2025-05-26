# 🧾 Invoice Service

Este microservicio se encarga de **generar facturas electrónicas en PDF** cuando un pago ha sido procesado exitosamente.

## 🚀 Funcionalidades
- Genera facturas PDF con los datos del pago.
- Guarda las facturas en base de datos y las expone vía API.

## 🛠 Tecnologías
- NestJS
- TypeScript
- RabbitMQ / Kafka
- MongoDB (almacenamiento de PDFs y metadatos)

## 📡 Endpoints REST
- `GET /invoices/:id`: Descarga una factura.
- `GET /users/:userId/invoices`: Lista las facturas de un usuario.


