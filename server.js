const express = require('express');
const dotenv = require('dotenv');
const config = require('./config/main');
const logger = require('./middleware/logger');
// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Router Files
const bootcamps = require('./routes/bootcamps');

const app = express();

app.use(logger);

// Mount routers
app.use(`${config.API_ENDPOINT}/bootcamps`, bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
