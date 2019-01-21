/*
 * Primary file for the API
 *
 */


// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Instantiate ther server model object
const server = {};

// Create HTTP Server
server.httpServer = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLowerCase();

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();

        // Choose the handler this request should go to. If one is not found send it to not found handler
        const chosenHanlder = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler specified in the router
        chosenHanlder(data, (statusCode, payload) => {
            // Use the status code callback by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

});

// Define the handlers
let handlers = {};

// Ping hanlder
handlers.ping = (data, callback) => callback(200);

// Not found handler
handlers.notFound = (data, callback) => callback(404);

// Hello route handler
handlers.hello = (data, callback) => callback(202, {
    'message': 'Welcome to my site'
});

// Define a request router
const router = {
    'ping': handlers.ping,
    'hello': handlers.hello
}

// Init script
server.init = () => {
    // Start the HTTP server
    server.httpServer.listen(3000, () => {
        console.log("The server is listening on port 3000");
    });
}


module.exports = server;