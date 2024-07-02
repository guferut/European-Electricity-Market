import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

mongoose
  .connect(
    "mongodb+srv://sanchobregin:test123@cluster0.hlcldmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB is Ok"))
  .catch((err) => console.log("DB error ", err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("111 hello wrld");
});

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    succsess: true,
  });

  //   console.log(req.body);
  //   const token = jwt.sign(
  //     {
  //       email: req.body.email,
  //       fullName: "vas9 lox",
  //     },
  //     "secret123"
  //   );
  //   res.json({
  //     success: true,
  //     token,
  //   });
});

app.listen(1924, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server good");
});
