import Redis from "ioredis";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});
