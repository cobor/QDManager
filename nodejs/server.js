var port = 8080;

var io = require('socket.io').listen(port);

//turn off debug
io.set('log level', 1);

io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
		socket.emit('msg', {'msg': prueba});
    }, 1000);
    
});