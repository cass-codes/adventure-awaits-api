import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { apiRouter } from "./api";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3090;

app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
