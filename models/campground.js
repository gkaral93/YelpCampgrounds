const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const Review = require("./review");
const { findOneAndDelete } = require("./review");
const Schema = mongoose.Schema;

//Everything in Mongoose starts with a Schema
const CampgroundSchema = new Schema({
  title: String, //{type: String}
  price: Number,
  image: String,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

// converting CampgroundSchema into a Model and exporting from the module
const Campground = mongoose.model("Campground", CampgroundSchema); // creating collection campgrounds

module.exports = Campground;
