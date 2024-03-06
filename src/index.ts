import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { apiRouter } from "./api";
import { log } from "./api/middleware";
import { connectToDb, disconnectFromDb } from "./data-access";

dotenv.config();

var cors = require("cors");

async function start() {
  const uri = process.env.MONGO_URI || "";
  await connectToDb(uri);

  const app: Express = express();
  const port = process.env.PORT || 3090;

  app.use(express.json());

  app.use(cors());

  app.use(log);

  app.use("/api", apiRouter);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start().catch((e) => {
  disconnectFromDb();
});
