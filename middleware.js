const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo=req.originalUrl;  //User isnt logged in -> we save the requested path before log in
    req.flash("error", "You must sign in!");
    return res.redirect("/login");
  }
  next();
};
module.exports=isLoggedIn