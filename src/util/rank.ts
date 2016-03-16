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

	interface HandOutput {
		cards: card.CardModule.Card[];
		category?: number;
		ranker?: number[];
		flush?: card.CardModule.Card[];
		numCounter?: number[];
	}

	function getSevenCard(player: player.PlayerModule.Player, board: game.gameModule.Board): card.CardModule.Card[] {
		return player.hand.concat(board.flop).concat(board.turn).concat(board.river);
	}
	export function sortCard(cards: card.CardModule.Card[]): card.CardModule.Card[] {
		return cards.sort((a, b) => {
			return (cardValStrength.indexOf(a.value) - cardValStrength.indexOf(b.value));
		});
	}
	// check if input card array contains staright, return an array of cards.
	// if staright does not exist, return [].
	// if input array length is less than 5, return [] as well.
	// if staright exists, return list of number for the straight
	export function checkStraight(cards: card.CardModule.Card[]): number[] {
		if (cards.length < 5) return [];
		// sort cards array
		cards = sortCard(cards);

		// get number list in order (for detail order, check 'straightList' in card.ts)
		let numList = cards.map((card) => {
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
	// check if the input card array contains flush.
	// if not, return empty array [].
	// if yes, return array of cards Card[] ( this is different from checkStraight function )
	export function checkFlush(cards: card.CardModule.Card[]): card.CardModule.Card[] {
		let counter = [0, 0, 0, 0];
		for (let i = 0; i < cards.length; i++){
			counter[cards[i].suit]++;
		}
		for (let i = 0; i < 4; i++){
			if( counter[i] >= 5 ){
				let maxSuit = i;
				return cards.filter((card) => {
					return card.suit == maxSuit;
				})
			}
		}
		return [];
	}
	export function isStarightFlush(cards: card.CardModule.Card[]): HandOutput {
		let suits: card.CardModule.Card[] = checkFlush(cards);
		if (suits.length == 0) return { cards: [] };
		let numList: number[] = checkStraight(suits);
		if (numList.length == 0) return { cards: [], flush: suits };
		cards = suits.filter((card) => {
			return numList.indexOf(card.value) != -1;
		});
		return {
			cards: cards,
			category: 0,
			ranker: [numList[0]],
			flush: suits
		}
	}
	export function isFourOfKind(cards: card.CardModule.Card[], numCounter: number[]): HandOutput {
		// this line of cards length checking will be removed in future.
		// length checking should be done by parent function.
		// defined here only for testing purpose
		if (cards.length < 5) return { cards: [] };
		let counter: number[];
		let maxCount: number = 0;
		let maxNum: number = -1;

		// ------------------ need to be reviesd in the future ------------------
		// counter array should be defined in getRank function.
		// is**** function should not recalculate counter array.
		// Counter defined here only for testing purpose
		if( numCounter === undefined ){
			counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			cards.forEach((card, index) => {
				counter[card.value]++;
				maxCount = Math.max(counter[card.value], maxCount);
				if( counter[card.value] == 4 ) {
					maxNum = card.value;
				}
			});			
		}else{
			counter = numCounter;
			maxCount = counter.reduce((preVal, curVal) => { 
				if (curVal > counter[preVal] ) {
					counter[curVal];
				}else{
					return counter.indexOf(preVal);
				}
			}, 0);
		}
		// ----------------------------------------------------------------------

		// try to find number that appears most, otherwise return []
		if (maxCount < 4) return { cards: [] };

		// if four of a kind exists, get hand output
		let kicker: number = -1;
		let kickerNotFound: boolean = true;
		cards = sortCard(cards);
		cards = cards.filter((card) => {
			if (card.value == maxNum) {
				return true;
			} else if (kickerNotFound && card.value != maxNum) {
				kickerNotFound = false;
				kicker = card.value;
				return true;
			}else{
				return false;
			}
		});
		return {
			cards: cards,
			category: 1,
			ranker: [maxNum, kicker],
			numCounter: counter
		}
	}
	export function isFullHouse(cards: card.CardModule.Card[], numCounter: number[]): HandOutput {
		let counter: number[];
		let maxNum: number = -1;
		let kicker: number = -1;

		// ------------------ need to be reviesd in the future ------------------
		// counter array should be defined in getRank function.
		// is**** function should not recalculate counter array.
		// Counter defined here only for testing purpose
		if (numCounter === undefined) {
			counter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			cards.forEach((card, index) => {
				counter[card.value]++;
			});
		} else {
			counter = numCounter;
			maxNum = counter.reduce((preVal, curVal) => {
				if (curVal > counter[preVal]) {
					counter[curVal];
				} else {
					return counter.indexOf(preVal);
				}
			}, 0);
		}

		for (let i = 1; i < counter.length; i++) {
			// if(  )
		}
		// ----------------------------------------------------------------------
	}
	// get hand ranking and five best cards
	export function getRank(player: player.PlayerModule.Player, board: game.gameModule.Board) {
		let sevenCards: card.CardModule.Card[] = getSevenCard(player, board);

	}
}