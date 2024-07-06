import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  entityCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { UserController, EntityController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://sanchobregin:test123@cluster0.hlcldmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Підключення до бази даних успішне"))
  .catch((err) => console.error("Помилка підключення до бази даних:", err));

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Привіт, світ!");
});

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/entities", EntityController.getAll);
app.get("/entities/:id", EntityController.getOne);
app.post(
  "/entities",
  checkAuth,
  entityCreateValidation,
  handleValidationErrors,
  EntityController.create
);
app.delete("/entities/:id", checkAuth, EntityController.remove);
app.patch(
  "/entities/:id",
  checkAuth,
  entityCreateValidation,
  handleValidationErrors,
  EntityController.update
);
app.put(
  "/entities/:id",
  checkAuth,
  entityCreateValidation,
  handleValidationErrors,
  EntityController.update
);

const PORT = process.env.PORT || 1924;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
