require('dotenv').config({ path: '../.env' });
const fastify = require('fastify')({ logger: false });
//--------------------------------------------------------------------------

//middleware
fastify.addHook('onRequest', (req, reply, done) => {
  reply.header(
    'Access-Control-Allow-Origin',
    process.env.BACKEND_ACCESS_CONTROL_ORIGIN
  );
  reply.header(
    'Access-Control-Allow-Methods',
    process.env.BACKEND_ACCESS_CONTROL_METHODS
  );
  reply.header(
    'Access-Control-Allow-Headers',
    process.env.BACKEND_ACCESS_CONTROL_HEADER
  );
  done();
});

//Connect Database
fastify.register(require('./middleware/database'));
//----------------------------------------------------------------------------

// Declare a route Endpoint (API)
fastify.register(require('./routes/v1'), { prefix: '/api/v1' });

fastify.all('*', (req, reply) => {
  reply.code(501).send({
    sucessful: false,
    result: { messages: 'Method Not Implemented' },
  });
});
//----------------------------------------------------------------------------

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.BACKEND_PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
