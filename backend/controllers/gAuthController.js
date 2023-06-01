const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { GAuth } = require("../models/GAuth");
require("dotenv").config({ path: __dirname + "/.env" });

const google = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",
  /*scope: ["profile", "email"],*/
};

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: google.callbackURL,
      /*scope: google.scope,*/
    },
    async (accessToken, refreshToken, data, done) => {
      const newUser = {
        username: data.displayName,
        googleId: data.id,
        accessToken: accessToken,
      };

      try {
        let user = await GAuth.findOne({ googleId: data.id });

        if (user) {
          done(null, user);
        } else {
          user = await GAuth.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GAuth.findById(id).then((user) => {
    done(null, user);
  });
});
