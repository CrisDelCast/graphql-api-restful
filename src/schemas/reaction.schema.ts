import { z, ZodTypeAny } from 'zod';

// Definimos el esquema base de validación
const baseReactionSchema = z.object({
    type: z
        .string({ required_error: "Reaction type is required" })
        .refine(
            (val) => ["like", "love", "disagree"].includes(val),
            { message: "Invalid reaction type. Allowed values: like, love, disagree" }
        ),
    comment: z
        .string({ required_error: "Comment ID is required" })
        .min(1, "Comment ID cannot be empty"),
});

// Esquema para crear una reacción (extiende el baseReactionSchema)
const createReactionSchema = baseReactionSchema;

// Esquema para eliminar una reacción
const deleteReactionSchema = z.object({
    id: z
        .string({ required_error: "Reaction ID is required" })
        .min(1, "Reaction ID cannot be empty"),
});

// Tipos derivados de los esquemas
export type CreateReactionInput = z.infer<typeof createReactionSchema>;
export type DeleteReactionInput = z.infer<typeof deleteReactionSchema>;

export { createReactionSchema, deleteReactionSchema };
