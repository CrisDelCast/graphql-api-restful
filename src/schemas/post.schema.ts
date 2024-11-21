import mongoose, { Schema, Document } from "mongoose";

// Definir la interfaz del Post, esta es la forma que tendrá el documento en la base de datos.
export interface PostInput {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId; // ID de autor, hace referencia a un usuario
}

// Definir la interfaz del Post con los métodos y propiedades de Mongoose (Document)
export interface PostDocument extends PostInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Definir el Schema de Mongoose para el modelo Post
const postSchema: Schema<PostDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Elimina los espacios al principio y final del título
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Se relaciona con el modelo de usuarios
      required: true,
    }
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

// Crear el modelo a partir del schema
const Post = mongoose.model<PostDocument>("Post", postSchema);

export default Post;
