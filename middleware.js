const Campground = require('./models/campground') //required, using model Campground 
const Review = require('./models/review')

const { campgroundSchema,reviewSchema } = require('./schemas') //JOI schema
const ExpressError = require('./utils/ExpressError')


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; //User isnt logged in -> we save the requested path before log in
    req.flash("error", "You must sign in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  //server-side validation schema for campground
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  // Authorization middleware
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    // Route Authorization
    req.flash("error", "No permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => { //server-side validation for adding reviews 
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { next() }
}

module.exports.isReviewAuthor = async (req, res, next) => {
  // Authorization middleware
  const {id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    // Route Authorization
    req.flash("error", "No permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};
