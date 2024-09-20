import Bull from "bull";
import { sendEmail } from "./email";

export const emailQueue = new Bull("email-queue", {
  redis: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
}).process(sendEmail);
