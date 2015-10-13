var express = require('express'),
	routes = require('./routes/routes'),
	OAuth = require('oauthio'),
	env = require('./env').secrets,							// ENVIRONMENTAL VARIABLES FILE
	app = express();

app.use(express.static(__dirname + '/assets'));
app.set("view engine", "ejs");
app.use(routes);



// NODEMON **************************************
app.listen(process.env.PORT || 3000, function(){
	console.log("NODEMON IS LISTENING... localhost:3000");
});

// ENVIRONMENTAL VARIABLES **********************
exports.config = function() {
	var node_env = process.env.NODE_ENV || 'development';
	console.log(env[node_env]);
	return env[node_env];
};

console.log(env.development.TEST);							// ENVIRONMENTAL VARIABLES TEST
console.log(env.production.TEST);							// ENVIRONMENTAL VARIABLES TEST

// EXPORT ***************************************
module.exports = app;
