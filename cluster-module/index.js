/*
 * Primary file for the API
 *
 */


// Dependencies
const server = require('./lib/server');
var cluster = require('cluster');
var os = require('os');

// Declar the app
const app = {};

// Init function
app.init = (callback)  => {
    // If we are not on the master thread, start the background workers and CLI   
    if(cluster.isMaster) {
        // Start all process on the master thread

        // Fork the process
        for(var i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }

    } else {
        // If we are not on the master thread, Start the server
        server.init();
    }
};

// Invoke the app.init function
app.init();


// Export the app;
module.exports = app;