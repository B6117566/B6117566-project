const controller = require('../controller/category.controller');
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
  fastify.get('/', controller.getCategorys);
  fastify.post(
    '/',
    optsAuthorizationAndAccessControl,
    controller.insertCategory
  );

  fastify.delete(
    '/:category_id',
    optsAuthorizationAndAccessControl,
    controller.deleteCategory
  );
  fastify.put(
    '/:category_id',
    optsAuthorizationAndAccessControl,
    controller.updateCategory
  );

  fastify.get('/gender/:gender_id', controller.getCategorysByGenderId);

  done();
};
