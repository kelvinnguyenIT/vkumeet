var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);


io.on('connection',socket => {
    console.log(socket);
});
server.listen(8000);