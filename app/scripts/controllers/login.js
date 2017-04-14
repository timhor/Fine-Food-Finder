'use strict';

angular.module('fineFoodFinderApp')
  .controller('LoginCtrl', function($scope) {
    $scope.list = [];
    $scope.submit = function() {
      if ($scope.email) {
        $scope.list.push(this.username);
        $scope.list.push(this.password1);
        $scope.list.push(this.password2);
        $scope.list.push(this.email);
      }
    };
  });
