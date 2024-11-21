import { object, string } from 'zod';

// Esquema de validación para un usuario
const userSchema = object({
    name: string({
        required_error: "Name is required",
    })
        .min(2, "Name must have at least 2 characters")
        .max(50, "Name must have at most 50 characters")
        .trim(), // Elimina espacios innecesarios al inicio y al final
    email: string({
        required_error: "Email is required",
    })
        .email("Invalid email address")
        .trim(), // Elimina espacios innecesarios
    password: string({
        required_error: "Password is required",
    })
        .min(8, "Password must have at least 8 characters")
        .max(100, "Password must have at most 100 characters")
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one letter and one number"
        ) // Requiere al menos una letra y un número
        .trim(),
});

export default userSchema;
