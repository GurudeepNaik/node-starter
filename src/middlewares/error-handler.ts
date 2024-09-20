import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responses";
import { logger } from "../utils/logger";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err);
  errorResponse(res, 500, "Something went wrong!");
}
