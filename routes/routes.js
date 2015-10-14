var express = require('express'),
	router = express.Router();

router.get('/', function (req,res) {
	res.redirect('/site');
});

router.get('/site', function (req,res) {
	res.render('site');
});

// exports.routes = function(req, res){
//   res.render('site');
// };

// router.get('/*', function (req, res) { 
//     return res.sendFile(path.join(config.root, 'site.ejs')); 
// });




module.exports = router;
