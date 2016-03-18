var express= require('express');
var router= express.Router();
// auth packages
var passport= require('passport');
var mongoose= require('mongoose');
var Account= require('../models/account');
var configDb= require('../config/db.js');
console.log('auth connected');
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	Account.findById(id, function(err,user){
		done(err, user);
	});
});

//get login
router.get('/login', function(req, res, next){
	//store session message
	var messages=  req.session.message || [];
	//clear session messages
	req.session.messages= [];

	res.render('auth/login', {
		title: 'login',
		user: req.user,
		messages: messages
	});
});

// post login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/workout',
	failureRedirect: '/auth/login',
	failureMessage: 'Login failure'
}));
//get register
router.get('/register', function(req,res,next){
	res.render('auth/register', {
		title: 'Register'
	});
});

// post register to save new users
router.post('/register', function(req,res,next){
	//use account model to create a new user
	console.log('attempting user creation');
	Account.register(new Account({username: req.body.username}), req.body.password, function(err, account){
		console.log(err);
		console.log(req.body.username);
		if(err){
			return res.render('auth/register', {title: 'Register'});
			console.log('error in registration');
		}
		else{
			console.log('account made');
			res.redirect('/');
		}
	});
});


module.exports = router, passport;