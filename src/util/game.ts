/// <reference path="./util.d.ts" />

'use strict';

import card = require('./card');
import deck = require('./deck');
import player = require('./player');

export module gameModule {

	export interface Board {
		flop: card.CardModule.Card[];
		turn: card.CardModule.Card[];
		river: card.CardModule.Card[];
	}

	export class Game {
		players: player.PlayerModule.Player[];
		board: Board = { 'flop': [], 'turn': [], 'river': []};
		deck: deck.DeckModule.Deck;
		constructor() {
			
		}
	}
}
