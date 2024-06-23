import express, { Express } from "express";
import dotenv from "dotenv";
import { apiRouter } from "./app";
import helmet from "helmet";
import { connectToDb, disconnectFromDb } from "./data-access";
import { log } from "./app/middleware";

dotenv.config();

var cors = require("cors");

const app: Express = express();
const port = process.env.PORT || 3090;

// Express settings
app.disable("x-powered-by");

// Express middleware
const limit = "5mb";
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true }));

app.use(cors());

// Package middleware
app.use(helmet());
app.use(log);

app.use("/api", apiRouter);

async function start() {
  const uri = process.env.MONGO_URI || "";
  await connectToDb(uri);
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

start().catch((e) => {
  console.error(e);
  disconnectFromDb().then(() => process.exit(1));
});
