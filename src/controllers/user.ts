import { NextFunction, Request, Response } from "express";
import { createUser, getUserById } from "../services/user";
import { validateUser } from "../schemas/user";
import { errorResponse, successResponse } from "../utils/responses";

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = validateUser(req.body);

    if (!validation.success) {
      return errorResponse(res, 400, validation.error);
    }

    const user = await createUser(validation.data.email, validation.data.password);

    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = Number(req.params.id);

    const user = await getUserById(userId);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
};
