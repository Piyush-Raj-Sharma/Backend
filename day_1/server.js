// MODULES -- are some sort of libraries that we can use in our code and is provide by Node.js;
// const http = require('http'); // Importing the http module
// const fs = require('fs'); // Importing the file system module

// PACKAGE -- is a collection of modules that can be installed from the npm registry;
// const express = require('express'); // Importing the express package u need to do npm install express


// Import the built-in 'http' module to create an HTTP server
const http = require('http');

// Create an HTTP server instance
// This server will be able to handle incoming requests and send responses
const server = http.createServer();

// Make the server listen for incoming requests on port 3000
// Once the server starts successfully, log a confirmation message to the console
server.listen(3000, () => {
  console.log('✅ Server is up and running at http://localhost:3000');
});
