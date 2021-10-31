const controller = require('../controller/auth.controller');

module.exports = function (fastify, options, next) {
  fastify.post('/', controller.checkExpiresAuthorization);
  next();
};
