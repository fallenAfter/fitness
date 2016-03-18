var express= require('express');
var router= express.Router();
// auth packages
var passport= require('passport');
var mongoose= require('mongoose');
var Account= require('../models/account');
var configDb= require('../config/db.js');

passport.serializeUser(function(id, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	Account.findById(id, function(err,user){
		done(err, user);
	});
});

//get login

//get register
router.get('/register', function(req,res,next){
	res.render('/register', {
		title: 'Register'
	});
});

//post register to save new users
router.post('/register', function(req,res,next){
	//use account model to create a new user
	Account.register(new Account({username:req.body.username}), req.body.password, function(err, account){
		if(err){
			return res.render('/register', {title: 'Register'});
		}
		else{
			req.login(account, function(err){
				res.redirect('/');
			});
		}
	});
});