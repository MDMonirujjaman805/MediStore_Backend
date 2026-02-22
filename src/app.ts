import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './errors/globalErrorHandler';
import { AuthRoutes } from './modules/auth/auth.route';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth',AuthRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

// Global error middleware
app.use(globalErrorHandler);

export default app;
