import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./errors/globalErrorHandler";
import router from "./routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Apollo Gears World!");
});

// Global error middleware
app.use(globalErrorHandler);

export default app;
