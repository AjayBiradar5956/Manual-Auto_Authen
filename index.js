const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const user = require('./model/user');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const passportJwt = require('./config/passport-jwt-stratergy');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads', express.static('./uploads'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', "ejs");
app.set('views', './views');

//mongo store
app.use(session({
    name: 'Codeial',
    //todo change the secret before deployment in production mode
    secret: 'qwerty',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/codeial_dev',
        autoRemove: 'disabled',
    }, function (err) {
        console.log(err || "ok");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require("./route/home"));


app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("running perfect on: ", port);
});