const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  // const token = req.cokies.jwt;
  let payload;
  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
