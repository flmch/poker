/// <reference path='type.d.ts' />

module casino {
	'use strict';
	export function Config(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider){
			$urlRouterProvider.otherwise('/');	
	}
}
