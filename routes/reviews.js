const express = require('express')

const router = express.Router({ mergeParams: true })// pass {mergeParams: true} to the child router to access the params from the parent router

const catchAsync = require('../utils/catchAsync')  //async error handling
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemas') //JOI schema

const Review = require('../models/review')
const Campground = require('../models/campground')


const validateReview = (req, res, next) => { //server-side validation for adding reviews 
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { next() }
}


router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review) //creates a Review document
    campground.reviews.push(review)   // adds the Review document on campground reviews
    await review.save()
    await campground.save()
    req.flash('success','Successfully added Review!')
    res.redirect(`/campgrounds/${campground._id}`)
}))
router.delete('/:reviewId', catchAsync(async (req, res) => {

    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //$pull removes from reviews array all reviews matching reviewId

    req.flash('success','Review deleted!')
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;