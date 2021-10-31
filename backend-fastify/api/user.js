const controller = require('../controller/user.controller');
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
  fastify.post('/signup', controller.signupUser);
  
  fastify.post('/signin', controller.signinUser);

  fastify.get(
    '/:user_id',
    optsAuthorizationAndAccessControlAndUserAccess,
    controller.findUserById
  );
  fastify.delete(
    '/:user_id',
    optsAuthorizationAndAccessControl,
    controller.deleteUser
  );
  fastify.patch(
    '/:user_id',
    optsAuthorizationAndAccessControl,
    controller.updateUserSomeField
  );

  next();
};
