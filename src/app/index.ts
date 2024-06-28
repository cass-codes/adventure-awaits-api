import { Router } from "express";
import { healthRouter } from "./health-router";
import { screenRouter } from "./modules/screens/api/screen-router";
import { gameRouter } from "./modules/games/api/game-router";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/screen", screenRouter);
apiRouter.use("/games", gameRouter);

export { apiRouter };
