import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('111 hello wrld');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    const token = jwt.sign({
        email: req.body.email,
        fullName: 'vas9 lox',
    },
        'secret123',
    );
    res.json({
        success: true,
        token,
    })
})

app.listen(1924, (err) => {
    if (err) {
        return console.log(err);

    }
    console.log('server good');
});