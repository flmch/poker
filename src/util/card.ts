/// <reference path="./util.d.ts" />

export module CardModule {
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

	export let cardValStrength = [1, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	let cardInit = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
	let suitInit = ['S', 'H', 'C', 'D'];
	
	export function strToCard(str: string): Card {
		let parsed = str.trim().split(',');
		parsed[0] = parsed[0].trim();
		parsed[1] = parsed[1].trim();
		return new Card(suitInit.indexOf(parsed[0]), cardInit.indexOf(parsed[1]));
	}

	export function toCardArr(strArr: string[]): Card[] {
		return strArr.map((str) => {
			return strToCard(str);
		});
	}

	export class Card {
		suit: CardSuit;
		value: CardVal;
		constructor(s: CardSuit, v: CardVal) {
			this.suit = s;
			this.value = v;
		}
	}	
}
