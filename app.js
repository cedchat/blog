var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var serveIndex = require('serve-index');
var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
var https = require('https');
var fs = require('fs');
var mongoose = require('mongoose');

var options = {
	key: fs.readFileSync('ssl/key.pem'),
	cert: fs.readFileSync('ssl/cert.pem')};

var app = express();

app.use(favicon(__dirname + '/public/files/favicon.ico'));

https.createServer(options, app).listen(443);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mongodb connection

mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(require('stylus').middleware({ src: __dirname + '/public' }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: './public/files/' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring de Passport
var passport = require('passport');
app.use(session({secret: 'letoutou', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

app.use('/', routes);
app.use('/files', serveIndex('public/files', {'icons': true}));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
        //message: err.message,
        //error: {}
    //});
//});

module.exports = app;