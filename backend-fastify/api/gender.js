const controller = require('../controller/gender.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
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

  next();
};
