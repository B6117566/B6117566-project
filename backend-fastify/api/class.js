const controller = require('../controller/class.controller');
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
  fastify.get('/', controller.getClasses);
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertClass);

  fastify.delete(
    '/:class_id',
    optsAuthorizationAndAccessControl,
    controller.deleteClass
  );
  fastify.put(
    '/:class_id',
    optsAuthorizationAndAccessControl,
    controller.updateClass
  );

  done();
};
