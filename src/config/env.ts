import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
});

const env = envSchema.safeParse(process.env);
if (!env.success) {
  console.error("Environment variable validation failed:", env.error.format());
  process.exit(1);
}

export default env.data;
