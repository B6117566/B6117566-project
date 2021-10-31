const controller = require('../controller/class.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
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

  next();
};
