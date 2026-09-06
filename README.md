# Tripleten web_project_around_express

## Descripción

API REST construida con Node.js y Express que simula el backend del proyecto "Alrededor de los EE. UU.". Permite consultar usuarios y tarjetas almacenados en archivos JSON, manejando rutas específicas y errores de forma estructurada.

## Funcionalidad

La API expone los siguientes endpoints:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/users` | Devuelve la lista completa de usuarios |
| GET | `/cards` | Devuelve la lista completa de tarjetas |
| GET | `/users/:_id` | Devuelve un usuario por su ID |
| POST| `/users` | Añade un usuario |
| POST| `/cards` | Añade una carta nueva |
| PUT | `/users/:_id/likes` | Añade el id del del usuario al array |
| DELETE | `/cards` | Elimina una carta |
| DELETE | `/cards/:cardId/likes` | Elimina el id del usuario que ha dado like |

### Respuestas de error

- Usuario no encontrado: `{ "message": "Usuario no encontrado" }`
- Tarjeta no encontrado: `{ "message": "Tarjeta no encontrada" }`
- Ruta inexistente: `{ "message": "Not found" }`
- Error del servidor: `{ "message": "Internal Server Error" }`

## Tecnologías y técnicas

- **Node.js** — entorno de ejecución del servidor
- **Express.js** — framework para la creación de la API REST
- **Módulo `fs`** — lectura asíncrona de archivos JSON con `readFile()`
- **Módulo `path`** — construcción de rutas de archivo multiplataforma con `join()`
- **Arquitectura modular** — separación de rutas en módulos independientes (`routes/users.js`, `routes/cards.js`)
- **ESLint (Airbnb)** — análisis estático de código
- **Nodemon** — reinicio automático del servidor en desarrollo

## Estructura del proyecto

```
web_project_around_express/
├── controllers/
│   ├── cards.json
│   └── users.json
├── errors/
│   ├── constants.js
│   ├── create.js
|   └── reponse.js  
├── models/
│   ├── card.json
│   └── user.json
├── routes/
│   ├── card.json
│   └── user.json
├── app.js
└── package.json
```

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor corre en `http://localhost:3000`.
