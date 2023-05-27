const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(cors({
  origin: ['http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3002',
    'https://praktikum.mesto.nomoredomains.monster',
    'https://api.praktikum.mesto.nomoredomains.monster',
    'http://praktikum.mesto.nomoredomains.monster',
    'http://api.praktikum.mesto.nomoredomains.monster'],
  credentials: true,
}));

app.use(cookieParser());
app.use(requestLogger);
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');

app.use(express.json());
const { login, createUser } = require('./controllers/users');
const { signUpValidation, signInValidation } = require('./middlewares/validator');
const NotFoundError = require('./errors/not-found-error');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);
app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
