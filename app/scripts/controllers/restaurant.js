'use strict';

angular.module('fineFoodFinderApp')
  .controller('RestCtrl', function($scope, $routeParams, $location, $http, $log, $window) {
  	$scope.rest = $routeParams.restdata;
    $scope.rating = Math.round($scope.rest.rating);

    $http.get('http://localhost:3000/menus').then(function(response) {
  		angular.forEach(response.data, function(value) {
         		if (value.id === $scope.rest.id) {
         			$log.log("Found");
             		$scope.menuData = value.items;
             		angular.forEach($scope.menuData, function(value1) {
             			value1.price = (parseFloat(value1.price)).toFixed(2);
             		});
         		}
  		});
      $scope.originalMenu = angular.copy($scope.menuData);

      $scope.ascendingSort = function() {
        $log.log("Clicked Ascending");
        if ($scope.menuData.length > 1) {
          var i = 1;
          while (i < $scope.menuData.length) {
            var j = i;
            while (j > 0 && parseFloat($scope.menuData[j].price) < parseFloat($scope.menuData[j-1].price)) {
              var t = $scope.menuData[j];
              $scope.menuData[j] = $scope.menuData[j-1];
              $scope.menuData[j-1] = t;
              j = j - 1;
            }
            i = i + 1;
          }
        }
      };

      $scope.descendingSort = function() {
        $log.log("Clicked Descending");

        if ($scope.menuData.length > 1) {
          var i = 1;
          while (i < $scope.menuData.length) {
            var j = i - 1;
            var t = $scope.menuData[i];
            while (j >= 0 && parseFloat(t.price) > parseFloat($scope.menuData[j].price)) {
              $scope.menuData[j+1] = $scope.menuData[j];
              j = j - 1;
            }
            $scope.menuData[j+1] = t;
            i = i + 1;
          }
        }
      };

      $scope.resetMenu = function() {
        $log.log("Clicked Reset!");
        $scope.menuData = angular.copy($scope.originalMenu);
      };

      $scope.delete = function() {
        $log.log("Clicked Delete!");
        $http.delete('http://localhost:3000/restaurants/'+ $scope.rest.id).then(
          function(response) {
          $http.delete('http://localhost:3000/menus/'+ $scope.rest.id).then(
            function(response) {
            $log.log("Deleted succesfully");
            $window.alert($scope.rest.name + " deleted succesfully!");
            $location.path('#!/');
          }, function(response) {
            $log.error("Menu delete Error");
          });
        }, function(response) {
          $log.error("Delete Error");
        });

      };

      $scope.saveRatingToServer = function(rating) {
        $http.get('http://localhost:3000/restaurants').then(function(response) {
          angular.forEach(response.data, function(value) {
            if (value.id === $scope.rest.id) {

              let temp = value.rating*value.numRating;
              value.numRating = value.numRating+1;
              value.rating = Math.round((temp+rating)/value.numRating * 100)/100;

              let updateRest = {
                "id": value.id,
                "name": value.name,
                "address": value.address,
                "postcode": value.postcode,
                "email": value.email,
                "contactnumber": value.contactnumber,
                "imageUrl": value.imageUrl,
                "info": value.info,
                "rating":value.rating,
                "numRating": value.numRating,
                "diet": value.diet
              };

              $http.put('http://localhost:3000/restaurants/'+ value.id, JSON.stringify(updateRest)).then(
                function(response) {
                  $log.log("Updated succesfully");
                }, function(response) {
                  $log.error("Update Error");
                });

              $log.log(value.rating);
              $scope.rest.rating = value.rating;
              $scope.rating = Math.round(value.rating);
              $log.log($scope.rating);
            }
          });
        });
      };
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
        readonly: '@',
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
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
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
  .directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction);
                        }
                    });
                }
            };
    }]);