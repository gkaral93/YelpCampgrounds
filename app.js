if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate"); //layout, partial and block template functions
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const catchAsync = require("./utils/catchAsync"); //async error handling
const ExpressError = require("./utils/ExpressError");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

const MongoDBStore = require('connect-mongo');

const dbUrl='mongodb://127.0.0.1:27017/yelp-camp'

//  MongoDB Connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// set the View engine to ejs
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

const methodOverride = require("method-override"); // use HTTP verbs: PUT or DELETE in places where the client doesn’t support it.
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); // root directory from which to serve static assets

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret: 'secret',
  touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
  console.log("Session store error!", e)
});

const sessionConfig = {
  store,
  name:'session',
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  
  res.locals.currentUser=req.user
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//ROUTES
app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes); // using router on Campgrounds
app.use("/campgrounds/:id/reviews", reviewRoutes); // using router on Reviews

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  //
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  //Error handling middleware, use after routes
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
