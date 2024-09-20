import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createServer } from "http";

import userRoutes from "../routes/user";
import { socket } from "./socket";
import { errorHandler } from "../middlewares/error-handler";
import { redis } from "../utils/db";

const app = express();
const httpServer = createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: ["./routes/*.ts"],
};


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const sessionMiddleware = session({
  store: new RedisStore({ client: redis }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' },
});

app.use(sessionMiddleware);

app.use(helmet());

app.use(limiter);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

socket(httpServer);

app.use(errorHandler);

export default httpServer;
