const {
  addBookHandler, getAllBooks, getBookDetail, editBookById,
} = require('../handlers/bookHandler');

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
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDetail,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookById,
  },
];

module.exports = routes;
