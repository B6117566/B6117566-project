const controller = require('../controller/product.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
  fastify.post(
    '/',
    optsAuthorizationAndAccessControl,
    controller.insertProduct
  );

  fastify.get('/:product_id', controller.findProductById);
  fastify.delete(
    '/:product_id',
    optsAuthorizationAndAccessControl,
    controller.deleteProduct
  );
  fastify.patch(
    '/:product_id',
    optsAuthorizationAndAccessControl,
    controller.updateProductSomeField
  );

  fastify.get('/gender/:gender_id', controller.getProductsAllByGender);

  fastify.get(
    '/category/:category_id',
    controller.getProductsAllByCategoryGender
  );

  fastify.get('/search/:s_product', controller.findProducts);

  next();
};
