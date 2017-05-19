'use strict';

angular.module('fineFoodFinderApp')
  .controller('resultsCtrl', function($scope, $routeParams, $location, $http, $log){
    $scope.query = $routeParams.query;
    $http.get('http://localhost:3000/restaurants').then(function(response) {
        $scope.restdata = [];
        angular.forEach(response.data, function(value) {
          if ($scope.query.address !== undefined) {
            //$log.log(value.name + " has address " + value.address);
            //$log.log("addr: " + $scope.query.address);
            if (value.address.toLowerCase().includes($scope.query.address.toLowerCase())) {
              $scope.restdata.push(value);
            }
          }
        });
        //var listLen = $scope.restdata.length;

        if ($scope.restdata.length > 1) {
          var i = 0;
          while (i < $scope.restdata.length) {
            var j = $scope.restdata.length - 1;
            while (j > i) {
              if ($scope.restdata[j].rating > $scope.restdata[j-1].rating) {
                var t = $scope.restdata[j];
                $scope.restdata[j] = $scope.restdata[j-1];
                $scope.restdata[j-1] = t;
              }
              j = j - 1;
            }
            i = i + 1;
          }
        }

    });
    $scope.viewRestaurant = function(value) {
      $location.path('/restaurant').search({restdata: value});
    };
  });

