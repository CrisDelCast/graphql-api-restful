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

## Json para probar Graphql


### Usuarios :
#### Crear Usuario

    mutation CreateUser {
    createUser(input: {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "securepassword123",
        role: "admin"
    }) {
        id
        name
        email
        role
        createdAt
        updatedAt
    }
    }

#### Obtener todos los usuarios

    query GetUsers {
    getUsers {
        id
        name
        email
        role
        createdAt
        updatedAt
    }
    }


#### Obtener un usuario por ID

    query GetUserById {
    getUserById(id: "12345") { 
        id
        name
        email
        role
        createdAt
        updatedAt
    }
    }


### Comentarios :

#### Crear nuevo Comentario

    mutation CreateComment {
    createComment(input: {
        content: "This is a great post!",
        userId: "user123",  
        parentId: null
    }) {
        id
        content
        userId
        parentId
        createdAt
        updatedAt
    }
    }

#### Actualizar un Comentario

    mutation UpdateComment {
    updateComment(id: "comment123", input: {
        content: "Updated content for the comment"
    }) {
        id
        content
        userId
        parentId
        createdAt
        updatedAt
    }
    }

#### Eliminar un comentario

    mutation DeleteComment {
    deleteComment(id: "comment123") {  # Reemplaza "comment123" con el ID del comentario real
        id
    }
    }

#### Obtener todos los comentarios

    query {
      getComments {
        id
        content
        userId
        parentId
        createdAt
        updatedAt
      }
    }

#### Obtener un comentario por ID

    query GetCommentById {
    getCommentById(id: "comment123") { 
        id
        content
        userId
        parentId
        createdAt
        updatedAt
    }
    }

### Reacciones :

#### Crear una nueva reaccion

    mutation CreateReaction {
    createReaction(input: {
        type: "like",    # Puede cambiar el tipo
        userId: "user123",      
        commentId: "comment123" 
    }) {
        id
        type
        userId
        commentId
        createdAt
        updatedAt
    }
    }

#### Actualizar una reaccion

    mutation UpdateReaction {
    updateReaction(id: "reaction123", input: {
        type: "love"   
        userId: "user123",     
        commentId: "comment123" 
    }) {
        id
        type
        userId
        commentId
        createdAt
        updatedAt
    }
    }

#### Eliminar una reaccion 

    mutation DeleteReaction {
    deleteReaction(id: "reaction123") 
    }


#### Obtener las reacciones 

    query GetReactions {
    getReactions {
        id
        type
        userId
        commentId
        createdAt
        updatedAt
    }
    }

#### Obtener una reaccion por ID

    query GetReactionById {
    getReactionById(id: "reaction123") {
        id
        type
        userId
        commentId
        createdAt
        updatedAt
    }
    }

### Posts :

#### Crear un nuevo Post

    mutation CreatePost {
    createPost(input: {
        title: "Nuevo Post sobre GraphQL",  
        content: "Este es el contenido de un post creado con GraphQL.", 
        author: "user123"  
    }) {
        id
        title
        content
        author 
        createdAt
        updatedAt
    }
    }

#### Actualizar Post

    mutation UpdatePost {
    updatePost(id: "post123", input: {
        title: "Post actualizado",  # Nuevo título para el post
        content: "Este es el contenido actualizado del post.",  # Nuevo contenido
        author: "user123"  # ID del usuario autor del post (puede cambiar si deseas cambiar el autor)
    }) {
        id
        title
        content
        author
        createdAt
        updatedAt
    }
    }

#### Eliminar Post

    mutation DeletePost {
    deletePost(id: "post123")
    }

#### Obtener todos los Post

    query GetPosts {
    getPosts {
        id
        title
        content
        author 
        createdAt
        updatedAt
    }
    }


#### Obtener un Post por ID

    query GetPostById {
    getPostById(id: "post123") {  # Reemplaza con el ID del post real
        id
        title
        content
        author 
        createdAt
        updatedAt
    }
    }
### Fragments:

# Fragmento para los campos básicos de un usuario

    fragment UserFields on User {
    id
    name
    email
    role
    createdAt
    updatedAt
    }

# Fragmento para los campos básicos de un comentario

    fragment CommentFields on Comment {
    id
    content
    userId
    parentId
    createdAt
    updatedAt
    }

# Fragmento para los campos básicos de una reacción

    fragment ReactionFields on Reaction {
    id
    type
    userId
    commentId
    createdAt
    updatedAt
    }

# Fragmento para los campos básicos de un post

    fragment PostFields on Post {
    id
    title
    content
    author
    createdAt
    updatedAt
    }

# Recordatorio

    los fragments deben tener al final

    ejemplo: 
    
    query GetReactions{
        getReactions {
            ...ReactionFields
            
        } 
    }
        











