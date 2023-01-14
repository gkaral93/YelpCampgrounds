const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')  //async error handling
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground') //required, using model Campground 

const campgrounds = require('../controllers/campgrounds') // Campgrounds Controller functions

const { isLoggedIn } = require("../middleware");
const { isAuthor } = require("../middleware");
const { validateCampground } = require("../middleware");

router.route('/')
.get(catchAsync(campgrounds.index)) //All campgrounds
.post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))

router.get("/new", isLoggedIn, campgrounds.renderNewForm); //isLoggedIn requires authentication in order to use the route

router.route('/:id')
.get(catchAsync(campgrounds.getCampground))
.put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router