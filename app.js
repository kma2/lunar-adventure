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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'public')));
app.use(express.static(resolve(__dirname, 'game')))

app.use('/api', require('./server/api'));

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', function(msg) {
    	console.log('user disconnected')
    });
});

http.listen(PORT, () => {
	console.log("Server is listening on port 3000");
})
