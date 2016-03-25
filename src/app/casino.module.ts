/// <reference path='type.d.ts' />

module casino {
	'use strict';
	angular.module('casino', [
		'ui.router',
		'ngMaterial',
		'casino.pokerroom'])
		.config(Config);
}