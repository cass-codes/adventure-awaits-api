import { Response } from "express";
import { ScreenService } from "../service/screen-service";
import { GetScreenDTO } from "./validation";

export function getScreenById(req: GetScreenDTO, res: Response) {
  try {
    const screenId = req.params.screenId;
    const { gameId, userId } = req.query;
    const screen = ScreenService.getScreenById(screenId);
    const evaluatedScreen = ScreenService.evaluateScreen(
      screen,
      gameId,
      userId
    );
    res.json(evaluatedScreen);
  } catch (error) {
    res.status(404).send(error);
  }
}
