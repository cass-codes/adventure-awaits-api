import { Router } from "express";

const screenRouter = Router();

screenRouter.get("/", (req, res) => {
  res.send("Welcome to the screen router");
});

export { screenRouter };
