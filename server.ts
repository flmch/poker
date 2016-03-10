/// <reference path='./src/typings/tsd.d.ts' />

import express = require('express');
import bodyParser = require('body-parser');

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname+'/public'));
// app.use(bodyParser.urlencoded())

app.get('/', function(req, res) { });

app.listen(PORT, function(){
	console.log("server running at port: " + PORT);
})