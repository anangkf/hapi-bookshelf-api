/* eslint-disable no-shadow */
const Book = require('../models/Book');
const ErrorResponse = require('../models/ErrorResponse');
const SuccessResponse = require('../models/SuccesResponse');
let books = require('../data/books');
const getCurrentData = require('../libs/getCurrentData');

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
    const { name, reading, finished } = req.query;
    const booksResp = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
    // get all unreading books
    if (reading === '0') {
      const unreadingBooks = books.filter((item) => item.finished === false)
        .map(({ id, name, publisher }) => ({ id, name, publisher }));
      return h.response(new SuccessResponse('success', 'Berhasil mendapatkan data buku', { books: [...unreadingBooks] }))
        .code(200);
    }
    // get all reading books
    if (reading === '1') {
      const readingBooks = books.filter((item) => item.reading === true)
        .map(({ id, name, publisher }) => ({ id, name, publisher }));
      return h.response(new SuccessResponse('success', 'Berhasil mendapatkan data buku', { books: [...readingBooks] }))
        .code(200);
    }

    return h.response(new SuccessResponse('success', 'Berhasil mendapatkan data buku', { books: [...booksResp] }))
      .code(200);
  } catch {
    return h.response(new ErrorResponse('fail', 'Gagal mendapatkan data buku'))
      .code(500);
  }
};

const getBookDetail = (req, h) => {
  try {
    const { bookId } = req.params;
    const [book] = getCurrentData(books, bookId);
    if (book) {
      return h.response(new SuccessResponse('success', 'Berhasil mendapatkan data buku.', { book }))
        .code(200);
    }
    return h.response(new ErrorResponse('fail', 'Buku tidak ditemukan'))
      .code(404);
  } catch {
    return h.response(new ErrorResponse('fail', 'Gagal mendapatkan data buku'))
      .code(500);
  }
};

const editBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;
    const [book] = getCurrentData(books, bookId);

    if (!name) {
      return h.response(new ErrorResponse('fail', 'Gagal memperbarui buku. Mohon isi nama buku'))
        .code(400);
    }
    if (readPage > pageCount) {
      return h.response(new ErrorResponse('fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'))
        .code(400);
    }
    if (!book) {
      return h.response(new ErrorResponse('fail', 'Gagal memperbarui buku. Id tidak ditemukan'))
        .code(404);
    }

    // manipulate bookshelf only if all condition passed
    books = books.map((item) => {
      if (item.id === bookId) {
        return {
          ...item, name, year, author, summary, publisher, pageCount, readPage, reading,
        };
      }
      return item;
    });
    return h.response(new SuccessResponse('success', 'Buku berhasil diperbarui'))
      .code(200);
  } catch {
    return h.response(new ErrorResponse('fail', 'Gagal mendapatkan data buku'))
      .code(500);
  }
};

const deleteBookById = (req, h) => {
  try {
    const { bookId } = req.params;
    const [book] = getCurrentData(books, bookId);
    books = books.filter((item) => item.id !== bookId);
    if (!book) {
      return h.response(new ErrorResponse('fail', 'Buku gagal dihapus. Id tidak ditemukan'))
        .code(404);
    }
    return h.response(new SuccessResponse('success', 'Buku berhasil dihapus'))
      .code(200);
  } catch {
    return h.response(new ErrorResponse('fail', 'Gagal mendapatkan data buku'))
      .code(500);
  }
};

module.exports = {
  addBookHandler, getAllBooks, getBookDetail, editBookById, deleteBookById,
};
