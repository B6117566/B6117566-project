require('dotenv').config({ path: '../.env' });
const fastify = require('fastify')({ logger: false });
//--------------------------------------------------------------------------

//CORS
fastify.register(require('fastify-cors'), {
  origin: process.env.BACKEND_ACCESS_CONTROL_ORIGIN,
  methods: process.env.BACKEND_ACCESS_CONTROL_METHODS,
  allowedHeaders: process.env.BACKEND_ACCESS_CONTROL_HEADER,
});

//Connect Database
fastify.register(require('./middleware/database'));
//----------------------------------------------------------------------------

// Declare a route Endpoint (API)
fastify.register(require('./routes/v1'), { prefix: '/api/v1' });

fastify.route({
  method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT'],
  url: '*',
  handler: function (req, reply) {
    reply.code(501).send({
      sucessful: false,
      result: { messages: 'Method Not Implemented' },
    });
  },
});
//----------------------------------------------------------------------------

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.BACKEND_PORT);
  } catch (error) {
    throw error;
  }
};

start();
