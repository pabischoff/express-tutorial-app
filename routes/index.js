var express = require('express');
var router = express.Router();
var bullshit = require('../public/javascripts/bullshit.js');

/* GET home page. */
function output(array1, array2, array3, array4) {
	router.get('/', function(req, res, next) {
		res.render('index', {verbs: array1, adjectives: array2, nouns: array3, examples: array4});
	});
}


/*
router.get('/', function(req, res, next) {
  res.render('index',{title:'Express',name: 'Paul'});
});



router.get('/cat', function(req,res, next) {
	var name = req.param('name','Mr. Cat');
	res.render('cat', {name: name});	
//	res.render('cat');
});
*/

bullshit(output);

module.exports = router;
