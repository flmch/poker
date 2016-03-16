
var testCard = require('../../src/utiljs/card');
var testRank = require('../../src/utiljs/rank');

var CardModule = testCard.CardModule;
var RankModule = testRank.RankModule;
var toCardArr = CardModule.toCardArr;

describe('rank', function(){
	it('should sort seven card according to value', function(){
		var sortCard = RankModule.sortCard;
		var original = [ 'S, A', 'S, T', 'S, 2', 'S, K', 'S, 5', 'S, 7', 'S, 8' ];
		var sorted = [ 'S, A', 'S, K', 'S, T', 'S, 8', 'S, 7', 'S, 5', 'S, 2' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );
		original = [ 'S, A', 'S, A', 'S, A', 'S, A', 'S, A', 'S, A', 'S, A' ];
		sorted = [ 'S, A', 'S, A', 'S, A', 'S, A', 'S, A', 'S, A', 'S, A' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );
		original = [ 'S, A', 'S, 2', 'S, 3', 'S, 4', 'S, 5', 'S, 5', 'S, 5' ];
		sorted = [ 'S, A', 'S, 5', 'S, 5', 'S, 5', 'S, 4', 'S, 3', 'S, 2' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );	
		original = [ 'S, 9', 'S, 8', 'S, T', 'S, 3', 'S, K', 'S, 5', 'S, A' ];
		sorted = [ 'S, A', 'S, K', 'S, T', 'S, 9', 'S, 8', 'S, 5', 'S, 3' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );
		original = [ 'S, 9', 'S, 8', 'C, 9', 'S, 3', 'S, K', 'S, 5', 'C, K' ];
		sorted = [ 'S, K', 'C, K', 'S, 9', 'C, 9', 'S, 8', 'S, 5', 'S, 3' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );
		original = [ 'S, A', 'S, K', 'C, A', 'C, K', 'H, A', 'H, K', 'D, A' ];
		sorted = [ 'S, A', 'C, A', 'H, A', 'D, A', 'S, K', 'C, K', 'H, K' ];
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );			
	});
	it('should return five numbers if straight exist, otherwise empty array', function(){
		var ifStraight = RankModule.ifStraight;
		var arr = [ 'S, A', 'S, K', 'S, Q', 'S, J', 'S, T', 'C, T', 'H, T' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([1,13,12,11,10]) );
		arr = [ 'C, K', 'S, K', 'S, Q', 'S, J', 'S, 9', 'C, 9', 'H, 9' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([]) );
		arr = [ 'S, A', 'S, Q', 'H, J', 'S, T', 'S, 9', 'C, 8', 'H, 7' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([12,11,10,9,8]) );		
		arr = [ 'S, K', 'S, Q', 'H, Q', 'S, J', 'S, T', 'C, 9', 'H, 8' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([13,12,11,10,9]) );
		arr = [ 'H, A', 'S, 7', 'H, 7', 'S, 5', 'H, 4', 'S, 3', 'C, 2' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([5,4,3,2,1]) );
		arr = [ 'H, A', 'S, 7', 'H, 6', 'S, 5', 'H, 4', 'S, 3', 'C, 2' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([7,6,5,4,3]) );		
		arr = [ 'S, 4', 'H, 4', 'S, 3', 'H, 3', 'S, 2', 'C, 2', 'H, 2' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([]) );
		arr = [ 'H, A', 'S, 5', 'H, 4', 'S, 3', 'H, 3', 'S, 2', 'C, 2' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([5,4,3,2,1]) );
		arr = [ 'S, A', 'H, K', 'S, T', 'H, 4', 'S, 4', 'C, 3', 'H, 2' ];
		expect( JSON.stringify(ifStraight(toCardArr(arr))) ).toBe( JSON.stringify([]) );					
	});
})