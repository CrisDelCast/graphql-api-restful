import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import db from './config/db';
import { router as userRouter } from './routes/userRoutes';
import { router as postRouter } from './routes/postRoutes';
import { router as commentRouter } from './routes/commentRoutes';
import { router as reactionRouter } from './routes/reactionRoutes';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { reactionTypeDefs } from './graphql/schemas/reaction.schema';
import { reactionResolvers } from './graphql/resolvers/reaction.resolver';
dotenv.config();

const typeDefs = `
  reactionTypeDefs
`;

const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL with TypeScript!",
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

class Server {
  private app: Express;
  private port: number | string;
  private apolloServer!: ApolloServer;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  // Initialize Apollo Server
  private async initApolloServer(): Promise<void> {
    try {
      this.apolloServer = new ApolloServer({
        typeDefs: [reactionTypeDefs],
        resolvers: [reactionResolvers],
    });
      await this.apolloServer.start();
      (this.apolloServer as any).applyMiddleware({ app: this.app });
      console.log(`GraphQL endpoint ready at ${this.apolloServer.graphqlPath}`);
    } catch (error) {
      console.error('Error initializing Apollo Server:', error);
    }
  }

  // Configuration of middlewares
  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Configuration of routes
  private routes(): void {
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('Hello World!');
    });

    this.app.use('/api/posts', postRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/comments', commentRouter);
    this.app.use('/api/reactions', reactionRouter);
  }

  // Error handling middleware
  private errorHandler(): void {
    this.app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send({ error: 'Something went wrong!' });
    });
  }

  // Initialize the database, Apollo Server, and the application
  public async start(): Promise<void> {
    try {
      await db;
      console.log('✅ Database connected successfully');

      await this.initApolloServer();

      this.app.listen(this.port, () => {
        console.log(`🚀 Server running on http://localhost:${this.port}`);
      });
    } catch (err) {
      console.error('Failed to start the server:', err);
    }
  }
}

// Instantiate and start the server
const server = new Server();
server.start();

// Exportación para Vercel 
// export default (req: Request, res: Response) => {
//   res.send('Hello from Vercel!');
// };

export default server;