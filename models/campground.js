const mongoose = require('mongoose');
const Schema = mongoose.Schema

//Everything in Mongoose starts with a Schema
const CampgroundSchema = new Schema({
    title: String, //{type: String}
    price: Number,
    image: String,
    description: String,
    location: String
})

// converting CampgroundSchema into a Model and exporting from the module
const Campground = mongoose.model('Campground', CampgroundSchema) // creating collection campgrounds
module.exports = Campground