import globalErrorHandler from "./errors/globalErrorHandler";
import express, { Application } from "express";
import router from "./routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

// Global error middleware
app.use(globalErrorHandler);

export default app;
