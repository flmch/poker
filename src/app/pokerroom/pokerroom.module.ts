/// <reference path='../type.d.ts' />

module casino.pokerroom {
	'use strict';
	angular.module('casino.pokerroom', [
		'ui.router',
		'ngMaterial',
		'ngAnimate', 
		'ngAria'
		])
		.config(ConfigurePokerRoom);
}