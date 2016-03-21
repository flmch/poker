/// <reference path='./src/typings/tsd.d.ts' />
/// <reference path="./src/util/util.d.ts" />

import express = require('express');
import bodyParser = require('body-parser');
import game = require('./src/util/game');
import card = require('./src/util/card');

let app = express();
// let http = require('http').createServer(app);
let PORT = process.env.PORT || 3000;

// let test = 10;
// let myDeck = new card.Deck();
// console.log(card);

app.use(express.static(__dirname+'/public'));
// app.use(bodyParser.urlencoded())

app.get('/', function(req, res) { });

app.listen(PORT, function(){
	console.log("server running at port: " + PORT);
})