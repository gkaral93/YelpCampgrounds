const mongoose = require('mongoose');
const Campground = require('../models/campground') //required, using model Campground 
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//connect to MongoDB 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let index = 0; index < 50; index++) {
        const rndm = Math.floor(Math.random() * 1000)
        const camp = new Campground({//Creating random campground documents using cities array
            location: `${cities[rndm].city}, ${cities[rndm].state}`,
            title: `${sample(places)} ${sample(descriptors)}`
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})
