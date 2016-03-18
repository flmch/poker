/// <reference path="./util.d.ts" />

import card = require('./card');
import deck = require('./deck');
import rank = require('./rank');

export module PlayerModule {
	// export interface Hand {
	// 	card1: card.CardModule.Card;
	// 	card2: card.CardModule.Card;
	// }
	export class Player {
		private id: number;
		private name: string;
		private hand: card.CardModule.Card[];
		private handRank: rank.RankModule.HandOutput;
		private stack: number = 0;
		private betThisRound: number = 0;
		public ifFold: boolean = true;
		constructor(id: number, name: string, stack: number, hand?: card.CardModule.Card[]) {
			this.id = id;
			this.name = name;
			this.stack = stack;
			if (hand != undefined) { this.hand = hand; }
		}
		public assignHand(hand: card.CardModule.Card[]): void {
			if (hand.length == 2 && hand[0] instanceof card.CardModule.Card) {
				this.hand = hand;
			}
		}
		public rank(rank: rank.RankModule.HandOutput): void {
			this.handRank = rank;
		}
		public getHand(): card.CardModule.Card[] {
			return this.hand
		}
		public getId(): number {
			return this.id;
		}
	}	
}
