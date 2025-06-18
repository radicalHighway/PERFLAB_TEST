const express = require('express');
const path = require('path');
const morgan = require('morgan');
const removeHTTPHeader = require('../middleware/removeHeader');
const cors = require('cors');

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(removeHTTPHeader);
  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};

module.exports = serverConfig;