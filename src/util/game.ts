/// <reference path="./util.d.ts" />

'use strict';

import card = require('./card');
import deck = require('./deck');
import player = require('./player');
import rank = require('./rank');

export module GameModule {

	export interface Board {
		flop: card.CardModule.Card[];
		turn: card.CardModule.Card[];
		river: card.CardModule.Card[];
	}

	export class Game {
		private players: player.PlayerModule.Player[]; 
		private deck: deck.DeckModule.Deck;
		private board: Board = { 'flop': [], 'turn': [], 'river': []};
		private playersBet: number[] = [0,0,0,0,0,0,0,0,0,0];
		constructor() {
			this.deck = new deck.DeckModule.Deck();
			this.players = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];
		}

		// ----------------- methods for board -----------------
		getBoard(): Board {
			return this.board;
		}
		addPlayer(id: number, name: string, stack: number): void {
			this.players[id] = new player.PlayerModule.Player(id, name, stack);
		}		
		dealFlop(): void { 
			this.deck.burnCard();
			this.board.flop = this.deck.flop(); 
		}
		dealTurn(): void {
			this.deck.burnCard();
			this.board.turn = this.deck.turn(); 
		}
		dealRiver(): void {
			this.deck.burnCard();
			this.board.river = this.deck.river(); 
		}

		// ----------------- methods for players -----------------
		dealHand(id: number, hand?: card.CardModule.Card[]): void {
			if( hand == undefined ){
				hand = this.deck.hand();
			}
			this.players[id].assignHand(hand);
		}
		dealAll(): void {
			this.players.forEach((p, index) => {
				if (p instanceof player.PlayerModule.Player){
					this.dealHand(index);
				} 
			});
		}
		bet(id: number, amount: number): void {
			this.playersBet[id] += amount;
		}

		// ----------------- methods for pot -----------------
		getPotSum(): number {
			return this.playersBet.reduce((preVal, curVal) => {
				return preVal + curVal;
			}, 0);
		}
		splitPot(): number[] {
			let activePlayers: player.PlayerModule.Player[] = this.players.map((p) => {
				return p;
			}).filter((p) => {
				return p != undefined && !p.ifFold;
			});
			let afterSplit: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			// if only one player left and all other players fold, he wins all.
			if (activePlayers.length == 1) {
				afterSplit[activePlayers[0].getId()] = this.playersBet.reduce((preVal, curVal) => {
					return preVal + curVal;
				}, 0);
			// more than one player left
			}else{ 
				let rankResult: any[] = rank.RankModule.rankPlayers(this.board, activePlayers);
				// for each level of ranking, sort players accoridng to their bet
				for (let i = 0; i < rankResult.length; i++) {
					rankResult[i].sort((a,b) => {
						return this.playersBet[b] - this.playersBet[a];
					});
				}
				
				for (let i = 0; i < rankResult.length; i++){
					// slice out the portion of bet that is smaller then the max bet in current level
					// e.g: palyersBet: [10,30,0,0,50,40,0,80,20,0] and rankResult[i]: [1,5]
					// max bet amount [1, 5] will be max(30, 40) = 40, 
					// so the slicedPot will be: 
					// [min(10, 40),min(30, 40),min(0, 40),min(0, 40),min(50, 40),
					//	min(40, 40),min(0, 40),min(80, 40),min(20, 40),min(0, 40)]
					// = [10,30,0,0,40,40,0,40,20,0]
					// playersBet now becomes: [0,0,0,0,10,0,0,40,0,0]
					let slicedPot: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
					let curMax: number = rankResult[i].reduce((preVal, curVal) => {
						return Math.max(preVal, this.playersBet[curVal]);
					}, 0);
					// slicedPot = slicedPot.map((ele) => {
					// 	return Math.min(ele, curMax);
					// });
					
					this.playersBet = this.playersBet.map((ele, index) => {
						slicedPot[index] = Math.min(ele, curMax);
						return ele - slicedPot[index];
					});
					
					// for one slice, if more than one players are ranked at same level,
					// they need to share the slice. following the previous example:
					// the two players to share slice are [1, 5] and their pots are [30,40],
					// obviously player 1 cann't get anything more than 30 from each other player.
					// Therefore the amount between 30 and 40 will all goes to player 5,
					// for the bet between 0 and 30, player 1 and 5 will share.
					// current slice is = [10,30,0,0,40,40,0,40,20,0].
					// Firstly player 5 get everything large than 30, which is [0,0,0,0,10,10,0,10,0,0], Sum = 30.
					// and what left in the slice is [10,30,0,0,30,30,0,30,20,0], sum = 150, two players will share.
					// Summarily: player 5 get 30 + 150/2 = 105 and player 1 get 150/2 = 75
					for (let j = 0; j < rankResult[i].length; j++){
						let nextStackLevel: number = (j == rankResult[i].length - 1) ? 0 : slicedPot[rankResult[i][j + 1]];
						let levelSum: number = 0;
						slicedPot = slicedPot.map((ele) => {
							levelSum += Math.max(0, ele - nextStackLevel);
							// console.log('breakdown: ' + ele);
							return Math.min(nextStackLevel, ele);
						});
						// calculate what is the amount each player will get
						let eachPlayerGet: number = Math.floor(levelSum / (j + 1));
						for (let k = 0; k <= j; k++){
							afterSplit[rankResult[i][k]] += eachPlayerGet;
							levelSum -= eachPlayerGet;
						}
						// levelSum may have some small portion left, for example levelSum = 151 and there are two players,
						// then eachPlayerGet = Math.floor(151/2) = 75, after each player takes 75, 1 will be left,
						// so just give the 1 to the first lucky guy.
						if (levelSum > 0) {
							afterSplit[rankResult[i][0]] += levelSum;
						}
					}
					// if all the money in the pot has been splitted, break the loop
					if (this.getPotSum() == 0) { break;}
				}
			}
			return afterSplit;			
		}
	}
}
