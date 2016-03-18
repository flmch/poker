
var testCard = require('../../src/utiljs/card');
var testRank = require('../../src/utiljs/rank');

xdescribe('card', function(){
	it('should return correct card based on input string', function(){
		expect( JSON.stringify(testCard.CardModule.strToCard('SA')) ).toBe( JSON.stringify({suit:0, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('HA')) ).toBe( JSON.stringify({suit:1, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('CA')) ).toBe( JSON.stringify({suit:2, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('DA')) ).toBe( JSON.stringify({suit:3, value:1}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('H2')) ).toBe( JSON.stringify({suit:1, value:2}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('CT')) ).toBe( JSON.stringify({suit:2, value:10}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('DK')) ).toBe( JSON.stringify({suit:3, value:13}) );
		expect( JSON.stringify(testCard.CardModule.strToCard('DQ')) ).toBe( JSON.stringify({suit:3, value:12}) );
	});
	it('should return correct card array based on string array', function(){
		expect( JSON.stringify(testCard.CardModule.toCardArr(['DQ','SA'])) )
			.toBe( JSON.stringify([{suit:3, value:12}, {suit:0, value:1}]) );
		expect( JSON.stringify(testCard.CardModule.toCardArr(['DQ','SA','HA','CA','DA','H2','CT'])) )
			.toBe( JSON.stringify([
				{suit:3, value:12}, {suit:0, value:1}, {suit:1, value:1}, {suit:2, value:1},
				{suit:3, value:1}, {suit:1, value:2}, {suit:2, value:10}
				]) );	
	})
})