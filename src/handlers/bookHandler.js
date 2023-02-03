const Book = require('../models/Book');
const ErrorResponse = require('../models/ErrorResponse');
const SuccessResponse = require('../models/SuccesResponse');
const books = require('../data/books');

const addBookHandler = (req, h) => {
  try {
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;

    const newBook = new Book(name, year, author, summary, publisher, pageCount, readPage, reading);
    books.unshift(newBook);

    // if client dont input the 'name' property
    if (name === undefined) {
      return h.response(new ErrorResponse('fail', 'Gagal menambahkan buku. Mohon isi nama buku'))
        .code(400);
    }

    // if client inputed readPAge greater than pageCount
    if (readPage > pageCount) {
      return h.response(new ErrorResponse('fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'))
        .code(400);
    }

    return h.response(new SuccessResponse('success', 'Buku berhasil ditambahkan', { bookId: newBook.id }))
      .code(201);
  // catch generic error, return internal server error
  } catch {
    return h.response(new ErrorResponse('error', 'Buku gagal ditambahkan'))
      .code(500);
  }
};

const getAllBooks = (req, h) => {
  try {
    const booksResp = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
    return h.response(new SuccessResponse('success', 'Berhasil mendapatkan data buku', { books: [...booksResp] }))
      .code(200);
  } catch {
    return h.response(new ErrorResponse('fail', 'Gagal mendapatkan data buku'))
      .code(500);
  }
};

module.exports = { addBookHandler, getAllBooks };
