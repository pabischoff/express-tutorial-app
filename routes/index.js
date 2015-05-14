var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Express',name: 'Paul'});
});


router.get('/cat', function(req,res, next) {
	var name = req.param('name','Mr. Cat');
	res.render('cat', {name: name});	
//	res.render('cat');
});

module.exports = router;
