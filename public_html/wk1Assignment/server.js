var http = require("http")

http.createServer(function(request, response){
    //http header
    //Content type: type/plain

    response.writeHead(200,{'Content-Type':'application/json'}) 
    //Send response to body

    response.end('Hello World\n')
}).listen(3000);

console.log('Server running on port 3000');