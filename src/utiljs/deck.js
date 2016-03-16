/// <reference path="./util.d.ts" />
"use strict";
var card = require('./card');
var DeckModule;
(function (DeckModule) {
    var Deck = (function () {
        function Deck() {
            this.newDeck();
            this.shuffle();
            // console.log(this.all);
        }
        Deck.prototype.newDeck = function () {
            this.all = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 1; j <= 13; j++) {
                    this.all.push(new card.CardModule.Card(i, j));
                }
            }
        };
        Deck.prototype.shuffle = function () {
            var index;
            var temp;
            for (var i = 0; i < 52; i++) {
                index = i + Math.floor(Math.random() * (52 - i));
                temp = this.all[i];
                this.all[i] = this.all[index];
                this.all[index] = temp;
            }
        };
        Deck.prototype.dealHand = function () {
            var card1 = this.all.pop();
            var card2 = this.all.pop();
            return [card1, card2];
        };
        Deck.prototype.burnCard = function () {
            this.all.pop();
        };
        Deck.prototype.flop = function () {
            var card1 = this.all.pop();
            var card2 = this.all.pop();
            var card3 = this.all.pop();
            return [card1, card2, card3];
        };
        Deck.prototype.turn = function () {
            return [this.all.pop()];
        };
        Deck.prototype.river = function () {
            return [this.all.pop()];
        };
        return Deck;
    }());
    DeckModule.Deck = Deck;
})(DeckModule = exports.DeckModule || (exports.DeckModule = {}));
