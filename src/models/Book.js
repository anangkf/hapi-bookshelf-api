/* eslint-disable import/no-extraneous-dependencies */
const { v4: uuid } = require('uuid');

class Book {
  constructor(name, year, author, summary, publisher, pageCount, readPage, reading) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = reading === pageCount;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = this.insertedAt;
  }
}

module.exports = Book;
