/// <reference path="./util.d.ts" />
"use strict";
var PlayerModule;
(function (PlayerModule) {
    // export interface Hand {
    // 	card1: card.CardModule.Card;
    // 	card2: card.CardModule.Card;
    // }
    var Player = (function () {
        function Player() {
        }
        Player.prototype.getHand = function (hand) {
            this.hand = hand;
        };
        return Player;
    }());
    PlayerModule.Player = Player;
})(PlayerModule = exports.PlayerModule || (exports.PlayerModule = {}));
