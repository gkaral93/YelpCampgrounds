const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')
const ejsMate = require('ejs-mate') //layout, partial and block template functions

const catchAsync = require('./utils/catchAsync')  //async error handling
const ExpressError = require('./utils/ExpressError')

const Review = require('./models/review') // use Review model

const { reviewSchema } = require('./schemas') //JOI schema

const Campground = require('./models/campground') //required, using model Campground 

const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')


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

app.use(express.static(path.join(__dirname, 'public'))) // root directory from which to serve static assets

const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error=req.flash('error')
    next();
})

//ROUTES 
app.use('/campgrounds', campgrounds)

app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
});

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

