var express = require('express'),
	routes = require('./routes/routes'),
	config = require('./assets/resources/config').env,	// ENVIRONMENTAL VARIABLES FILE
	i18n = require('i18next'),						
	OAuth = require('oauth'),
	path = require('path'),
	app = express();

// Translations
var option = { resGetPath: 'resources/locales/__lng__/__ns__.json' };
i18n.init(option);
app.use(i18n.handle);

// Setip
app.use('/partials', express.static(path.join(__dirname + '/views/partials')));	// PLACE PARTIALS IN /views
app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");
app.use(routes);



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("NODEMON IS LISTENING IN THE NODE VAN... localhost:3000");
});


console.log(config.development.TEST); // ENVIRONMENTAL VARIABLES TEST

// EXPORT ***************************************
module.exports = app;
