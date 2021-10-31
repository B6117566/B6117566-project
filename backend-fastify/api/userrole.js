const controller = require('../controller/userrole.controller');
const authorization = require('../middleware/authorize');
const accessControl = require('../middleware/accessControl');

const optsAuthorizationAndAccessControl = {
  preHandler: [authorization, accessControl],
};

module.exports = function (fastify, options, next) {
  fastify.get('/', controller.getUserRoles);
  fastify.post(
    '/',
    optsAuthorizationAndAccessControl,
    controller.insertUserRole
  );

  fastify.delete(
    '/:userRole_id',
    optsAuthorizationAndAccessControl,
    controller.deleteUserRole
  );
  fastify.patch(
    '/:userRole_id',
    optsAuthorizationAndAccessControl,
    controller.updateUserRole
  );

  fastify.post('/position', controller.findUserRoleById);

  fastify.get('/position/user', controller.getUserRoleOfUser);

  next();
};
