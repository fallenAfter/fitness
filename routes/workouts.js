var express = require('express');
var router = express.Router();
//add mongoose
var mongoose=require('mongoose');
//add workouts model
var Workouts= require('../models/workouts');

router.get('/', function (req,res,next){
	//get user id
	var uId= req.user._id;
	//find all workouts for current user using user id from current login
	Workouts.find({user: uId}, function(err, workouts){
		console.log(workouts);
		if (err){
			console.log(err);
			res.end(err);
		}
		else{
			res.render('workouts/workouts',{
				title: 'Workouts',
				workout: workouts
			});
		}
	});
});

router.get('/add', function (req, res, next){
	//get user id to add as user input to database
	var uId= req.user._id;

	res.render('workouts/add', {
		title: 'Add Workout'
	});
});

router.post('/add', function (req,res,next){
	var uId= req.user._id;

	Workouts.create({
		title: req.body.title,
		hours: req.body.hours,
		date: req.body.date,
		user: uId
	});
	res.redirect('/workouts/');
});

module.exports = router;