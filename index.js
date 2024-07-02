import express from "express";

import mongoose from "mongoose";


import { registerValidation } from "./validations/auth.js";


import checkAuth from "./utils/checkAuth.js";

import * as UserController from './controllers/UserController.js'

mongoose
    .connect(
        "mongodb+srv://sanchobregin:test123@cluster0.hlcldmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("DB is Ok"))
    .catch((err) => console.log("DB error ", err));

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login);

app.get("/", (req, res) => {
    res.send("111 hello wrld");
});



app.post("/auth/register", registerValidation, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(1924, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("server good");
});
