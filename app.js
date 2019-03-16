const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const db = require('./config/key').mongoURI;

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Router 사용
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server Listening at ${PORT}`);