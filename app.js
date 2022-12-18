const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate') //layout, partial and block template functions
const catchAsync = require('./utils/catchAsync')  //async error handling
const ExpressError = require('./utils/ExpressError')

const Review = require('./models/review') // use Review model

const { campgroundSchema, reviewSchema } = require('./schemas')

const Campground = require('./models/campground') //required, using model Campground 

//  MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true

});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// set the View engine to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/x-www-form-urlencoded

const methodOverride = require('method-override') // use HTTP verbs: PUT or DELETE in places where the client doesn’t support it.
app.use(methodOverride('_method'))


const validateCampground = (req, res, next) => { //server-side validation schema for campground 
    const { error } = campgroundSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { next() }
}

const validateReview = (req, res, next) => { //server-side validation for adding reviews 
    const { error } = reviewSchema.validate(req.body)

    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else { next() }
}


//ROUTES 

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/campgrounds', async (req, res) => { //create Page showing every campground on our DB
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/newCamp')
})


app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => { //the form req body{ campground: { title, location, price } }

    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)//Saving campground and redirecting to it
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => { // show page for every 'campground'
    const { id } = req.params //passing id from the request parameters
    const campground = await Campground.findById(id).populate('reviews') // populate: replacing the specified paths in the document with document(s) from other collection(s)
    res.render('campgrounds/show', { campground })
}));

app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground })
}));

app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res,) => {
    const { id } = req.params;
    // using spread operator on req.body object parsing campgroumd object
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${campground._id}`)
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => { // app Delete route, using form with DELETE method on show.ejs view
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}));

app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review) //creates a Review document
    campground.reviews.push(review)   // adds the Review document on campground reviews
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}))
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    console.log(req.params)
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //$pull removes from reviews array all reviews matching reviewId
    res.redirect(`/campgrounds/${id}`)
}))

app.all('*', (req, res, next) => {  // 
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {  //Error handling middleware, use after routes
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

