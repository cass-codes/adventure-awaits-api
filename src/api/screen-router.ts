import { Router } from "express";
import { getScreenById } from "./screen-controller";

const screenRouter = Router();

screenRouter.get("/:id", getScreenById);

export { screenRouter };
