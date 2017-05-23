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
        sha256($scope.password).then(function(digest) {
          for (let i = 0; i < $scope.allUsers.length; i++) {
            let currentUser = $scope.allUsers[i];
            if ($scope.username === currentUser.username && digest === currentUser.password) {
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

// the following code is taken verbatim from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

function sha256(str) {
  var buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash);
  });
}

function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i);
    var stringValue = value.toString(16);
    var padding = '00000000';
    var paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}