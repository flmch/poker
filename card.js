/// <reference path="./util.d.ts" />
"use strict";
var CardModule;
(function (CardModule) {
    'use strict';
    (function (CardSuit) {
        CardSuit[CardSuit["SPADE"] = 0] = "SPADE";
        CardSuit[CardSuit["HEART"] = 1] = "HEART";
        CardSuit[CardSuit["CLUB"] = 2] = "CLUB";
        CardSuit[CardSuit["DIAMOND"] = 3] = "DIAMOND";
    })(CardModule.CardSuit || (CardModule.CardSuit = {}));
    var CardSuit = CardModule.CardSuit;
    (function (CardVal) {
        CardVal[CardVal["ACE"] = 1] = "ACE";
        CardVal[CardVal["TWO"] = 2] = "TWO";
        CardVal[CardVal["THREE"] = 3] = "THREE";
        CardVal[CardVal["FOUR"] = 4] = "FOUR";
        CardVal[CardVal["FIVE"] = 5] = "FIVE";
        CardVal[CardVal["SIX"] = 6] = "SIX";
        CardVal[CardVal["SEVEN"] = 7] = "SEVEN";
        CardVal[CardVal["EIGHT"] = 8] = "EIGHT";
        CardVal[CardVal["NINE"] = 9] = "NINE";
        CardVal[CardVal["TEN"] = 10] = "TEN";
        CardVal[CardVal["JACK"] = 11] = "JACK";
        CardVal[CardVal["QUEEN"] = 12] = "QUEEN";
        CardVal[CardVal["KING"] = 13] = "KING";
    })(CardModule.CardVal || (CardModule.CardVal = {}));
    var CardVal = CardModule.CardVal;
    CardModule.cardValStrength = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    var cardInit = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    var suitInit = ['S', 'H', 'C', 'D'];
    function strToCard(str) {
        var parsed = str.trim().split(',');
        parsed[0] = parsed[0].trim();
        parsed[1] = parsed[1].trim();
        return new Card(suitInit.indexOf(parsed[0]), cardInit.indexOf(parsed[1]));
    }
    CardModule.strToCard = strToCard;
    function toCardArr(strArr) {
        return strArr.map(function (str) {
            return strToCard(str);
        });
    }
    CardModule.toCardArr = toCardArr;
    var Card = (function () {
        function Card(s, v) {
            this.suit = s;
            this.value = v;
        }
        return Card;
    }());
    CardModule.Card = Card;
})(CardModule = exports.CardModule || (exports.CardModule = {}));
