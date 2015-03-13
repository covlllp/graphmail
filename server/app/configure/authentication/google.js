'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var google = require('googleapis');

module.exports = function (app) {

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        UserModel.findOne({ 'google.id': profile.id }, function (err, user) {


            if (err) return done(err);

            if (user) {
                done(null, user);
            } else {
                UserModel.create({
                    google: {
                        id: profile.id,
                    },
                    email: profile._json.email,
                    firstName : profile._json.given_name,
                    lastName : profile._json.family_name,
                    image : profile._json.picture
                }).then(function (user) {
                    done(null, user);
                }, function (err) {
                    console.error(err);
                    done(err);
                });
            }

        });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            var Google = require('googleapis');
            var OAuth2 = Google.auth.OAuth2;
            var oauth2Client = require('./../../../env/googleOauthClient');
            var url = oauth2Client.generateAuthUrl({
                scope: 'https://www.googleapis.com/auth/gmail.readonly'
            });
            res.redirect(url);
            // res.redirect('/');
        });

};
