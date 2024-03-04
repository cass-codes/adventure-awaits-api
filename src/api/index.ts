import { Router } from "express";
import { healthRouter } from "./health-router";
import { screenRouter } from "./screen-router";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/screen", screenRouter);

export { apiRouter };
