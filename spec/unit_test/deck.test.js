var deck = require('../../src/utiljs/deck');

describe('deck', function () {
    beforeAll(function () {
        this.testDeck = new deck.DeckModule.Deck();
    });
    it('should has 52 cards', function () {
        expect(this.testDeck.all.length).toBe(52);
    });
    it('should has no duplicate cards', function(){
    	var toStr = this.testDeck.all.map(function(card){
    		return JSON.stringify(card);
    	});
    	toStr.forEach(function(str, index){
    		var count = 0;
    		toStr.forEach(function(s){
    			if( str == s ){
    				count++;
    			}
    		})
    		expect(count).toBe(1);
    	});
    });
    it('should have four suits and 13 cards for each suit', function(){
    	var suits = [0,0,0,0];
    	this.testDeck.all.forEach(function(card){
    		suits[card.suit]++;
    	});
    	expect(JSON.stringify(suits)).toBe(JSON.stringify([13,13,13,13]));
    });
});
