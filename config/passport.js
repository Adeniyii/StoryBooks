// const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email", "name"],
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          let user = await User.findOne({ facebookId: profile.id });

          if (user) {
            done(null, user);
          } else {
            const newUser = {
              facebookId: profile.id,
              name: profile.displayName,
              first_name: profile.name.givenName,
              last_name: profile.name.familyName,
              picture: profile.photos[0].value,
            };

            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
