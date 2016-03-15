var deck = require('../../src/util/deck');

describe('deck', function () {
    beforeAll(function () {
        this.testDeck = new deck.DeckModule.Deck();
    });
    it('should has 52 cards', function () {
        expect(this.testDeck.all.length).toBe(52);
    });
});
