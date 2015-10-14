var express = require('express'),
	router = express.Router();

router.get('/', function (req,res) {
	res.redirect('/site');
});

router.get('/site', function (req,res) {
	res.render('site');
});

router.get('/*', function (req,res) {
	res.redirect('/site');
});




module.exports = router;
