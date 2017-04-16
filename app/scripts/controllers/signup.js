'use strict';

angular.module('fineFoodFinderApp')
  .controller('SignUpCtrl', function($scope, $http, $log, $window, $location) {
        $scope.list = [];
        $scope.submit = function() {
          if ($scope.password1 === $scope.password2) {
            $http.get('http://localhost:3000/users').then(function(response) {
              let numUsers = response.data.length;
              let newUser = {
                "id": parseInt(numUsers) + 1,
                "username": $scope.username,
                "password": $scope.password1,
                "email": $scope.email
              };
              $http.post('http://localhost:3000/users', JSON.stringify(newUser)).then(
                function(response) {
                  $log.log($scope.username + " (" + $scope.email + ") signed up");
                  $location.path('/login');
                }, function(response) {
                  $log.error("Error creating new user");
                });
            });
          } else {
            $window.alert("Error: passwords don't match");
          }
        };
  });
