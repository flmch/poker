var testCard = require('../../src/utiljs/card');
var testRank = require('../../src/utiljs/rank');
var testPlayer = require('../../src/utiljs/player');
var testGame = require('../../src/utiljs/game');

var CardModule = testCard.CardModule;
var RankModule = testRank.RankModule;
var PlayerModule = testPlayer.PlayerModule;
var GameModule = testGame.GameModule;
var toCardArr = CardModule.toCardArr;

describe('split pot', function(){
	beforeAll(function(){
		this.g = new GameModule.Game();
		this.g.addPlayer(0,'000',100);
		this.g.addPlayer(1,'000',100);
		this.g.addPlayer(2,'000',100);
		this.g.addPlayer(3,'000',100);
		this.g.addPlayer(4,'000',100);
		this.g.addPlayer(5,'000',100);
		this.g.addPlayer(6,'000',100);
		this.g.addPlayer(7,'000',100);
		this.g.addPlayer(8,'000',100);
		this.g.addPlayer(9,'000',100);
	});
	beforeEach(function(){
		this.g.players[0].ifFold = true;
		this.g.players[1].ifFold = true;
		this.g.players[2].ifFold = true;
		this.g.players[3].ifFold = true;
		this.g.players[4].ifFold = true;
		this.g.players[5].ifFold = true;
		this.g.players[6].ifFold = true;
		this.g.players[7].ifFold = true;
		this.g.players[8].ifFold = true;
		this.g.players[9].ifFold = true;
	});
	xit('should split the pot correctly test 0', function(){
		this.g.players[0].assignHand(toCardArr(['SA','H3']));
		this.g.players[0].ifFold = false;
		this.g.board = { flop: toCardArr(['C9','H8','H7']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		this.g.playersBet = [30,50,0,1,0,20,0,0,0,0];
		var output = this.g.splitPot();
		var target = [101,0,0,0,0,0,0,0,0,0];
		expect(JSON.stringify(output)).toBe(JSON.stringify(target));
	});
	xit('should split the pot correctly test 1', function(){
		this.g.players[0].assignHand(toCardArr(['SA','H3']));
		this.g.players[1].assignHand(toCardArr(['HA','C4']));
		this.g.players[0].ifFold = false;
		this.g.players[1].ifFold = false;
		this.g.board = { flop: toCardArr(['C9','H8','H7']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		this.g.playersBet = [30,50,0,1,0,20,0,0,0,0];
		var output = this.g.splitPot();
		var target = [40,61,0,0,0,0,0,0,0,0];
		expect(JSON.stringify(output)).toBe(JSON.stringify(target));
	});
	xit('should split the pot correctly test 2', function(){
		this.g.players[0].assignHand(toCardArr(['SA','H3']));
		this.g.players[1].assignHand(toCardArr(['HA','C4']));
		this.g.players[2].assignHand(toCardArr(['CA','D4']));
		this.g.players[0].ifFold = false;
		this.g.players[1].ifFold = false;
		this.g.players[2].ifFold = false;
		this.g.board = { flop: toCardArr(['C9','H8','H7']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		this.g.playersBet = [30,50,40,1,0,20,0,0,0,0];
		var output = this.g.splitPot();
		var target = [37,57,47,0,0,0,0,0,0,0];
		expect(JSON.stringify(output)).toBe(JSON.stringify(target));
	});
	it('should split the pot correctly test 3', function(){
		this.g.players[0].assignHand(toCardArr(['D8','D9']));
		this.g.players[1].assignHand(toCardArr(['D4','D3']));
		this.g.players[2].assignHand(toCardArr(['H5','S2']));
		this.g.players[3].assignHand(toCardArr(['C7','H7']));
		this.g.players[4].assignHand(toCardArr(['C6','H6']));
		this.g.players[5].assignHand(toCardArr(['DT','DJ']));
		this.g.players[6].assignHand(toCardArr(['S9','H8']));
		this.g.players[7].assignHand(toCardArr(['S8','C4']));
		this.g.players[8].assignHand(toCardArr(['H4','C3']));
		this.g.players[9].assignHand(toCardArr(['SA','H3']));						
		this.g.players[0].ifFold = false;
		this.g.players[1].ifFold = false;
		this.g.players[2].ifFold = false;
		this.g.players[3].ifFold = false;
		this.g.players[4].ifFold = false;
		this.g.players[5].ifFold = false;
		this.g.players[6].ifFold = false;
		this.g.players[7].ifFold = false;
		this.g.players[8].ifFold = false;
		this.g.players[9].ifFold = false;						
		this.g.board = { flop: toCardArr(['D5','S5','C5']), turn: toCardArr(['D6']), river: toCardArr(['D7']) };
		this.g.playersBet = [10,20,30,40,50,60,70,80,90,100];
		var output = this.g.splitPot();
		var target = [100,90,80,70,60,50,40,30,20,10];
		expect(JSON.stringify(output)).toBe(JSON.stringify(target));
	});
	it('should split the pot correctly test 3', function(){
		this.g.players[0].assignHand(toCardArr(['D8','D9']));
		this.g.players[1].assignHand(toCardArr(['D4','D3']));
		this.g.players[2].assignHand(toCardArr(['H5','S2']));
		this.g.players[3].assignHand(toCardArr(['C7','H7']));
		this.g.players[4].assignHand(toCardArr(['C6','H6']));
		this.g.players[5].assignHand(toCardArr(['DT','DJ']));
		this.g.players[6].assignHand(toCardArr(['S9','H8']));
		this.g.players[7].assignHand(toCardArr(['S8','C4']));
		this.g.players[8].assignHand(toCardArr(['H4','C3']));
		this.g.players[9].assignHand(toCardArr(['SA','H3']));						
		this.g.players[0].ifFold = false;
		this.g.players[1].ifFold = false;
		this.g.players[2].ifFold = false;
		this.g.players[3].ifFold = false;
		this.g.players[4].ifFold = false;
		this.g.players[5].ifFold = false;
		this.g.players[6].ifFold = false;
		this.g.players[7].ifFold = false;
		this.g.players[8].ifFold = false;
		this.g.players[9].ifFold = false;						
		this.g.board = { flop: toCardArr(['D5','S5','C5']), turn: toCardArr(['D6']), river: toCardArr(['D7']) };
		this.g.playersBet = [100,90,80,70,60,50,40,30,20,10];
		var output = this.g.splitPot();
		var target = [550,0,0,0,0,0,0,0,0,0];
		expect(JSON.stringify(output)).toBe(JSON.stringify(target));
	});	
})