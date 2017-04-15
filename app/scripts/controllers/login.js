'use strict';

angular.module('fineFoodFinderApp')
  .controller('LoginCtrl', function($scope, $http, $log, $location) {
        $scope.signupBtnText = "Sign up";
        $scope.loginBtnText = "Log in";
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
                    $scope.loginBtnText = "Log out";
                } else {
                    $log.log("Invalid credentials");
                }
            });
        };
  });
