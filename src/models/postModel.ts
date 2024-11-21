import mongoose, { Document, Schema } from "mongoose";

// Definimos la estructura de un Post con TypeScript
export interface PostInput {
  title: string;
  content: string;
  author: string; // ID del usuario que creó el post
}

export interface PostDocument extends PostInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Esquema de Mongoose para el modelo Post
const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String, // Relación con el modelo de usuario
      required: true,
    }
  },
  {
    timestamps: true, // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

// Creamos el modelo a partir del esquema
const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;
