const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//Passport is Express-compatible authentication middleware for Node.js

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
