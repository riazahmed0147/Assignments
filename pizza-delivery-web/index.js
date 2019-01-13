/*
 * Primary file for the API
 *
 */


// Dependencies
var server = require('./lib/server');

// Declar the app
var app = {};

// Init function

app.init = function() {
	// Start the server
	server.init();
};

// Excecute that function
app.init();

// Export the app;
module.exports = app;