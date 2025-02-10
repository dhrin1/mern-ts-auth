import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDatabase from "./config/db";

import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/https";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import authRoutes from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.status(OK).json({
    status: "healthy",
  });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
