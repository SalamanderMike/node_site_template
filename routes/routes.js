var express = require('express'),
		router = express.Router();

router.get('/', function (req,res) {
	res.redirect('/site');
});

router.get('/site', function (req,res) {
	res.render('site');
});





	module.exports = router;
