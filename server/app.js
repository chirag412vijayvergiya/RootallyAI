const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const xss = require('xss-clean');
const exerciseRoutes = require('./Routes/exerciseRoutes');
const AppError = require('./utils/AppError');
const GlobalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
    headers: [
      'Content-Type',
      'Authorization',
      'X-Frame-Options',
      'access-control-allow-origin',
    ],
  }),
);
app.use(express.json({ limit: '10kb' }));
// app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use('/api/v1', exerciseRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
