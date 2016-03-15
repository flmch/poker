/// <reference path="./util.d.ts" />

import card = require('./card');

export module DeckModule {
	export class Deck {
		all: card.CardModule.Card[];
		constructor() {
			this.newDeck();
		 	this.shuffle();
		 	// console.log(this.all);
		}
		newDeck() {
			this.all = [];
			for (let i: number = 0; i < 4; i++) {
				for (let j: number = 1; j <= 13; j++) {
					this.all.push(new card.CardModule.Card(i, j));
				}
			}
		}
		shuffle(): void {
			let index: number;
			let temp: card.CardModule.Card;
			for(let i:number = 0; i < 52; i++){
				index = i + Math.floor( Math.random()*(52-i) );
				temp = this.all[i];
				this.all[i] = this.all[index];
				this.all[index] = temp;
			}
		}
		dealHand(): card.CardModule.Card[] {
			let card1: card.CardModule.Card = this.all.pop();
			let card2: card.CardModule.Card = this.all.pop();
			return [ card1, card2 ];
		}
		burnCard(): void {
			this.all.pop();
		}
		flop(): card.CardModule.Card[] {
			let card1: card.CardModule.Card = this.all.pop();
			let card2: card.CardModule.Card = this.all.pop();
			let card3: card.CardModule.Card = this.all.pop();
			return [card1, card2, card3];
		}
		turn(): card.CardModule.Card[] {
			return [this.all.pop()]
		}
		river(): card.CardModule.Card[] {
			return [this.all.pop()]
		}	
	}	
}
