/**
 * Created by terios on 10/2/14.
 */
module.exports = function (app, passport) {

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.jsonp(401, {
            message: 'must login first'
        });
        //res.redirect('/');
    }

    app.post('/test', function (req, res) {
        console.log('recue');
        console.log(req.body)
        res.jsonp({t: 'oooo'})
    });

    app.post('/signup', passport.authenticate('local-signup', {
            failureRedirect: 'ffff',
            failureFlash: true
        }),
        function (req, res) {
            console.log(req.user);
            res.jsonp(req.user);
        });


};