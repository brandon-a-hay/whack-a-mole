'use strict';

// Declare app level module which depends on views, and components
angular.module('whackamole', [
  'ngRoute',
  'whackamole.game'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/game'});
}]);
