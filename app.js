// MODULES
const bodyParser = require('body-parser');
const {resolve} = require('path');

// APP
const express = require('express');
const app = express();

// SOCKET
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
.use(bodyParser.json())
.use(express.static(resolve(__dirname, 'public')))
.use(express.static(resolve(__dirname, 'game')))
.use(express.static(resolve(__dirname, 'node_modules')))

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'public', 'index.html'))
})

let lobbyUsers = {};

io.on('connection', (socket) => {
		console.log('a user connected');

		socket.on('multiPlayer', function(userName) {
			socket.userName = userName;
			socket.emit('multiPlayer', {users: Object.keys(lobbyUsers)});
			lobbyUsers[userName] = socket;
		})

		socket.on('disconnect', function(msg) {
			console.log('user disconnected')
		});
});

http.listen(PORT, () => {
	console.log("Server is listening on port 3000");
})
