const controller = require('../controller/size.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: function (request, reply, done) {
    fastify.register(authorization);
    fastify.register(accessControl);
    done();
  },
};

module.exports = function (fastify, options, done) {
  fastify.get('/', controller.getSizes);
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertSize);

  fastify.delete(
    '/:size_id',
    optsAuthorizationAndAccessControl,
    controller.deleteSize
  );
  fastify.patch(
    '/:size_id',
    optsAuthorizationAndAccessControl,
    controller.updateSize
  );

  done();
};
