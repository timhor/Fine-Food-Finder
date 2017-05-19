'use strict';

angular.module('fineFoodFinderApp')
  .controller('RestCtrl', function($scope, $routeParams, $location, $http){
	$scope.rest = $routeParams.restdata;
    $scope.rating = $scope.rest.rating;
    $http.get('http://localhost:3000/menus').then(function(response) {
		angular.forEach(response.data, function(value) {
       		if (value.id === $scope.rest.id) {
       			console.log("found");
           		$scope.menuData = value.items;
           		angular.forEach($scope.menuData, function(value1) {
           			value1.price = (parseFloat(value1.price)).toFixed(2);
           		});
       		}
		});
    $scope.ascendingSort = function() {
      console.log("Clicked Ascending!");
      if ($scope.menuData.length > 1) {
        var i = 0;
        while (i < $scope.menuData.length) {
          var j = $scope.menuData.length - 1;
          while (j > i) {
            if (parseFloat($scope.menuData[j].price) < parseFloat($scope.menuData[j-1].price)) {
              var t = $scope.menuData[j];
              $scope.menuData[j] = $scope.menuData[j-1];
              $scope.menuData[j-1] = t;
            }
            j = j - 1;
          }
          i = i + 1;
        }
      }
    };
    $scope.descendingSort = function() {
      console.log("Clicked Descending!");

      if ($scope.menuData.length > 1) {
        var i = 0;
        while (i < $scope.menuData.length) {
          var j = $scope.menuData.length - 1;
          while (j > i) {
            if (parseFloat($scope.menuData[j].price) > parseFloat($scope.menuData[j-1].price)) {
              var t = $scope.menuData[j];
              $scope.menuData[j] = $scope.menuData[j-1];
              $scope.menuData[j-1] = t;
            }
            j = j - 1;
          }
          i = i + 1;
        }
      }
    };
	});
    /*
  $scope.ascendingSort = function() {
    console.log("Clicked!");
  };
  */
  })

  .directive('fundooRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)" size="20">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(newVal, oldVal) {
          if (newVal || newVal === 0) {
            updateStars();
          }
        });
      }
    };
  })
  /*
  .directive('ascendingSort', function() {
    return console.log("Clicked!");
  });
  */
