import { Job } from "bull";
import {logger} from "../utils/logger";
import nodemailer from "nodemailer";

export const sendEmail = async (job: Job) => {
  const { to, subject, text } = job.data;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  logger.info(`Email sent to ${to}`);
};
