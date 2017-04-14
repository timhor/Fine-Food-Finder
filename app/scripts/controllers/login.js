'use strict';

angular.module('fineFoodFinderApp')
  .controller('LoginCtrl', function($scope, $http) {
        $scope.allUsers = [];
        $scope.submit = function() {
            $http.get('http://localhost:3000/users').then(function(response) {
                $scope.allUsers = response.data;
            });
        };
  });
