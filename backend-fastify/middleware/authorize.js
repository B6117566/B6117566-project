const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRETKEY;
const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', (req, reply) => {
    const token = req.headers['authorization'];

    if (!token) {
      return reply.code(401).send({
        sucessful: false,
        result: { messages: 'Unauthorized' },
      });
    } else {
      jwt.verify(token, key, (err, decode) => {
        if (err) {
          return reply.code(401).send({
            sucessful: false,
            result: { messages: 'Unauthorized' },
          });
        } else {
          req.User_ID = decode._id;
          req.UserRole_ID = decode.userRole._id;
          req.URL_AUTOR = '/' + req.routerPath.split('/')[3];
          next();
        }
      });
    }
  });
});
