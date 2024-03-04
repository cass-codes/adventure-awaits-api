import { Request, Response } from "express";
import { ScreenService } from "../server/ScreenService";

export function getScreenById(req: Request, res: Response) {
  try {
    const screenId = req.params.id;
    const screen = ScreenService.getScreenById(screenId);
    res.json(screen);
  } catch (error) {
    res.status(404).send(error);
  }
}
