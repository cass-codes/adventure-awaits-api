import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { apiRouter } from "./api";
import { log } from "./api/middleware";

dotenv.config();

var cors = require("cors");

const app: Express = express();
const port = process.env.PORT || 3090;

app.use(express.json());

app.use(cors());

app.use(log);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
