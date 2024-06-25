import { Router } from "express";
import { getScreenById } from "./screen-controller";
import { validationFactory } from "../../shared/middleware";
import { getScreenSchema } from "./validation";

const screenRouter = Router();

screenRouter.get(
  "/:screenId",
  validationFactory(getScreenSchema),
  getScreenById
);

export { screenRouter };
