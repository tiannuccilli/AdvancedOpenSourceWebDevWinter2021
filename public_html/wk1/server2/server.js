var http = require("http")

http.createServer(function(request, response){
    //gives you the complete URL with parameters
    var url = request.url
    //http header
    //Content type: type/plain

    response.writeHead(200,{'Content-Type':'text/plain'}) 
    //Send response to body

    response.end('URL Requested\n' + url)
}).listen(3000);

console.log('Server running at http://localhost:3000');