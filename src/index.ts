import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { ApolloServer, gql } from 'apollo-server-express';
import db from './config/db';  // Asegúrate de que db esté configurado correctamente
import { router as userRouter } from './routes/userRoutes';
import { router as postRouter } from './routes/postRoutes';
import { router as commentRouter } from './routes/commentRoutes';
import { router as reactionRouter } from './routes/reactionRoutes';

dotenv.config();

class Server {
    private app: express.Application;  // Usamos 'express.Application'
    private port: number | string;

    constructor() {
        this.app = express();  // Inicializamos Express correctamente
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
        // Rutas REST
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        this.app.use('/api/posts', postRouter);
        this.app.use('/api/users', userRouter);
        this.app.use('/api/comments', commentRouter);
        this.app.use('/api/reactions', reactionRouter);

        // Ruta para GraphQL usando Apollo Server
        this.createApolloServer().applyMiddleware({ app: this.app, path: '/graphql' });
    }

    // Definición del esquema y resolvers de GraphQL
    private createApolloServer() {
        const typeDefs = gql`
            type Query {
                hello: String
                users: [String]
            }

            type Mutation {
                addUser(name: String!): String
            }
        `;

        const resolvers = {
            Query: {
                hello: () => '¡Hola desde GraphQL!',
                users: () => ['Usuario1', 'Usuario2'],
            },
            Mutation: {
                addUser: (_: any, { name }: { name: string }) => {
                    return `Usuario ${name} agregado con éxito.`;
                },
            },
        };

        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        return server;
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
                console.log(`GraphQL is available at http://localhost:${this.port}/graphql`);
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
