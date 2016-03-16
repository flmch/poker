/// <reference path="./util.d.ts" />
'use strict';
var gameModule;
(function (gameModule) {
    var Game = (function () {
        function Game() {
            this.board = { 'flop': [], 'turn': [], 'river': [] };
        }
        return Game;
    }());
    gameModule.Game = Game;
})(gameModule = exports.gameModule || (exports.gameModule = {}));
