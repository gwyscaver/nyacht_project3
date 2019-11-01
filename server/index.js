var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
      //this is where we will add messages to database;

    console.log('message: ', JSON.stringify(msg));
  
        io.emit('chat message', msg);
  });
});

http.listen(3002, function(){
  console.log('listening on *:3002');
});