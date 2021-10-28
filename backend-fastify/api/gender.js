const controller = require('../controller/gender.controller');
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
  fastify.get('/', controller.getGenders);
  fastify.post('/', optsAuthorizationAndAccessControl, controller.insertGender);

  fastify.delete(
    '/:gender_id',
    optsAuthorizationAndAccessControl,
    controller.deleteGender
  );
  fastify.put(
    '/:gender_id',
    optsAuthorizationAndAccessControl,
    controller.updateGender
  );

  done();
};
