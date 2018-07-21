console.log('rodando');

var http = require('http');

var server = http.createServer(function(req, res) {

    res.end('teste');

});

server.listen(3000);

console.log('servidor rodando');




