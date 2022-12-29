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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({//Creating random campground documents using cities array
            author: '63a6df26ba6998b58af04a76',
            location: `${cities[rndm].city}, ${cities[rndm].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            image: 'https://source.unsplash.com/random/?camping',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium eros eget feugiat tristique. Praesent dui risus, volutpat nec dignissim'
            , price
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})
