require('dotenv').config({ path: '../.env' });

const address = require('../test/Address.json');

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: false });

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send(address);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
