// MODULES
const bodyParser = require('body-parser');
const {resolve} = require('path');

// APP
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'public')));

app.use('/api', require('./server/api'));

app.get('/*', (req, res, next) => {
	res.sendFile(resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
})