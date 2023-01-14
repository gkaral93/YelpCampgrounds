const User = require('../models/user')
module.exports.renderRegister=(req, res) => {
    res.render("users/register");
  }

module.exports.userRegister = async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser,err=>{
        if(err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  }

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.userLogin = (req, res) => {
  req.flash("success", "welcome back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl); // Redirect to requested url after user login
};

module.exports.userLogout = (req, res) => {
  req.logout(function (err) {
    //Invoking logout() will remove the req.user property and clear the login session
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};