var express = require('express'),
	routes = require('./routes/routes'),
	OAuth = require('oauth'),
	env = require('./env').secrets,										// ENVIRONMENTAL VARIABLES FILE
	app = express();

app.use('/partials', express.static(__dirname + '/views/partials'));	// PLACE PARTIALS IN /views
app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");
app.use(routes);



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("NODEMON IS LISTENING IN THE NODE VAN... localhost:3000");
});

// ENVIRONMENTAL VARIABLES **********************
exports.config = function() {
	var node_env = process.env.NODE_ENV || 'development';
	console.log(env[node_env]);
	return env[node_env];
};

console.log(env.development.TEST);		// ENVIRONMENTAL VARIABLES TEST
console.log(env.production.TEST);		// ENVIRONMENTAL VARIABLES TEST
console.log(process.env.TEST);			// ENVIRONMENTAL VARIABLES TEST

// EXPORT ***************************************
module.exports = app;
