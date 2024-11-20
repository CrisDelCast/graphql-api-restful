import mongoose, { Document, Schema, Model } from 'mongoose';

// Interfaz para los datos de entrada de un usuario
export interface UserInput {
    name: string;
    email: string;
    password: string;
    role?: 'superadmin' | 'regular'; // El rol es opcional al ingresar datos (por defecto será 'regular')
}

// Interfaz para el documento de usuario que extiende Document e incluye fechas de creación, actualización y eliminación
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: 'superadmin' | 'regular';
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; // Campo opcional para la fecha de eliminación (soft delete)
}

// Definición del esquema de usuario
const userSchema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name must have at least 2 characters"],
            maxlength: [50, "Name must have at most 50 characters"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            index: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Invalid email format",
            ], // Validación básica de email
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must have at least 8 characters"],
        },
        role: {
            type: String,
            enum: ['superadmin', 'regular'],
            default: 'regular', // Valor predeterminado
        },
        deletedAt: {
            type: Date, // Incluido para soft delete (opcional)
            default: null,
        },
    },
    {
        timestamps: true, // Agrega createdAt y updatedAt automáticamente
        collection: 'users',
    }
);

// Middleware de Mongoose para limpieza antes de guardar
userSchema.pre('save', function (next) {
    this.name = this.name.trim();
    this.email = this.email.trim().toLowerCase(); // Normalización del email
    next();
});

// Creación del modelo de Mongoose
const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export default User;
