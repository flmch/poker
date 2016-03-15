/// <reference path="./util.d.ts" />

'use strict';

import CardModule = require('./card');
// let Card = Card.Card;

export class Game {
	c1: CardModule.Card;
	constructor() {
		this.c1 = new CardModule.Card(CardModule.CardSuit.SPADE, CardModule.CardVal.ACE);
	}
}
