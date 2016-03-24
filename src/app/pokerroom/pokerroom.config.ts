/// <reference path='../type.d.ts' />

module casino.pokerroom {
	'use strict';
	export function ConfigurePokerRoom($stateProvider: ng.ui.IStateProvider) {
		$stateProvider.state('pokerRoom', {
			url: '/poker-room',
			templateUrl: 'template/pokerroom/pokerroom.tpl.html'
		});		
	}
}
