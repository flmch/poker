/// <reference path='./src/typings/tsd.d.ts' />
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded())
app.get('/', function (req, res) { });
app.listen(PORT, function () {
    console.log("server running at port: " + PORT);
});
