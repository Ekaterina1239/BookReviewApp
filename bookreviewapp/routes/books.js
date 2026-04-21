const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.route('/')
  .get(booksController.getAllBooks)
  .post(booksController.createBook);

router.get('/create', booksController.createBookForm);

router.route('/:id')
  .get(booksController.getBookById)
  .post(booksController.updateBook)
  .delete(booksController.deleteBook);

router.get('/:id/edit', booksController.updateBookForm);
router.post('/:id/delete', booksController.deleteBook);

module.exports = router;
