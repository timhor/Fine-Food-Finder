'use strict';

/**
 * @ngdoc overview
 * @name fineFoodFinderApp
 * @description
 * # fineFoodFinderApp
 *
 * Main module of the application.
 */
angular
  .module('fineFoodFinderApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'resultsCtrl',
        controllerAs: 'result'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signup'
      })
      .when('/restaurant', {
        templateUrl: 'views/restaurant.html',
        controller: 'RestCtrl',
        controllerAs: 'rest'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
