/// <reference path='./src/typings/tsd.d.ts' />
/// <reference path="./src/util/util.d.ts" />
"use strict";
var express = require('express');
var card = require('./src/util/card');
var app = express();
var PORT = process.env.PORT || 3000;
var myDeck = new card.Deck();
// console.log(card);
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded())
app.get('/', function (req, res) { });
app.listen(PORT, function () {
    console.log("server running at port: " + PORT);
});
