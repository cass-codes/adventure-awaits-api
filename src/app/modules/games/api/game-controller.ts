import { NextFunction, Request, Response } from "express";
import { CreateGameDto } from "./validation/create-game-schema";
import { GameService } from "../service/game-service";
import {
  convertDtoToNewGame,
  convertDtoToPartialGame,
  convertGameToCreateResponse,
} from "./converters";
import { GameRepository } from "../data-access/game-repository";

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);

export async function createNewGame(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const game: CreateGameDto = req.body;
    const result = await gameService.createGame(convertDtoToNewGame(game));
    res.status(201).send(convertGameToCreateResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function getGame(req: Request, res: Response, next: NextFunction) {
  try {
    const gameId = req.params.gameId;
    const userId = req.query.userId as string;
    const game = await gameService.getGame(gameId, userId);
    res.status(200).send(game);
  } catch (error) {
    next(error);
  }
}

export async function updateGame(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const gameId = req.params.gameId;
    const game = convertDtoToPartialGame(req.body);
    const result = await gameService.updateGame(gameId, game);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getGames(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.query.userId as string;
    const games = await gameService.getGames(userId);
    res.status(200).send(games);
  } catch (error) {
    next(error);
  }
}
