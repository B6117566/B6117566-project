const controller = require('../controller/auth.controller');

module.exports = function (fastify, options, done) {
  fastify.post('/', controller.checkExpiresAuthorization);
  done();
};
