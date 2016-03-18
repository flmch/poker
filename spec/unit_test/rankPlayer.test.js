var testCard = require('../../src/utiljs/card');
var testRank = require('../../src/utiljs/rank');
var testPlayer = require('../../src/utiljs/player');
var testGame = require('../../src/utiljs/game');

var CardModule = testCard.CardModule;
var RankModule = testRank.RankModule;
var PlayerModule = testPlayer.PlayerModule;
var GameModule = testGame.GameModule;
var toCardArr = CardModule.toCardArr;

describe('rankPlayers', function(){
	beforeAll(function(){
		this.compareTwoP = RankModule.compareTwoP;
		this.rankPlayers = RankModule.rankPlayers;
	});
	it('compare two players hand properly', function(){
		var g1 = new GameModule.Game();
		var p1 = new PlayerModule.Player(0,'xi',100,toCardArr(['SA','HA']));
		var p2 = new PlayerModule.Player(0,'jin',100,toCardArr(['H5','HK']));
		g1.board = { flop: toCardArr(['C9','H8','H7']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
		p1.assignHand(toCardArr(['SA','HK']));
		p2.assignHand(toCardArr(['DA','HQ']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['SA','H3']));
		p2.assignHand(toCardArr(['DA','H5']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(0);		
		p1.assignHand(toCardArr(['HA','C9']));
		p2.assignHand(toCardArr(['S9','C7']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['ST','D8']));
		p2.assignHand(toCardArr(['HA','C9']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['D8','D4']));
		p2.assignHand(toCardArr(['S8','D5']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(0);
		p1.assignHand(toCardArr(['D6','D5']));
		p2.assignHand(toCardArr(['S8','D5']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['D6','D5']));
		p2.assignHand(toCardArr(['SJ','DT']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
		p1.assignHand(toCardArr(['DT','D6']));
		p2.assignHand(toCardArr(['SJ','DT']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
		p1.assignHand(toCardArr(['DT','D6']));
		p2.assignHand(toCardArr(['SJ','DT']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
		p1.assignHand(toCardArr(['H5','HK']));
		p2.assignHand(toCardArr(['HA','HQ']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
		p1.assignHand(toCardArr(['H5','HK']));
		p2.assignHand(toCardArr(['SJ','DT']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['S9','H9']));
		p2.assignHand(toCardArr(['S7','C7']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		p1.assignHand(toCardArr(['S8','D8']));
		p2.assignHand(toCardArr(['S9','H9']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(-1);
		g1.board = { flop: toCardArr(['HQ','HJ','HT']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		p1.assignHand(toCardArr(['HA','D8']));
		p2.assignHand(toCardArr(['H9','H8']));
		expect(this.compareTwoP(g1.board, p1, p2)).toBe(1);
	});
	it('rank players hands correctly', function(){
		var g1 = new GameModule.Game();
		var p1 = new PlayerModule.Player(0,'xi',100, toCardArr(['SA','HA']));
		var p2 = new PlayerModule.Player(1,'jin',100, toCardArr(['H5','HK']));
		var p3 = new PlayerModule.Player(2,'33',100, toCardArr(['D9','H9']));
		var p4 = new PlayerModule.Player(3,'33',100, toCardArr(['C7','D7']));
		var p5 = new PlayerModule.Player(4,'33',100, toCardArr(['HA','D3']));
		var p6 = new PlayerModule.Player(5,'33',100, toCardArr(['CA','D4']));
		var p7 = new PlayerModule.Player(6,'33',100, toCardArr(['DA','D5']));
		var p8 = new PlayerModule.Player(7,'33',100, toCardArr(['DJ','DT']));
		var p9 = new PlayerModule.Player(8,'33',100, toCardArr(['CJ','CT']));
		var p10 = new PlayerModule.Player(9,'33',100, toCardArr(['HT','C6']));
		var players = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10];
		g1.board = { flop: toCardArr(['C9','H8','H7']), turn: toCardArr(['C8']), river: toCardArr(['H2']) };
		var output = this.rankPlayers(g1.board, players);
		expect(JSON.stringify(output)).toBe(JSON.stringify( [[2],[3],[1],[7,8],[9],[0],[4,5,6]] ));
		// ------------------------------------------------------------------
		g1.board = { flop: toCardArr(['S6','S5','S4']), turn: toCardArr(['S3']), river: toCardArr(['S2']) };
		output = this.rankPlayers(g1.board, players);
		expect(JSON.stringify(output)).toBe(JSON.stringify( [[0,1,2,3,4,5,6,7,8,9]] ));
		// ------------------------------------------------------------------
		p1.assignHand(toCardArr(['HA','DK']));
		p2.assignHand(toCardArr(['D6','S6']));
		p3.assignHand(toCardArr(['HQ','CT']));
		p4.assignHand(toCardArr(['HT','S2']));
		p5.assignHand(toCardArr(['H5','S4']));
		players = [p1,p2,p3,p4,p5];
		g1.board = { flop: toCardArr(['H9','H8','H7']), turn: toCardArr(['H6']), river: toCardArr(['C6']) };
		output = this.rankPlayers(g1.board, players);
		expect(JSON.stringify(output)).toBe(JSON.stringify( [[3],[4],[1],[0],[2]] ));
		// ------------------------------------------------------------------
		p1.assignHand(toCardArr(['HA','D2']));
		p2.assignHand(toCardArr(['DA','D3']));
		p3.assignHand(toCardArr(['CA','D4']));
		p4.assignHand(toCardArr(['SA','C2']));
		p5.assignHand(toCardArr(['HK','D8']));
		players = [p1,p2,p3,p4,p5];
		g1.board = { flop: toCardArr(['H9','C8','D7']), turn: toCardArr(['H6']), river: toCardArr(['C6']) };
		output = this.rankPlayers(g1.board, players);
		expect(JSON.stringify(output)).toBe(JSON.stringify( [[4],[0,1,2,3]] ));		
	});
})