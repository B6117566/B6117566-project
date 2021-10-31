module.exports = function (fastify, options, next) {
  fastify.decorateRequest('User_ID', '');
  fastify.decorateRequest('UserRole_ID', '');
  fastify.decorateRequest('URL_AUTOR', '');

  fastify.register(require('../api/address'), { prefix: '/address' });
  fastify.register(require('../api/auth'), { prefix: '/auth' });
  fastify.register(require('../api/cart'), { prefix: '/cart' });
  fastify.register(require('../api/category'), { prefix: '/category' });
  fastify.register(require('../api/class'), { prefix: '/class' });
  fastify.register(require('../api/gender'), { prefix: '/gender' });
  fastify.register(require('../api/order'), { prefix: '/order' });
  fastify.register(require('../api/product'), { prefix: '/product' });
  fastify.register(require('../api/province'), { prefix: '/province' });
  fastify.register(require('../api/size'), { prefix: '/size' });
  fastify.register(require('../api/stock'), { prefix: '/stock' });
  fastify.register(require('../api/user'), { prefix: '/user' });
  fastify.register(require('../api/userrole'), { prefix: '/userrole' });

  next();
};
