'use strict';
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoSanitize = require('express-mongo-sanitize');
const dateFormat = require('date-fns/format');
const DATE_FORMAT_STRING = 'YYYY/MM/DD';
const todoRouter = require('./routes/todoRoutes');

const mongoose = require('mongoose');

dotenv.config({path: './.env'});

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

}).then(connection => {
  console.log('Connected to MongoDB!');
}).catch(console.error);

const app = express();
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(mongoSanitize());
const DEFAULT_PORT = 3000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/api/todos', todoRouter);

app.listen(process.env.PORT || DEFAULT_PORT, _ => {
  process.env.PORT && console.log(`listening in port ${process.env.PORT}...`);
  process.env.PORT || console.log(`listening in port ${DEFAULT_PORT}...`);
});
