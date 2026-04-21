const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewsController = require('../controllers/reviews');
const { isLoggedIn, checkReviewOwner } = require('../middleware');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));


router.get('/new', reviewsController.getNewReviewForm);
router.post('/', reviewsController.createReview);
router.put('/:reviewId', reviewsController.updateReview);
router.delete('/:reviewId', reviewsController.deleteReview);


router.post('/:reviewId/delete', reviewsController.deleteReview);


module.exports = router;
