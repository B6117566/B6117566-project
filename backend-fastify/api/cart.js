const controller = require('../controller/cart.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');
const userAccess = require('../middleware/userAccess');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

const optsAuthorizationAndAccessControlAndUserAccess = {
  preHandler: [authorization, accessControl, userAccess],
};

module.exports = function (fastify, options, next) {
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

  next();
};
