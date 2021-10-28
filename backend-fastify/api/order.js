const controller = require('../controller/order.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');
const userAccess = require('../middleware/userAccess');

const optsAuthorizationAndAccessControl = {
  preHandler: function (request, reply, done) {
    fastify.register(authorization);
    fastify.register(accessControl);
    done();
  },
};

const optsAuthorizationAndAccessControlAndUserAccess = {
  preHandler: function (request, reply, done) {
    fastify.register(authorization);
    fastify.register(accessControl);
    fastify.register(userAccess);
    done();
  },
};

module.exports = function (fastify, options, done) {
  fastify.get('/', optsAuthorizationAndAccessControl, controller.getOrders);
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertOrder);

  fastify.get(
    '/user/:user_id',
    optsAuthorizationAndAccessControlAndUserAccess,
    controller.getOrdersByUserId
  );

  done();
};
