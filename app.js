const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser= require('body-parser')
const cors = require('cors')

require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {AuthorizationMiddleware} = require('./auth/authorization')

const app = express();

app.use(bodyParser())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**Routes**/
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
