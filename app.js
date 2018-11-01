const express = require('express');

const app = express();
const multer = require('multer')
const constants = require('constants');
const constant = require('./config/constants');

const i18n = require("i18n");
const fileUpload = require('express-fileupload');
const port = process.env.PORT || 8042;
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFormat = require('dateformat');
var now = new Date();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(fileUpload({
    createParentPath: false
}));
var menuContent = require('./config/menu');
/***************Mongodb configuratrion********************/
const mongoose = require('mongoose');
var configDB = require('./config/database.js');
//configuration ===============================================================
mongoose.connect(configDB.url, {
    useNewUrlParser: true
}); // connect to our database


require('./config/passport')(passport); // pass passport for configuration


//set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs'); // set up ejs for templating


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

app.use(session({
    secret: 'I Love India...',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.locals = {
    menuContent: menuContent,
    checkExist: (prop, obj = {}) => {
        return obj.hasOwnProperty(prop);
    },
    toNum:(string)=>{
        return parseInt(string);
    }
}
// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: "Sorry, page not found", session: req.sessionbo});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: "Sorry, page not found"});
});
exports = module.exports = app;
