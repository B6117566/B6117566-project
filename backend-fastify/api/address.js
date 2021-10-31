const controller = require('../controller/address.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
  fastify.post(
    '/',
    optsAuthorizationAndAccessControl,
    controller.insertAddress
  );

  fastify.delete(
    '/:address_id',
    optsAuthorizationAndAccessControl,
    controller.deleteAddress
  );
  fastify.put(
    '/:address_id',
    optsAuthorizationAndAccessControl,
    controller.updateAddress
  );

  fastify.get('/province/:province_id', controller.getAddressByProvinceId);

  next();
};
