const { readData, writeData } = require('./books');

module.exports = {
  async createReview(bookId, reviewData) {
    const books = await readData();
    const book = books.find(b => b.id === bookId);
    
    if (!book) throw new Error('Book not found');
    
    
    if (!Array.isArray(book.reviews)) {
      book.reviews = [];
    }
    
    const newReview = {
      id: require('crypto').randomBytes(16).toString('hex'),
      ...reviewData,
      createdAt: new Date().toISOString()
    };
    
    book.reviews.push(newReview);
    await writeData(books);
    return newReview;
  },
  deleteReview: async (bookId, reviewId) => {
    const books = await readData();
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) throw new Error('Book not found');
    
    const reviewIndex = books[bookIndex].reviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) return false;
    
    books[bookIndex].reviews.splice(reviewIndex, 1);
    await writeData(books);
    return true;
  }
};
