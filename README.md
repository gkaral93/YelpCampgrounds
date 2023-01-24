![](https://i.imgur.com/w4e9Jn5.png)
![](https://i.imgur.com/B7kCfkY.png)
## About The Project
YelpCampgrounds is a yelp style, campground themed website. It allows for users to browse and search campgrounds that the community adds. The campgrounds are rated using a "like" system, and the users are able to talk about the campgrounds through a campground comment system. Once you login or signup you can begin to create your own campgrounds that includes a title, image, address and short description.

### Built With

- [Express.js](https://expressjs.com/)
- [Nodejs](https://nodejs.org/en/)
- [EJS](https://ejs.co/)
- [MongoDB](https://www.mongodb.com/)

## Technologies

### Database
- <strong> [MongoDB 4.0.18](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=bing&utm_campaign=bs_americas_canada_search_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&msclkid=48a2049cd3351ec1ff715b9250ce48fd) </strong>
  - For storing data in a NoSQL database.

### Back-end
- <strong> [Node.js: 14.4.0](https://nodejs.org/en/) </strong>
  - JavaScript runtime built on Chrome's V8 JavaScript engine.
- <strong> [npm 6.14.5](https://www.npmjs.com/) </strong>
  - Node Package Manager (like a Javascript dependency manager).
  - It allows you to easily install 3rd party Javascript Node.js libraries.

#### NPM packages
- <strong> [Express ^4.18.2](https://expressjs.com/) </strong>
- <strong> [Mongoose ^6.7.5](https://mongoosejs.com/) </strong>
- [bcrypt](https://www.npmjs.com/package/bcrypt)
  - For password encryption.
- [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs)
- [body-parser](https://www.npmjs.com/package/body-parser)
  - For parsing request bodies.
- [connect-flash](https://www.npmjs.com/package/connect-flash)
  - For flash messages.
- [dotenv](https://www.npmjs.com/package/dotenv)
  - For environment variables.
- [express-session](https://www.npmjs.com/package/express-session)
  - For storing session data.
- [method-override](https://www.npmjs.com/package/method-override)
  - For overriding HTTP verbs.
- [passport](https://www.npmjs.com/package/passport)
  - For authentication.
- [passport-local](https://www.npmjs.com/package/passport-local)
  - For local username and password authentication strategy for passport.js.
- [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
  - Mongoose plugin for simplifying username/password authentication.
  
### Front-end
- <strong> [EJS](https://ejs.co/) </strong>
  - Javascript templating engine used for building html pages.
- <strong> [Bootstrap](https://getbootstrap.com/) </strong>
  - Open source CSS framework used for creating responsive mobile-first web pages.

#### Other NPM packages used for Front-end
- [uuid](https://www.npmjs.com/package/uuid)
  - For creating Universally Unique ID's.
  
<div align="center">
  <h2>- Development Process -</h2>
</div>

## Initial Setup

- [x] Add Landing Page
- [x] Add Campgrounds Page that lists all campgrounds

## Each Campground has:

- [x] Name
- [x] Image

## Layout and Basic Styling

- [x] Create our header and footer partials
- [x] Add in Bootstrap

## Creating New Campgrounds

- [x] Setup new campground POST route
- [x] Add in body-parser
- [x] Setup route to show form
- [x] Add basic unstyled form

## Style the campgrounds page

- [x] Add a better header/title
- [x] Make campgrounds display in a grid

## Style the Navbar and Form

- [x] Add a navbar to all templates
- [x] Style the new campground form

## Add Mongoose

- [x] Install and configure Mongoose
- [x] Setup campground model
- [x] Use campground model inside of our routes

## Show Page

- [x] Review the RESTful routes we've seen so far
- [x] Add description to our campground model
- [x] Show db.collection.drop()
- [x] Add a show route/template

## Refactor Mongoose Code

- [x] Create a models directory
- [x] Use module.exports
- [x] Require everything correctly
    
## Add Seeds File

- [x] Add a seeds.js file
- [x] Run the seeds file every time the server starts

## Add the Comment model

- [x] Make our errors go away
- [x] Display comments on campground show page

## Comment New/Create

- [x] Discuss nested routes
- [x] Add the comment new and create routes
- [x] Add the new comment form

## Style Show Page

- [x] Add sidebar to show page
- [x] Display comments nicely

## Finish Styling Show Page

- [x] Add public directory
- [x] Add custom stylesheet

## Auth Pt. 1 - Add User Model

- [x] Install all packages needed for auth
- [x] Define User model

## Auth Pt. 2 - Register

- [x] Cconfigure Passport
- [x] Add register routes
- [x] Add register template

## Auth Pt. 3 - Login

- [x] Add login routes
- [x] Add login template

## Auth Pt. 4 - Logout/Navbar

- [x] Add logout route
- [x] Prevent user from adding a comment if not signed in
- [x] Add links to navbar

## Auth Pt. 5 - Show/Hide Links

- [x] Show/hide auth links in navbar

## Refactor The Routes

- [x] Use Express router to reoragnize all routes

## Users + Comments

- [x] Associate users and comments
- [x] Save author's name to a comment automatically

## Users + Campgrounds

- [x] Prevent an unauthenticated user from creating a campground
- [x] Save username + id to newly created campground

## Editing Campgrounds

- [x] Add method override
- [x] Add edit route for campgrounds
- [x] Add link to edit page
- [x] Add update route

## Deleting Campgrounds

- [x] Add destroy route
- [x] Add delete button

## Authorization (permission)

- [x] User can only edit his/her campgrounds
- [x] User can only delete his/her campgrounds
- [x] Hide/Show edit and delete buttons

## Editing comments

- [x] Add edit route for comments
- [x] Add edit template
- [x] Add edit button
- [x] Add update route

## Deleting comments

- [x] Add destroy route
- [x] Add delete button

## Authorization part 2: Comments

- [x] User can only edit his/her comments
- [x] User can only delete his/her comments
- [x] Hide/Show edit and delete buttons
- [x] Refactor middleware

## Adding in flash

- [x] Demo working version
- [x] Install and configure connect-flash
- [x] Add bootstrap alerts to header
