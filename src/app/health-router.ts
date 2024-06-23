import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.send("Welcome to the health router");
});

export { healthRouter };
