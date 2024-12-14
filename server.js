const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const ApiError = require('./utils/ApiError');
const globalError = require('./middlewares/errorMiddleware');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subcategoryRoute = require('./routes/subCategoryRoute');

// Connect with db
dbConnection();


// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
};

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subcategoryRoute);


// Create Error and send it to error handling middleware
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
});

// Global error handling middleware for (express)
app.use(globalError)


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});


// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1)
  })
})

