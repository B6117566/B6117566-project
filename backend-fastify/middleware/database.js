const mongoose = require('mongoose');
const fp = require('fastify-plugin');

const url = `mongodb://${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_SCHEMA}`;
const config = {
  autoIndex: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', async (req, reply) => {
    try {
      await mongoose.connect(url, config);
    } catch (error) {
      reply.code(500).send({
        sucessful: false,
        result: { messages: 'Internal Server error' },
      });
    }
  });
  next();
});
