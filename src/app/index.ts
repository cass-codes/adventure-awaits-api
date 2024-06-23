import { Router } from "express";
import { healthRouter } from "./health-router";
import { screenRouter } from "./screen-router";
import { saveRouter } from "./save-router";
import { gameRouter } from "./modules/games/api/game-router";

const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/screen", screenRouter);
apiRouter.use("/save", saveRouter);
apiRouter.use("/game", gameRouter);

export { apiRouter };