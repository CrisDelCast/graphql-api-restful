# API Node Social Media
### integrantes
Cristian David del Castillo - A00369953
Santiago prado - A00365113
Juan Diego Lora - A00369885
## link del repo
https://github.com/JD-Lora1/API-Node-SocialMedia

## Descripción

Este es un proyecto de API para una aplicación de red social, desarrollado con Node.js y Express. La API permite gestionar usuarios y comentarios.

## Requisitos Previos

- Node.js (versión 14 o superior)
- Yarn o npm (para la gestión de paquetes)
- MongoDB (puedes usar MongoDB Atlas para una base de datos en la nube)

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### 1. Clona el Repositorio

- `git clone https://github.com/tu_usuario/API-Node-SocialMedia.git`
- `cd API-Node-SocialMedia`

### 2. Instala las Dependencias

Asegúrate de estar en la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:

- `yarn install`

o si prefieres usar npm:

- `npm install`

### 3. Configura el Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

- `JWT_SECRET`: Esta es la clave secreta que se utiliza para firmar los tokens JWT.
- `MONGO_URI`: La URI de conexión a tu base de datos MongoDB.

### 4. Ejecuta el Servidor

Puedes iniciar el servidor en modo de desarrollo utilizando:

- `yarn dev`

o si usas npm:

- `npm run dev`

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints Disponibles

- `POST /`: Crear un nuevo usuario.
- `POST /login`: Iniciar sesión y obtener un token JWT.
- `GET /`: Obtener todos los usuarios (requiere autenticación).
- `POST /comments`: Crear un nuevo comentario (requiere autenticación).

## Problemas Conocidos

**Creación de Comentarios**: No se pudo probar la creación de comentarios debido a problemas con la autenticación mediante tokens JWT. Aunque la funcionalidad puede funcionar correctamente, no se pudo verificar su correcto funcionamiento en este momento. Asegúrate de que el token JWT se esté enviando correctamente en las solicitudes para evitar errores de autorización.
