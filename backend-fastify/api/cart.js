const controller = require('../controller/cart.controller');
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
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertCart);

  fastify.delete(
    '/:cart_id',
    optsAuthorizationAndAccessControl,
    controller.deleteCart
  );
  fastify.patch(
    '/:cart_id',
    optsAuthorizationAndAccessControl,
    controller.updateCartSomeField
  );

  fastify.get(
    '/user/:user_id',
    optsAuthorizationAndAccessControlAndUserAccess,
    controller.getCartsByUserId
  );

  done();
};
