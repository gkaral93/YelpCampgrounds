const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')  //async error handling
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground') //required, using model Campground 

const { isLoggedIn } = require("../middleware");
const { isAuthor } = require("../middleware");
const { validateCampground } = require("../middleware");

router.get('/', async (req, res) => { //create Page showing every campground on our DB
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
});

router.get("/new", isLoggedIn, (req, res) => { //isLoggedIn requires authentication in order to use the route
  res.render("campgrounds/newCamp");
});

router.post('/',isLoggedIn, validateCampground, catchAsync(async (req, res) => { //the form req body{ campground: { title, location, price } }
    const campground = new Campground(req.body.campground)
    campground.author = req.user._id  //when campground added, the req.user property is set to the authenticated user
    await campground.save();
    req.flash('success','Successfully added new Campground!')
    res.redirect(`/campgrounds/${campground._id}`)//Saving campground and redirecting to it
}))

router.get('/:id', catchAsync(async (req, res) => { // show page for every 'campground'
    const { id } = req.params //passing id from the request parameters
    const campground = await Campground.findById(id).populate(
        {path:'reviews',
        populate:{path:'author'}} //populate Campground with  the reviews, populate each review with the author
    ).populate('author') // populate Campground with author 
    if(!campground){
    req.flash('error','Campground not found!')
    return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
      req.flash("error", "Campground not found!");
      return res.redirect("/campgrounds");
    }
    res.render('campgrounds/edit', { campground })
}));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res,) => {
    const { id } = req.params;
    // using spread operator on req.body object parsing campgroumd object
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    req.flash('success','Successfully updated Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => { // app Delete route, using form with DELETE method on show.ejs view
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success','Campground removed!')
    res.redirect('/campgrounds')
}));
module.exports = router