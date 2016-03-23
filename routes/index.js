var express = require('express');
var router = express.Router();
console.log('index connected');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/workout', isLoggedIn, function(req,res,next){
	res.render('workout', {
		title:'Workout'
	});
});

router.get('/welcome', isLoggedIn, function (req,res,next){
	res.render('./auth/welcome', {
		title: 'Welcome',
		user: req.user
	});
})

// check if user is logged index
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		console.log('user is good');
		return next();
	}
	else{
		res.redirect('/login');
	}
}


module.exports = router;
