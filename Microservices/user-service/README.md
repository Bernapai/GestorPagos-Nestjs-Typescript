# 👤 User Service

Este microservicio gestiona los **datos del usuario**, incluyendo su información de facturación y métodos de pago predeterminados.

## 🚀 Funcionalidades
- CRUD de usuarios.
- Gestión de métodos de pago por defecto.
- Proporciona datos a otros servicios durante el procesamiento de pagos y facturación.

## 🛠 Tecnologías
- NestJS
- TypeScript
- PostgreSQL

## 📡 Endpoints REST
- `GET /users/:id`: Obtiene datos del usuario.
- `POST /users`: Crea un nuevo usuario.
- `PUT /users/:id`: Actualiza datos del usuario.
