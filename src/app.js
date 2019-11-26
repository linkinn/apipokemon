require('./bootstrap');

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

require('./database');

const routes = require('./routes');

const globalError = require('./utils/globalError');

class App {
  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
    this.exception();
  }

  middleware() {
    this.server.use(helmet());
    const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour!'
    });
    this.server.use('/api', limiter);
    this.server.use(express.json({ limit: '10kb' }));
    this.server.use(mongoSanitize());
    this.server.use(xss());
  }

  routes() {
    this.server.use(routes);
  }

  exception() {
    this.server.use(globalError);
  }
}

module.exports = new App().server;
