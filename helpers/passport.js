const passport = require('passport')
const { User }  = require('../models/user')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  'google',
  new GoogleStrategy({
    clientID: "750121174033-dr287087lrjri680f2jqrkef9mtdt0vd.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    // find email  or create
    let findUser = await User.findOne({
      username : profile.emails[0].value
    });
    if (!findUser) {
      findUser = await User.create({
        username : profile.emails[0].value, 
        name : profile.displayName
      })
    }
    // null is no error, findUser => req.user
    cb(null, findUser); 
  }
  
));