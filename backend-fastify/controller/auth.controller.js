const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRETKEY;

//------------------------------------------------------------------
module.exports = {
  checkExpiresAuthorization: function (req, reply) {
    const token = req.body.token;
    if (!token) {
      return reply.code(401).send({
        sucessful: false,
        result: { messages: 'Unauthorized' },
      });
    } else {
      jwt.verify(token, key, (err) => {
        if (err) {
          return reply.code(401).send({
            sucessful: false,
            result: { messages: 'Unauthorized' },
          });
        } else {
          return reply.code(200).send({
            sucessful: true,
          });
        }
      });
    }
  },
};
