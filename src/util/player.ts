/// <reference path="./util.d.ts" />

import card = require('./card');
import deck = require('./deck');

export module PlayerModule {
	// export interface Hand {
	// 	card1: card.CardModule.Card;
	// 	card2: card.CardModule.Card;
	// }
	export class Player {
		name: string;
		hand: card.CardModule.Card[];
		constructor() {

		}
		getHand(hand: card.CardModule.Card[]) {
			this.hand = hand;
		}
	}	
}
