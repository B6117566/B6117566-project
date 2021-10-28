const controller = require('../controller/address.controller');
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

  done();
};
