var express = require('express');
var router = express.Router();
console.log('index connected');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get login
router.get('/login', function(req, res, next){
	res.render('./auth/login', {
		title: 'login'
	});
});
router.get('/workout', isLoggedIn, function(req,res,next){
	res.render('workout', {
		title:'Workout'
	});
});

// check if user is logged index
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		console.log('user is good');
		next();
	}
	else{
		res.redirect('/auth/login');
	}
}


module.exports = router;
