const { readData, writeData } = require('../services/books.js');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  getAllBooks: async (req, res) => {
    const books = await readData();
    res.render('index', { books: books || [] });
  },

  getBookById: async (req, res) => {
    const books = await readData();
    const book = books.find(b => b.id === req.params.id);
    res.render('book', { book });
  },

  createBookForm: (req, res) => {
    res.render('edit', { book: null, action: '/', method: 'POST' });
  },

  createBook: async (req, res) => {
    const books = await readData();
    const newBook = {
      id: uuidv4(),
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      description: req.body.description,
      reviews: []
    };
    books.push(newBook);
    await writeData(books);
    res.redirect(`/${newBook.id}`);
  },

  updateBookForm: async (req, res) => {
    const books = await readData();
    const book = books.find(b => b.id === req.params.id);
    res.render('edit', { 
      book, 
      action: `/${book.id}`, 
      method: 'POST',
      hiddenMethod: 'PUT'
    });
  },

  updateBook: async (req, res) => {
    const books = await readData();
    const index = books.findIndex(b => b.id === req.params.id);
    books[index] = { 
      ...books[index], 
      title: req.body.title,
      author: req.body.author,
      year: req.body.year,
      description: req.body.description
    };
    await writeData(books);
    res.redirect(`/${req.params.id}`);
  },

  deleteBook: async (req, res) => {
    const books = await readData();
    const filteredBooks = books.filter(b => b.id !== req.params.id);
    await writeData(filteredBooks);
    res.redirect('/');
  }
};