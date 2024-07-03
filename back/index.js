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
  .then(() => console.log("DB is Ok"))
  .catch((err) => console.log("DB error ", err));

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // або інший ваш клієнтський URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("111 hello wrld");
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

app.listen(1924, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server good");
});
