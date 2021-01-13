var http = require("http")
var url = require('url')
var fileSystem = require('fs')

http.createServer(function(request, response){
    //gives you the complete URL with parameters
    var pathName = url.parse(request.url).pathname
    var fileName = "index.html"

    //load html page
    fileSystem.readFile(fileName, callBack);

    function callBack(err, data){
        if(err){
            console.log(err)
            response.writeHead(400,{'Content-Type':'text/html'})
            response.write('<!DOCTYPE html><html><body><div>Page not found</div></body></html>')
        }
        else{
            //http header
            //Content type: type/html
            response.writeHead(200,{'Content-Type':'text/html'}) 
            //Send response to body
            response.write(data.toString())
        }
            //response complete
    response.end()
    }

}).listen(3000);

console.log('Server running at http://localhost:3000')