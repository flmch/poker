/// <reference path="./util.d.ts" />

import CardModule = require('./card');
// let Card = Card.Card;

'use strict';
export class Game {
	c1: CardModule.Card;
	constructor() {
		this.c1 = new CardModule.Card(CardModule.CardSuit.SPADE, CardModule.CardVal.ACE);
	}
}
