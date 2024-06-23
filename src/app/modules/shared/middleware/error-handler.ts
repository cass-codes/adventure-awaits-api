import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  // express defaults to 200 so the status code is never undefined
  if (res.statusCode < 400) {
    res.status(500);
  }

  console.error(err.message);
  res.sendStatus(res.statusCode);
}
