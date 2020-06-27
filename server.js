const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const config = require('./config/main');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

// Connect to database
connectDB();

// Router Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body Parser
app.use(express.json());

// File Upload Middleware
app.use(fileUpload());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use(`${config.API_ENDPOINT}/bootcamps`, bootcamps);
app.use(`${config.API_ENDPOINT}/courses`, courses);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server on error & exit process
  server.close(process.exit(1));
});
