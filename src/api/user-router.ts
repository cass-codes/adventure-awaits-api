import { Router } from "express";
import { getUser } from "../server/user";

const userRouter = Router();

userRouter.get("/", (req, res, next) => {
  const user = getUser();
  res.json(user);
});

export { userRouter };
