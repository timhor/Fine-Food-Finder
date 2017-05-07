'use strict';

angular.module('fineFoodFinderApp')
  .controller('LoginCtrl', function($scope, $http, $log, $location, loginService) {
    $scope.signupBtnText = loginService.getSignupBtnText();
    $scope.loginBtnText = loginService.getLoginBtnText();
    $scope.name = loginService.getLoggedInUser();
    $scope.loginService = loginService;
    $scope.allUsers = [];
    $scope.submit = function() {
      $http.get('http://localhost:3000/users').then(function(response) {
        $scope.allUsers = response.data;
        let loginSuccess = false;
        for (let i = 0; i < $scope.allUsers.length; i++) {
          let currentUser = $scope.allUsers[i];
          if ($scope.username === currentUser.username && $scope.password === currentUser.password) {
            $log.log($scope.username + " logged in");
            loginSuccess = true;
            break;
          }
        }
        if (loginSuccess) {
          $location.path('/');
          loginService.setLoginBtnText("Log out");
          loginService.setSignupBtnText("");
          loginService.setLoggedInUser($scope.username);
          $scope.signupBtnText = loginService.getSignupBtnText();
          $scope.loginBtnText = loginService.getLoginBtnText();
          $scope.name = loginService.getLoggedInUser();
          $log.log(loginService.getLoginBtnText());
        } else {
          $log.log("Invalid credentials");
        }
      });
    };
  });

angular.module('fineFoodFinderApp')
  .factory('loginService', function() {
    var service = {};

    var signupBtnText = "Sign up";
    var loginBtnText = "Log in";
    var loggedInUser = "Guest";

    service.getSignupBtnText = function() {
      return signupBtnText;
    }

    service.setSignupBtnText = function(text) {
      signupBtnText = text;
    }

    service.getLoginBtnText = function() {
      return loginBtnText;
    }

    service.setLoginBtnText = function(text) {
      loginBtnText = text;
    }

    service.getLoggedInUser = function() {
      return loggedInUser;
    }

    service.setLoggedInUser = function(text) {
      loggedInUser = text;
    }

    return service;
  });
