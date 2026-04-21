const reviewsService = require('../services/reviews');
const booksService = require('../services/books');

module.exports = {
  getNewReviewForm: async (req, res) => {
    try {
      const book = await booksService.getBookById(req.params.bookId);
      res.render('reviews/new', { book });
    } catch (err) {
      req.flash('error', 'Book not found');
      res.redirect('/books');
    }
  },

  createReview: async (req, res) => {
    try {
      await reviewsService.createReview(req.params.bookId, req.body);
      req.flash('success', 'Review added!');
      res.redirect(`/books/${req.params.bookId}`);
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('back');
    }
  },
  updateReview: async (req, res) => {
    try {
      await reviewsService.updateReview(
        req.params.bookId,
        req.params.reviewId,
        req.body
      );
      req.flash('success', 'Review updated!');
      res.redirect(`/books/${req.params.bookId}`);
    } catch (err) {
      req.flash('error', err.message);
      res.redirect('back');
    }
  },

  deleteReview: async (req, res) => {
    try {
      await reviewsService.deleteReview(
        req.params.bookId,
        req.params.reviewId
      );
      req.flash('success', 'Review deleted!');
    } catch (err) {
      req.flash('error', err.message);
    }
    res.redirect(`/books/${req.params.bookId}`);
  }
};
