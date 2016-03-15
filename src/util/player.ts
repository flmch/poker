/// <reference path="./util.d.ts" />

import CardModule = require('./card');
import DeckModule = require('./deck');

export class Player {
	name: string;
	hand: CardModule.Card[];
	constructor() {

	}
	getHand(hand: CardModule.Card[]) {
		this.hand = hand;
	}
}