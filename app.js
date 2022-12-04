const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

var methodOverride = require('method-override') // use HTTP verbs: PUT or DELETE in places where the client doesn’t support it.
app.use(methodOverride('_method'))

const Campground = require('./models/campground') //required, using model Campground 


app.use(bodyParser.urlencoded({ extended: true }))
// for parsing application/x-www-form-urlencoded

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

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
app.post('/campgrounds', async (req, res) => { //the form req body is { campground: { title, location } }
    const campground = new Campground(req.body.campground)
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)//Saving campground and redirecting to it
})

app.get('/campgrounds/:id', async (req, res) => { // show page for every 'campground'
    const { id } = req.params //passing id from the request parameters
    const campground = await Campground.findById(id)
    res.render('campgrounds/show', { campground })
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground })
})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    // using spread operator on req.body object parsing campgroumd object
    await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    res.redirect(`/campgrounds/${id}`)
})

app.delete('/campgrounds/:id', async (req, res) => { // app Delete route, using form with DELETE method on show.ejs view
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

