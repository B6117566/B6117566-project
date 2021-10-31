const controller = require('../controller/stock.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertStock);

  fastify.delete(
    '/:stock_id',
    optsAuthorizationAndAccessControl,
    controller.deleteStock
  );
  fastify.patch(
    '/:stock_id',
    optsAuthorizationAndAccessControl,
    controller.updateStockSomeField
  );

  fastify.get('/product/:product_id', controller.getStocksByProductId);

  next();
};
