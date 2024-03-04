import { Router } from "express";
import { getScreenById, getScreensByParentId } from "./screen-controller";

const screenRouter = Router();

screenRouter.get("/:id/nextScreens", getScreensByParentId);

screenRouter.get("/:id", getScreenById);

export { screenRouter };
