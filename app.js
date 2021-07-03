var http = require('http');
http.createServer(function(request,response){
    if (request.url == '/'){
        response.writeHead(200,{
            'Content-Type':'text/html'
        });
        response.write('<h1>welcome!</h1>')
        response.end();
    }else{
        response.writeHead(200,{
            'Content-Type':'text/html'
        });
        response.write('<h1>404!</h1>')
        response.end();
    }
}).listen(process.env.PROT || 8080);