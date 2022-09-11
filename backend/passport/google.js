const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const { userModel } = require("../models");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/stark/auth/google/callback`
},
  async function (accessToken, refreshToken, profile, done) {
    const { displayName, emails } = profile;
    const email = emails[0].value;
    userModel.findOne({ email }).then((obj) => {
      if (obj) {
        done(null,obj);
      }
      else {
        const user = new userModel({ email, name: displayName, verifiedByEmail: true })
        user.createUser().then(() => {
         done(null,user);
        }).catch((err) => {
            done(err,null);
        });
      }
    })
  }
));

