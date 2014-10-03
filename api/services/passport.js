/**
 * Created by terios on 10/2/14.
 */

'use strict';


var LocalStrategy = require('passport-local').Strategy;


var User = require('../../shema/userSchema');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, email, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'username': email},
                function (err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    var erreur;
                    if (!user) {
                        console.log('User Not Found with username ' + email);
                        erreur = {
                            message: 'email not found'
                        };
                        return done(404, erreur);
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        erreur = {
                            message: 'wrong password'
                        };
                        return done(404, erreur);
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        }));

    passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            function (req, email, password, done) {
                process.nextTick(function () {
                    console.log('in find one');
                    // find a user in Mongo with provided username
                    User.findOne({ 'local.email': email }, function (err, user) {
                        // In case of any error return
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        var erreur;
                        if (user) {
                            console.log('User already exists');
                            erreur = {
                                message: 'email is taken'
                            };
                            return done(null, erreur);
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.local.password = newUser.generateHash(password);
                            newUser.local.email = req.param('email');
                            newUser.local.firstName = req.param('firstName');
                            newUser.local.lastName = req.param('lastName');

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                });
            })
    );
};