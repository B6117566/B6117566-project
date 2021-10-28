const { ffindUserRoleById } = require('../controller/userrole.controller');
const fp = require('fastify-plugin');

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', (req, reply) => {
    if (!req.UserRole_ID || !req.URL_AUTOR) {
      return reply.code(403).send({
        sucessful: false,
        result: { messages: 'Forbidden' },
      });
    }

    ffindUserRoleById(req.UserRole_ID)
      .then((result) => {
        let check = false;
        result.accessPart.map((item) => {
          if (item[0] === req.URL_AUTOR) {
            item[1].map((item2) => {
              if (item2 === req.routerMethod) {
                check = true;
              }
            });
          }
        });
        if (check) {
          next();
        } else {
          return reply.code(403).send({
            sucessful: false,
            result: { messages: 'Forbidden' },
          });
        }
      })
      .catch(() => {
        return reply.code(500).send({
          sucessful: false,
          result: { messages: 'Internal Server error' },
        });
      });
  });
});
