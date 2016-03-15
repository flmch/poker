
var testCard = require('../../src/util/card');
var testRank = require('../../src/util/rank');



var CardModule = testCard.CardModule;
var RankModule = testRank.RankModule;

describe('rank', function(){
	beforeAll(function(){

	});
	it('should sort seven card according to value', function(){
		// console.log(test);
		// var original = [
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 10 },
		// 		{ suit: 0, value: 2  },
		// 		{ suit: 0, value: 13 },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 7  },
		// 		{ suit: 0, value: 8  }
		// 	];
		
		// var sorted = testRank.RankModule.sortCard([
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 13 },
		// 		{ suit: 0, value: 10 },
		// 		{ suit: 0, value: 8  },
		// 		{ suit: 0, value: 7  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 2  }
		// 	]);
		var toCardArr = CardModule.toCardArr;
		var sortCard = RankModule.sortCard;
		var original = [ 'S, A', 'S, T', 'S, 2', 'S, K', 'S, 5', 'S, 7', 'S, 8' ];
		var sorted = [ 'S, A', 'S, K', 'S, T', 'S, 8', 'S, 7', 'S, 5', 'S, 2' ];
		console.log(toCardArr(original));
		console.log(toCardArr(sorted));
		expect(  JSON.stringify(sortCard(toCardArr(original))) ).toBe( JSON.stringify(toCardArr(sorted)) );

		// original = [
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  }
		// 	];
		// sorted = testRank.RankModule.sortCard([
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 1  }
		// 	]);
		// expect(testRank.RankModule.sortCard(original).toString()).toBe(sorted.toString());
		// original = [
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 2  },
		// 		{ suit: 0, value: 3  },
		// 		{ suit: 0, value: 4  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 5  }
		// 	];
		// sorted = testRank.RankModule.sortCard([
		// 		{ suit: 0, value: 1  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 5  },
		// 		{ suit: 0, value: 4  },
		// 		{ suit: 0, value: 3  },
		// 		{ suit: 0, value: 2  }
		// 	]);
		// expect(testRank.RankModule.sortCard(original).toString()).toBe(sorted.toString());			
	})
})