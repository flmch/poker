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
		STRAIGHT,
		THREE_OF_A_KIND,
		TWO_PAIRS,
		ONE_PAIR,
		HIGH_CARD
	}

	export interface HandOutput {
		cards: card.CardModule.Card[];
		category?: number;
		ranker?: number[];
		flush?: card.CardModule.Card[];
		numCounter?: number[];
	}

	function getSevenCard(player: player.PlayerModule.Player, board: game.GameModule.Board): card.CardModule.Card[] {
		return player.getHand().concat(board.flop).concat(board.turn).concat(board.river);
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
				return cards.filter((card) => {
					return card.suit == i;
				})
			}
		}
		return [];
	}
	function isStraightFlush(cards: card.CardModule.Card[], suits: card.CardModule.Card[]): HandOutput {
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
			flush: suits // flush information can be reused if the hand is not straight flush
		}
	}
	function isFourOfKind(cards: card.CardModule.Card[], counter: number[]): HandOutput {
		let maxCount: number = 0;
		let maxNum: number = -1;

		for (let i = 1; i < counter.length; i++){
			if( maxCount < counter[i] ){
				maxCount = counter[i];
				maxNum = i;
			}
		}

		// try to find number that appears most, otherwise return []
		if (maxCount < 4) return { cards: [] };

		// if four of a kind exists, get hand output
		let kickerNum: number = -1;
		let kickerFound: boolean = false;
		cards = cards.filter((card) => {
			if (card.value == maxNum) {
				return true;
			} else if ( card.value != maxNum && !kickerFound ) {
				kickerFound = true;
				kickerNum = card.value;
				return true;
			}else{
				return false;
			}
		});
		return {
			cards: cards,
			category: 1,
			ranker: [maxNum, kickerNum]
		}
	}
	function isFullHouse(cards: card.CardModule.Card[], counter: number[]): HandOutput {
		let maxNum: number = -1;
		let kickerNum: number = -1;
		let maxFound: boolean = false;
		let kickerFound: boolean = false;
		let kickerAdded: number = 0;

		for (let i = 0; i < cardValStrength.length; i++) {
			if (counter[cardValStrength[i]] == 3 && !maxFound) {
				maxNum = cardValStrength[i];
				maxFound = true;
			}else if (counter[cardValStrength[i]] >= 2 && !kickerFound) {
				kickerNum = cardValStrength[i];
				kickerFound = true;
			}
		}
		if (maxNum == -1 || !kickerFound) { return { cards: [] } };
		cards = cards.filter((card) => {
			if (card.value == kickerNum) { kickerAdded++; }
			return card.value == maxNum || (card.value == kickerNum && kickerAdded <= 2);
		});
		return {
			cards: cards,
			category: 2,
			ranker: [maxNum, kickerNum]
		};
	}
	function isFlush(suits: card.CardModule.Card[]): HandOutput {
		if (suits.length == 0) { return { cards: [] }; }
		suits = suits.slice(0, 5);
		return {
			cards: suits,
			category: 3,
			ranker: [suits[0].value]
		}
	}
	function isStraight(cards: card.CardModule.Card[]): HandOutput {
		let numList: number[] = checkStraight(cards);
		let tracker: number;
		if (numList.length == 0) { return { cards: [] }; }
		let ranker: number = numList[0]; 
		cards = cards.filter((card) => {
			tracker = numList.indexOf(card.value);
			if (tracker != -1) {
				numList.splice(tracker, 1);
				return true;
			} else { return false; }
		});
		return {
			cards: cards,
			category: 4,
			ranker: [ranker]
		}
	}
	function isThreeOfKind(cards: card.CardModule.Card[], counter: number[]): HandOutput {
		let maxNum: number = -1;
		let kickers: number[] = [];
		let kickerCounter: number = 0;

		for (let i = 1; i < counter.length; i++ ){
			if( counter[i] == 3 ){
				maxNum = i;
			}
		}
		if (maxNum == -1) { return { cards: [] };}
		cards = cards.filter((card) => {
			if( card.value == maxNum ){
				return true;
			} else if (card.value != maxNum && kickerCounter < 2){
				kickers.push(card.value);
				kickerCounter++;
				return true;
			} else {
				return false;
			}
		});
		return {
			cards: cards,
			category: 5,
			ranker: [maxNum].concat(kickers)
		};
	}
	function isPairs(cards: card.CardModule.Card[], counter: number[]): HandOutput {
		let pairs: number[] = [];
		let kickers: number[] = [];
		let kickerCounter: number = 0;
		for (let i = 0; i < cardValStrength.length; i++){
			if (counter[cardValStrength[i]] == 2 && pairs.length < 2) {
				pairs.push(cardValStrength[i]);
			}
		}
		if( pairs.length == 2 ){
			cards = cards.filter((card) => {
				if( card.value == pairs[0] || card.value == pairs[1] ){
					return true;
				} else if (card.value != pairs[0] && card.value != pairs[1] && kickerCounter < 1){
					kickerCounter++;
					kickers.push(card.value);
					return true;
				} else {
					return false;
				}
			});
			return {
				cards: cards,
				category: 6,
				ranker: pairs.concat(kickers)
			};
		}else if(pairs.length == 1){
			cards = cards.filter((card) => {
				if (card.value == pairs[0]) {
					return true;
				} else if (card.value != pairs[0] && kickerCounter < 3) {
					kickerCounter++;
					kickers.push(card.value);
					return true;
				} else {
					return false;
				}
			});
			return {
				cards: cards,
				category: 7,
				ranker: pairs.concat(kickers)
			};			
		}else{
			cards = cards.slice(0, 5);
			return {
				cards: cards,
				category: 8,
				ranker: cards.map((card) => { return card.value;})
			}
		}
	}
	// get hand ranking and five best cards
	export function rankHand(board: game.GameModule.Board, player: player.PlayerModule.Player): HandOutput {
		// ----------- this part will be revised.
		// argument 'cards' is only defined for testing
		let sevenCards: card.CardModule.Card[];
		if( arguments.length == 1 ){ // arguments length equals to one only happens for testing case
			sevenCards = arguments[0];
		}else{
			sevenCards = getSevenCard(player, board);
		}

		//////////////////////////////////////////////////////

		// ---------------- setup & configuration ----------
		// sevenCards must have seven cards
		if (sevenCards.length < 7) return { cards: [] };

		// sort cards
		sortCard(sevenCards);

		// create number counter array. Length is 13+1
		let counter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		sevenCards.forEach((card) => { counter[card.value]++; });

		// run checkFlush and store the result
		let suits = checkFlush(sevenCards);

		// ***********************  start ranking *********************
		let output: HandOutput;
		// ----------------- check straight flush --------------------
		output = isStraightFlush(sevenCards, suits);
		if (output.category == 0) { return output; }

		// ----------------- check Four of A Kind --------------------
		output = isFourOfKind(sevenCards, counter);
		if (output.category == 1) { return output; }

		// ----------------- check FullHouse --------------------
		output = isFullHouse(sevenCards, counter);
		if (output.category == 2) { return output; }

		// ----------------- check flush ----------------------------
		output = isFlush(suits);
		if (output.category == 3) { return output; }

		// ----------------- check straight -------------------------
		output = isStraight(sevenCards);
		if (output.category == 4) { return output; }

		// ----------------- check Three of A Kind ------------------
		output = isThreeOfKind(sevenCards, counter);
		if (output.category == 5) { return output; }

		// ----------------- check Two Pair, One Pair and High Card --
		return isPairs(sevenCards, counter);
	}
	export function compareTwoP(board: game.GameModule.Board, player1: player.PlayerModule.Player, player2: player.PlayerModule.Player): number {
		let h1: HandOutput = rankHand(board, player1);
		let h2: HandOutput = rankHand(board, player2);
		if( h1.category < h2.category ){
			return -1;
		} else if (h1.category > h2.category){
			return 1;
		}else{
			for (let i = 0; i < h1.ranker.length; i++){
				if (cardValStrength.indexOf(h1.ranker[i]) < cardValStrength.indexOf(h2.ranker[i])) {
					return -1;
				} else if (cardValStrength.indexOf(h1.ranker[i]) > cardValStrength.indexOf(h2.ranker[i])) {
					return 1;
				}
			}
			return 0;
		}
	}
	export function rankPlayers(board: game.GameModule.Board, players: player.PlayerModule.Player[]): any[] {
		// deep copy players to avoid making unexpected change to original object
		let playersCopy = players.map((p) => { 
			p.handRank = rankHand(board, p);
			return p; 
		});
		// result will be any 2d array containning players id in order
		// if two players rank exactly the same, they will be put in one level in same array
		// example: [[1st], [2nd], [3rd, 3rd], [4th]]
		let result: any[] = [];

		// sort players according to their rankings
		// result will be an 1d array with player elements
		// [p1,p3,p7,p6]
		playersCopy.sort((a,b) => {
			// console.log(a);
			// console.log(b);
			// console.log(compareTwoP(board, a, b));
			return compareTwoP(board, a, b);
		});

		// console.log(playersCopy);
		// create sorted 2d array with player elements according to ranking
		// [[p1],[p3, p7], [p6]]
		playersCopy.forEach((p) => {
			if(result.length == 0){
				let temp: player.PlayerModule.Player[] = [];
				temp.push(p);
				result.push(temp);
			} else if ( compareTwoP(board, p, result[result.length - 1][0]) == 0 ){
				result[result.length - 1].push(p);
			} else{
				let temp: player.PlayerModule.Player[] = [];
				temp.push(p);
				result.push(temp);				
			}
		});

		// map 2d array in player objects to 2d array in player id
		// [[1],[3,7],[6]]
		result = result.map((ele) => {
			return ele.map((p) => { 
				return p.id;
			});
		});
		return result;
	}
}