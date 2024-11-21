import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaz para los datos de entrada de una reacción
export interface ReactionInput {
    type: ReactionType; // Usamos un tipo específico para las reacciones
    userId: mongoose.Types.ObjectId; // ID del usuario que reacciona
    commentId: mongoose.Types.ObjectId; // ID del comentario al que se reacciona
}

// Definimos un tipo para los valores permitidos en el campo `type`
export type ReactionType = 
    | 'like'
    | 'love'
    | 'dislike'
    | 'angry'
    | 'sad'
    | 'wow'
    | 'celebrate'
    | 'support';

// Interfaz para el documento de la reacción
export interface ReactionDocument extends ReactionInput, Document {
    createdAt: Date;
    updatedAt: Date;
}

// Definición del esquema de la reacción
const reactionSchema = new Schema<ReactionDocument>(
    {
        type: { 
            type: String, 
            enum: [
                'like', 
                'love', 
                'dislike', 
                'angry', 
                'sad', 
                'wow', 
                'celebrate', 
                'support'
            ], 
            required: true 
        },
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        commentId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Comment', 
            required: true 
        }
    },
    { 
        timestamps: true, 
        collection: 'reactions' 
    }
);

// Creación del modelo de Mongoose
const Reaction: Model<ReactionDocument> = mongoose.model<ReactionDocument>('Reaction', reactionSchema);

export default Reaction;
