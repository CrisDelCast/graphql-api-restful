import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaz para los datos de entrada de un comentario
export interface CommentInput {
    content: string;
    userId: mongoose.Types.ObjectId;  // ID del usuario que crea el comentario
    parentId?: mongoose.Types.ObjectId;  // ID del comentario padre, en caso de que sea una respuesta
}

// Interfaz para el documento del comentario que extiende Document e incluye la fecha de creación y actualización
export interface CommentDocument extends Document {
    content: string;
    userId: mongoose.Types.ObjectId;
    parentId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Definición del esquema del comentario
const commentSchema = new Schema<CommentDocument>(
    {
        content: {
            type: String,
            required: [true, 'Content is required'], // Mensaje personalizado si no se proporciona contenido
            trim: true, // Elimina espacios en blanco al inicio y al final
            minlength: [1, 'Content must have at least 1 character'], // Validación de longitud mínima
        },
        userId: { // Cambiado de `user` a `userId`
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencia al modelo de usuario
            required: [true, 'User ID is required'],
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', // Referencia al modelo de comentario (para respuestas)
        },
    },
    {
        timestamps: true, // Agrega automáticamente createdAt y updatedAt
        collection: 'comments', // Nombre de la colección
    }
);

// Índices adicionales para optimización
commentSchema.index({ userId: 1 }); // Índice para consultas rápidas por usuario
commentSchema.index({ parentId: 1 }); // Índice para consultas rápidas por comentarios padre

// Hook para eliminar respuestas asociadas cuando se elimina un comentario padre
commentSchema.pre('findOneAndDelete', async function (next) {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        await this.model.deleteMany({ parentId: doc._id }); // Elimina comentarios hijos asociados
    }
    next();
});

// Creación del modelo de Mongoose
const Comment: Model<CommentDocument> = mongoose.model<CommentDocument>('Comment', commentSchema);

export default Comment;
