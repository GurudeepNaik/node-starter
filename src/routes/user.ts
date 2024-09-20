// src/routes/user.ts
import { Router } from "express";
import { createUserController, getUserController } from "../controllers/user";

const router = Router();

router.post("/", createUserController);
router.get("/:id", getUserController); // Get user by ID, utilizing Redis cache

export default router;
