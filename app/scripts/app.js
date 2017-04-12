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
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/restaurants', {
        templateUrl: 'views/restaurants.html',
        controller: 'restCtrl',
        controllerAs: 'rest'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
