var deck = require('../../src/utiljs/deck');

xdescribe('deck', function () {
    beforeAll(function () {
        this.testDeck = new deck.DeckModule.Deck();
    });
    it('should has 52 cards', function () {
        expect(this.testDeck.all.length).toBe(52);
    });
});
