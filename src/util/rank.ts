/// <reference path="./util.d.ts" />

import card = require('./card');
import player = require('./player');
import game = require('./game');

let cardValStrength = card.CardModule.cardValStrength;
let straightList = card.CardModule.straightList;

export module RankModule {
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
	export enum HandRanking {
		STARIGHT_FLUSH,
		FOUR_OF_A_KIND,
		FULL_HOUSE,
		FLUSH,
		STARIGHT,
		THREE_OF_A_KIND,
		TWO_PAIRS,
		ONE_PAIR,
		HIGH_CARD
	}

	function getSevenCard(player: player.PlayerModule.Player, board: game.gameModule.Board): card.CardModule.Card[] {
		return player.hand.concat(board.flop).concat(board.turn).concat(board.river);
	}
	export function sortCard(sevenCards: card.CardModule.Card[]): card.CardModule.Card[] {
		return sevenCards.sort((a, b) => {
			return (cardValStrength.indexOf(a.value) - cardValStrength.indexOf(b.value));
		});
	}
	export function ifStraight(sevenCards: card.CardModule.Card[]): number[] {
		let numList = sevenCards.map((card) => {
			return card.value; 
		});
		if (numList[0] < 5 && numList[0] != 1) return [];
		for (let i:number = 0; i < 4; i++){
			let startIndex: number = cardValStrength.indexOf(numList[i]);
			if ( startIndex < 10
				&& numList.indexOf(straightList[startIndex + 1]) != -1 
				&& numList.indexOf(straightList[startIndex + 2]) != -1
				&& numList.indexOf(straightList[startIndex + 3]) != -1 
				&& numList.indexOf(straightList[startIndex + 4]) != -1 
				) {
				return [numList[i], 
								straightList[startIndex + 1], 
								straightList[startIndex + 2],
								straightList[startIndex + 3],
								straightList[startIndex + 4]];
			}
		}
		return [];
	}
	// get hand ranking and five best cards
	export function getRank(player: player.PlayerModule.Player, board: game.gameModule.Board) {
		let sevenCards: card.CardModule.Card[] = getSevenCard(player, board);

	}
}