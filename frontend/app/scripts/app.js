'use strict';

angular
  .module('wtbApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'leaflet-directive',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/tools.html',
        controller: 'MainCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
