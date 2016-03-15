/// <reference path="./util.d.ts" />

'use strict';

export enum CardSuit {
	SPADE,
	HEART,
	CLUB,
	DIAMOND
}

export enum CardVal {
	ACE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	EIGHT = 8,
	NINE = 9,
	TEN = 10,
	JACK = 11,
	QUEEN = 12,
	KING = 13
}

export class Card {
	suit: CardSuit;
	value: CardVal;
	constructor(s: CardSuit, v: CardVal) {
		this.suit = s;
		this.value = v;
	}
}
