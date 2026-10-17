import express from "express";
import dotenv from "dotenv";
import { connectBD } from "./src/config/db.js";
import { router as userRouter } from "./src/routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as projectRoute } from "./src/routes/projectRoute.js";
import { router as readmeRoute } from "./src/routes/readmeRoute.js";
import router from "./src/routes/githubRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "https://gemini-powered-readme-generator-4ab.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Successfully running!!",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/projects", projectRoute);
app.use("/api/readme", readmeRoute);
app.use("/api/github", router);

connectBD();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
