import { object, string, TypeOf } from 'zod';

// Definimos el esquema de validación para la creación de comentarios
const createCommentSchema = object({
    content: string({ required_error: "Content is required" })
        .min(1, "Content must be at least 1 character long"),  // Validamos que el contenido tenga al menos un carácter
    parent: string().optional(),  // Comentario opcional para respuestas
});

// Definimos el esquema de validación para actualizar comentarios
const updateCommentSchema = object({
    id: string({ required_error: "Comment ID is required" }),  // Validamos que el ID esté presente
    content: string().min(1, "Content must be at least 1 character long").optional(),  // Contenido opcional al actualizar
});

// Exportamos los tipos para su uso en los controladores o servicios
export type CreateCommentInput = TypeOf<typeof createCommentSchema>;  // Tipo para la creación de comentarios
export type UpdateCommentInput = TypeOf<typeof updateCommentSchema>;  // Tipo para la actualización de comentarios

export { createCommentSchema, updateCommentSchema };
