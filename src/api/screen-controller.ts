import { Request, Response } from "express";
import { ScreenService } from "../server/ScreenService";

export function getScreenById(req: Request, res: Response) {
  try {
    const screenId = req.params.id;
    const screen = ScreenService.getScreenById(screenId);
    console.log(`sending screen with id: ${screen._id}`);
    res.json(screen);
  } catch (error) {
    res.status(404).send(error);
  }
}

export function getScreensByParentId(req: Request, res: Response) {
  try {
    const parentId = req.params.id;
    const screenIds = ScreenService.getScreenIdsByParentId(parentId);
    const screens = ScreenService.getScreensByIds(screenIds);
    res.json(screens);
  } catch (error) {
    res.status(404).send(error);
  }
}
