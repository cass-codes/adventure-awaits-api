import { Response } from "express";
import { ScreenService } from "../service/screen-service";
import { GetScreenDTO } from "./validation";

export function getScreenById(req: GetScreenDTO, res: Response) {
  try {
    const screenId = req.params.screenId;
    const gameId = req.query.gameId;
    const screen = ScreenService.getScreenById(screenId);
    const evaluatedScreen = ScreenService.evaluateScreen(screen, gameId); // Will be done in [16]
    res.json(screen);
  } catch (error) {
    res.status(404).send(error);
  }
}
