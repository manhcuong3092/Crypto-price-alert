require('dotenv').config()

const express = require("express");
const routes = require("./router");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(PORT, () => console.log("Server started listening on http://localhost:5000 !"));
require("./workers/sendAlert");
