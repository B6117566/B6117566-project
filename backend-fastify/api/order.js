const controller = require('../controller/order.controller');
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
  fastify.get('/', optsAuthorizationAndAccessControl, controller.getOrders);
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertOrder);

  fastify.get(
    '/user/:user_id',
    optsAuthorizationAndAccessControlAndUserAccess,
    controller.getOrdersByUserId
  );

  next();
};
