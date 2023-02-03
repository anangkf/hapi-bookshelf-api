const { addBookHandler, getAllBooks } = require('../handlers/bookHandler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
];

module.exports = routes;
