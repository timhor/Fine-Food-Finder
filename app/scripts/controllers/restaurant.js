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
	});
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
  });

