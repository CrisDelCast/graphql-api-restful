import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// La URL de conexión a MongoDB
const connectionString = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mydatabase';

const db = mongoose.connect(connectionString)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Database error: ", err));

export default db;
