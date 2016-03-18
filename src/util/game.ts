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
		public board: Board = { 'flop': [], 'turn': [], 'river': []};
		constructor() {
			this.deck = new deck.DeckModule.Deck();
		}
		dealFlop(): void { this.board.flop = this.deck.flop(); }
		dealTurn(): void { this.board.turn = this.deck.turn(); }
		dealRiver(): void { this.board.river = this.deck.river(); }
		addPlayer(id: number, name: string, stack: number): void {
			this.players[id] = new player.PlayerModule.Player(id, name, stack);
		}
		splitPot(): void {
			
		}
	}
}
