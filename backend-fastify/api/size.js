const controller = require('../controller/size.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
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

  next();
};
