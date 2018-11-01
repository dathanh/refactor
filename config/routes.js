var home = require('../app/controllers/home');
var Articles = require('../app/controllers/Articles');

//you can include all your controllers

module.exports = function (app, passport) {


    app.get('/', home.home);//home
    app.get('/home', home.home);//home
    app.get('/test', home.index);//home
    app.get('/Articles/add', Articles.add);//home
    app.post('/Articles/add', Articles.add);//home

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));
    // // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));


}
