const express = require('express')
const { validateReview, isLoggedIn , isReviewAuthor} = require("../middleware");
const router = express.Router({ mergeParams: true })// pass {mergeParams: true} to the child router to access the params from the parent router
const catchAsync = require('../utils/catchAsync')  //async error handling

const reviews=require('../controllers/reviews')

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;