'use strict';

angular.module('fineFoodFinderApp')
  .controller('LoginCtrl', function($scope, $http, $log, $location, loginService) {
    $scope.loginService = loginService;
    $scope.loginVars = function() {
      return loginService.loginVars;
    };
    $scope.currentUser = loginService.currentUser;

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
          loginService.loginVars.loggedIn = true;
          loginService.loginVars.loginBtnText = "Log out";
          loginService.loginVars.currentUser = ", " + $scope.username;
        } else {
          $log.log("Invalid credentials");
        }
      });
    };

    $scope.logout = function() {
      if (loginService.loginVars.loggedIn) {
        loginService.loginVars.loggedIn = false;
        loginService.loginVars.loginBtnText = "Log in";
        loginService.loginVars.currentUser = "";
      }
    };
  });

angular.module('fineFoodFinderApp')
  .service("loginService", function() {
    this.loginVars = {
      loginBtnText: "Log in",
      currentUser: "",
      loggedIn: false
    };
  });