import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Configuración de base de datos y enrutadores
import db from './config/db';
import { router as userRouter } from './routes/userRoutes';
import { router as postRouter } from './routes/postRoutes';
import { router as commentRouter } from './routes/commentRoutes';
import { router as reactionRouter } from './routes/reactionRoutes';

// Configurar dotenv
dotenv.config();

class Server {
    private app: Express;
    private port: number | string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    // Configuración de middlewares
    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    // Configuración de rutas
    private routes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        this.app.use('/api/posts', postRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/comments', commentRouter);
        this.app.use('/api/reactions', reactionRouter);
    }

    // Middleware de manejo de errores
    private errorHandler(): void {
        this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
            console.error(err.stack);
            res.status(500).send({ error: 'Something went wrong!' });
        });
    }

    // Inicializar la conexión a la base de datos y el servidor
    public async start(): Promise<void> {
        try {
            await db;
            console.log('Database connected successfully');
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        }
    }
}

// Instancia del servidor y arranque
const server = new Server();
server.start();

// Exportación para Vercel
export default (req: Request, res: Response) => {
    res.send('Hello from Vercel!');
};
