const express = require("express");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const users=require('../controllers/users')

router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.userRegister));

router.route('/login')
.get(users.renderLogin)
.post(passport.authenticate("local",{failureFlash: true,failureRedirect: "/login", keepSessionInfo: true}), users.userLogin);

router.get("/logout", users.userLogout);

module.exports = router;
