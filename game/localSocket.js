	(function () {
		socket = io();
		 
		socket.on('connect',function(msg) {
			console.log('I have made a persistent two-way connection to the server!');
		});
	})();