const controller = require('../controller/stock.controller');
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

  done();
};
