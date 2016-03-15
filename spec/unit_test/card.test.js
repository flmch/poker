
var testCard = require('../../src/util/card');
var testRank = require('../../src/util/rank');

describe('card', function(){
	it('should return correct card based on input string', function(){
		expect( JSON.stringify(testCard.CardModule.strToCard('S,A')) ).toBe( JSON.stringify({suit:0, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('H,A')) ).toBe( JSON.stringify({suit:1, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('C,A')) ).toBe( JSON.stringify({suit:2, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('D,A')) ).toBe( JSON.stringify({suit:3, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('H,2')) ).toBe( JSON.stringify({suit:1, value:2}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('C,T')) ).toBe( JSON.stringify({suit:2, value:10}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('D,K')) ).toBe( JSON.stringify({suit:3, value:13}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('D,Q')) ).toBe( JSON.stringify({suit:3, value:12}) );
	});
	it('should return correct card array based on string array', function(){
		expect( JSON.stringify(testCard.CardModule.toCardArr(['D,Q','S,A'])) )
			.toBe( JSON.stringify([{suit:3, value:12}, {suit:0, value:1}]) );
		expect( JSON.stringify(testCard.CardModule.toCardArr(['D,Q','S,A','H,A','C,A','D,A','H,2','C,T'])) )
			.toBe( JSON.stringify([
				{suit:3, value:12}, {suit:0, value:1}, {suit:1, value:1}, {suit:2, value:1},
				{suit:3, value:1}, {suit:1, value:2}, {suit:2, value:10}
				]) );	
	})
})