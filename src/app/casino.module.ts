/// <reference path='type.d.ts' />

module casino {
	'use strict';
	angular.module('casino', [
		'ui.router',
		'casino.pokerroom'])
		.config(Config);
}