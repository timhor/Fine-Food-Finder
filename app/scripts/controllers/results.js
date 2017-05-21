'use strict';

angular.module('fineFoodFinderApp')
  .controller('resultsCtrl', function($scope, $routeParams, $location, $http, $log){
    $scope.query = $routeParams.query;
    $scope.ratingsCount = 0;
    $scope.priceCount = 0;
    $http.get('http://localhost:3000/restaurants').then(function(response) {
      $scope.restdata = [];
      angular.forEach(response.data, function(value) {
        if ($scope.query.address !== undefined) {
          if (value.address.toLowerCase().includes($scope.query.address.toLowerCase())) {
            $http.get('http://localhost:3000/menus').then(function(response) {
              $scope.priceSum = 0.00;
              $scope.counter = 0;
              angular.forEach(response.data, function(menuVal) {
                if (menuVal.id === value.id) {
                  angular.forEach(menuVal.items, function(value1) {
                    $scope.priceSum = $scope.priceSum +  parseFloat(value1.price);
                    $scope.counter += 1;
                  });
                }
              });
              var defaultPrice = 15;
              if ($scope.priceSum !== 0) {
                value.avgPrice = $scope.priceSum / $scope.counter;
                value.avgPrice = value.avgPrice.toFixed(2);
              } else {
                value.avgPrice = defaultPrice.toFixed(2);
              }
            });
            $scope.restdata.push(value);

          }
          
        }
      });
    });
    $scope.sortRatings = function() {
      $scope.ratingsCount = ($scope.ratingsCount + 1) % 2;
      if ($scope.ratingsCount === 1) {
        // DESCENDING BUBBLE SORT
        if ($scope.restdata.length > 1) {
          let i = 0;
          while (i < $scope.restdata.length) {
            let j = $scope.restdata.length - 1;
            while (j > i) {
              if ($scope.restdata[j].rating > $scope.restdata[j-1].rating) {
                let t = $scope.restdata[j];
                $scope.restdata[j] = $scope.restdata[j-1];
                $scope.restdata[j-1] = t;
              }
              j = j - 1;
            }
            i = i + 1;
          }
        }
      } else {
        // TODO CHANGE TO NEW SORT
        if ($scope.restdata.length > 1) {
          let i = 0;
          while (i < $scope.restdata.length) {
            let j = $scope.restdata.length - 1;
            while (j > i) {
              if ($scope.restdata[j].rating < $scope.restdata[j-1].rating) {
                let t = $scope.restdata[j];
                $scope.restdata[j] = $scope.restdata[j-1];
                $scope.restdata[j-1] = t;
              }
              j = j - 1;
            }
            i = i + 1;
          }
        }
      }
    };

    $scope.sortPrice = function() {
      $scope.priceCount = ($scope.priceCount + 1) % 2;
      if ($scope.priceCount === 1) {
        // TODO CHANGE TO NEW SORT
        if ($scope.restdata.length > 1) {
          let i = 0;
          while (i < $scope.restdata.length) {
            let j = $scope.restdata.length - 1;
            while (j > i) {
              if (parseFloat($scope.restdata[j].avgPrice) > parseFloat($scope.restdata[j-1].avgPrice)) {
                let t = $scope.restdata[j];
                $scope.restdata[j] = $scope.restdata[j-1];
                $scope.restdata[j-1] = t;
              }
              j = j - 1;
            }
            i = i + 1;
          }
        }
      } else {
        // TODO CHANGE TO NEW SORT
        if ($scope.restdata.length > 1) {
          let i = 0;
          while (i < $scope.restdata.length) {
            let j = $scope.restdata.length - 1;
            while (j > i) {
              if (parseFloat($scope.restdata[j].avgPrice) < parseFloat($scope.restdata[j-1].avgPrice)) {
                let t = $scope.restdata[j];
                $scope.restdata[j] = $scope.restdata[j-1];
                $scope.restdata[j-1] = t;
              }
              j = j - 1;
            }
            i = i + 1;
          }
        }
      }
    };

    $scope.viewRestaurant = function(value) {
      $location.path('/restaurant').search({restdata: value});
    };
  });
