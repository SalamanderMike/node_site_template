var config = require('./assets/resources/config').env,	// ENVIRONMENTAL VARIABLES FILE
	express = require('express'),
	bodyParser  = require('body-parser'),
	i18n = require('i18next'),			
	path = require('path'),
	OAuth = require('oauth'),
	app = express();



// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Translations
var options = { debug: true,
				fallbackLng: 'en-US',
				ignoreRoutes: ['assets/', 'node_modules/', 'routes/', 'views/'],
				useCookie: false,
				detectLngFromHeaders: false
			};
i18n.init(options);
app.use(i18n.handle);


// Setup
app.use('/partials', express.static(path.join(__dirname + '/views/partials')));	// PLACE PARTIALS IN /views
app.use('/locales', express.static(path.join(__dirname + '/locales')));	// PLACE PARTIALS IN /views
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));	// PLACE BOWER REQUIREMENTS
app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");


// i18n.setLng('zh-CN', { fixLng: true }, function(zhCN){});




// ROUTES
require('./routes/routes')(app);



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("NODEMON IS LISTENING IN THE NODE VAN... localhost:3000");
});


console.log(config.development.TEST); // ENVIRONMENTAL VARIABLES TEST

// EXPORT ***************************************
module.exports = app;
