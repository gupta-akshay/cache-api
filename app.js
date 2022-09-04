require('dotenv').config({ path: '.env' });
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const cacheRouter = require('./routes/cache');

const app = express();

Mongoose.connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME });
Mongoose.connection.on('error', (e) => {
  console.error('Error in MongoDB Connection');
  console.error(e);
  process.exit(1);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/cache', cacheRouter);

module.exports = app;
