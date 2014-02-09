var port = 8080;

var io = require('socket.io').listen(port);

//turn off debug
io.set('log level', 1);

io.sockets.on('connection', function(socket){
    //send data to client
    setInterval(function(){
        
//		for(i=0;i<serverjson.length;i++)
//		{
//			serverjson[i].BBP = Math.round((parseInt(serverjson[i].BBP) + Math.random())*100)/100;
//			serverjson[i].BSP = Math.round((parseInt(serverjson[i].BSP) + Math.random())*100)/100;
//			serverjson[i].LTP = Math.round((parseInt(serverjson[i].LTP) + Math.random())*100)/100;
//		}
//
//		var serverjsonstr = JSON.stringify(serverjson);

		socket.emit('msg', {'msg': prueba});
    }, 1000);