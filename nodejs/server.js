var port = 10003;

var io = require('socket.io').listen(port);
var winston = require('winston');

//turn off debug
io.set('log level', 1);

io.sockets.on('connection', function(socket){
    winston.info("Client connected");
    
    //Envia updates
    setInterval(function(){
        //socket.emit('msg', {'msg': prueba});
    }, 1000);
        
    
    socket.on('add',function(socket){
    
    });

    socket.on('remove',function(socket){

    });

    socket.on('start',function(socket){

    });

    socket.on('stop',function(socket){

    });

    socket.on('queue_status',function(socket){

    });

    socket.on('status_update',function(socket){

    });
    
});

