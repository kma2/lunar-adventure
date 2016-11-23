// MODULES
const bodyParser = require('body-parser');
const {resolve} = require('path');

// APP
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'public')));
app.use(express.static(resolve(__dirname, 'game')))

app.use('/api', require('./server/api'));

app.get('/', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'public', 'index.html'))
})

app.get('/practice5', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'toPhaser', 'practice5.html'))
})

app.get('/practice6', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'toPhaser', 'practice6.html'))
})

app.listen(PORT, () => {
	console.log("Server is listening on port 3000");
})
