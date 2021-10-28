const controller = require('../controller/province.controller');
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
  fastify.get('/', controller.getProvinces);
  fastify.post(
    '/',
    optsAuthorizationAndAccessControl,
    controller.insertProvince
  );

  fastify.delete(
    '/:province_id',
    optsAuthorizationAndAccessControl,
    controller.deleteProvince
  );
  fastify.put(
    '/:province_id',
    optsAuthorizationAndAccessControl,
    controller.updateProvince
  );

  done();
};
