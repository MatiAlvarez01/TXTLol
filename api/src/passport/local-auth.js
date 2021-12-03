const passport = require("passport")
const localStrategy = require("passport-local").Strategy;
const Summoner = require("../models/summoner");
const bcrypt = require("bcrypt-nodejs");

module.exports = function (passport) {
    passport.use(
        new localStrategy({
            usernameField: "email",
            passwordField: "password"
        }, (email, password, done) => {
            Summoner.findOne({ email: email }, (err, user) => {
                if(err) return console.log(`Error sigin 1: ${err}`);
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) return console.log(`Error sigin 2: ${err}`);
                    if(result) {
                        return done(null, user)
                    } else {
                        return (null, false)
                    }
                })
            })
        })
    );
    passport.serializeUser((user, cb) => {
        cb(null, { id: user.id, email: user.email, name: user.name})
    })

    passport.deserializeUser(async (user, cb) => {
        const summoner = await Summoner.findById(user.id).populate("petitions")
        return cb(null, summoner)
    })
}
