// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var domain = require('domain');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var d = domain.create();
  d.add(request);
  d.add(response);
  var replied = false;
  
  d.on('error', function(err) {
	if (!replied)
	{
		replied = true;
		response.writeHead(500);
		response.end(err.message);
	}
	else
	{
		console.log(err);
	}
  });
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
  //fs.readFile(__filename, d.intercept(function(contents) {
	//throw new Error("help!");
//	response.end(contents);
  //}));
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
