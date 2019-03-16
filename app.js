const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const userRouter = require('./routes/users');

//const db = require('./config/key').mongoURI;

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Router 사용
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server Listening at ${PORT}`);