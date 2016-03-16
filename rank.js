/// <reference path="./util.d.ts" />
"use strict";
var card = require('./card');
var cardValStrength = card.CardModule.cardValStrength;
var RankModule;
(function (RankModule) {
    'use strict';
    // ----------------- Ranking -----------------//
    // 0. Staright Flush
    // 1. Four of a kind
    // 2. Full house
    // 3. Flush
    // 4. Staright
    // 5. Three of a kind
    // 6. Two pairs
    // 7. One pair
    // 8. High Card	
    (function (HandRanking) {
        HandRanking[HandRanking["STARIGHT_FLUSH"] = 0] = "STARIGHT_FLUSH";
        HandRanking[HandRanking["FOUR_OF_A_KIND"] = 1] = "FOUR_OF_A_KIND";
        HandRanking[HandRanking["FULL_HOUSE"] = 2] = "FULL_HOUSE";
        HandRanking[HandRanking["FLUSH"] = 3] = "FLUSH";
        HandRanking[HandRanking["STARIGHT"] = 4] = "STARIGHT";
        HandRanking[HandRanking["THREE_OF_A_KIND"] = 5] = "THREE_OF_A_KIND";
        HandRanking[HandRanking["TWO_PAIRS"] = 6] = "TWO_PAIRS";
        HandRanking[HandRanking["ONE_PAIR"] = 7] = "ONE_PAIR";
        HandRanking[HandRanking["HIGH_CARD"] = 8] = "HIGH_CARD";
    })(RankModule.HandRanking || (RankModule.HandRanking = {}));
    var HandRanking = RankModule.HandRanking;
    function getSevenCard(player, board) {
        return player.hand.concat(board.flop).concat(board.turn).concat(board.river);
    }
    function sortCard(sevenCards) {
        return sevenCards.sort(function (a, b) {
            return (cardValStrength.indexOf(a.value) - cardValStrength.indexOf(b.value));
        });
    }
    RankModule.sortCard = sortCard;
    function ifStraight(sevenCards) {
        var numList = sevenCards.map(function (card) {
            return card.value;
        });
        // console.log(numList);
        if (numList[0] < 5 && numList[0] != 1)
            return [];
        for (var i = 0; i < 3; i++) {
            var startIndex = cardValStrength.indexOf(numList[i]);
            // console.log(startIndex);
            // console.log(cardValStrength[startIndex + 1]);
            // console.log(numList.indexOf(cardValStrength[startIndex + 1]));
            if (numList.indexOf(cardValStrength[startIndex + 1]) != -1
                && numList.indexOf(cardValStrength[startIndex + 2]) != -1
                && numList.indexOf(cardValStrength[startIndex + 3]) != -1
                && numList.indexOf(cardValStrength[startIndex + 4]) != -1) {
                return [numList[0],
                    cardValStrength[startIndex + 1],
                    cardValStrength[startIndex + 2],
                    cardValStrength[startIndex + 3],
                    cardValStrength[startIndex + 4]];
            }
        }
        return [];
    }
    RankModule.ifStraight = ifStraight;
    // get hand ranking and five best cards
    function getRank(player, board) {
        var sevenCards = getSevenCard(player, board);
    }
    RankModule.getRank = getRank;
})(RankModule = exports.RankModule || (exports.RankModule = {}));
