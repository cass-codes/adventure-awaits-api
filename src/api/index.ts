import { Router } from "express";
import { healthRouter } from "./health-router";
import { screenRouter } from "./screen-router";
import { saveRouter } from "./save-router";
import { userRouter } from "./user-router";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/screen", screenRouter);
apiRouter.use("/save", saveRouter);
apiRouter.use("/user", userRouter);

export { apiRouter };
