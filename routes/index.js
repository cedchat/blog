var express = require('express');
var router = express.Router();
var passport = require('passport');
var ArticleController = require('../controllers/ArticleController.js');
var UploadController = require('../controllers/UploadController.js');
var ForgotController = require('../passport/forgot.js');

var isAuthenticated = function (req, res, next) {
// if user is authenticated in the session, call the next() to call the next request handler
// Passport adds this method to request object. A middleware is allowed to add properties to
// request and response objects
if (req.isAuthenticated())
return next();
// if the user is not authenticated then redirect him to the login page
res.redirect('/');
};

router.get('/', ArticleController.list);

router.get('/blog/new', function(req, res){res.render('blog_new.jade',{user: req.user})});

router.post('/blog/new', ArticleController.create);

router.get('/blog/edit/:id', ArticleController.edit);

router.post('/blog/edit/:id', ArticleController.save);

router.get('/blog/delete/:id', ArticleController.delete);

router.get('/login', function(req, res) {res.render('login',{ message: req.flash('message'),user: req.user});});

router.get('/logout', function(req, res) { req.logout(); res.redirect('/'); });

router.get('/signup', function(req, res) {res.render('register',{message: req.flash('message'), user: req.user});});

router.get('/forgot', function(req, res) {res.render('forgot', {message: req.flash('message'), user: req.user});});

router.get('/reset/:token', ForgotController.reset);

router.post('/login', passport.authenticate('login', { successRedirect: '/', failureRedirect: '/login', failureFlash : true}));

router.post('/signup', passport.authenticate('signup', {successRedirect: '/',failureRedirect: '/signup',failureFlash : true}));

router.post('/uploader', UploadController.upload_file);

router.post('/forgot', ForgotController.forgot);

router.post('/reset/:token', ForgotController.changepasswd);

module.exports = router;
