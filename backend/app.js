require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validate = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://mesto.garnett163.nomoreparties.co',
    ],
  }),
);

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validate.validateLogin, login);
app.post('/signup', validate.validateCreateUser, createUser);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена!'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
