const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const host = 'localhost';
const port = 9000;

const init = async () => {
  const server = Hapi.server({
    host,
    port,
  });

  server.route(routes);

  await server.start();
  console.log(`Server is running on ${server.info.uri}`);
};

init();
