'use strict';

angular.module('fineFoodFinderApp')
  .controller('AddCtrl', function($scope, $http, $log, $window, $location) {
        $scope.checkboxModel = {
          value1 : false,
          value2 : false,
          value3 : false,
          value4 : false
        };

        $scope.items = [{name:"", description:"", price:""}];
        $scope.addRow = function(){
          $scope.items.push({name:"", description:"", price:""});
        };
        $scope.deleteRow = function(index){
          $scope.items.splice(index,1);
        };
        $scope.submit = function() {          
          $http.get('http://localhost:3000/restaurants').then(function(response) {
            let numRests = response.data.length;
            let newRestaurant = {
              "id": parseInt(numRests) + 1,
              "name": $scope.name,
              "address": $scope.address,
              "postcode": $scope.postcode,
              "email": $scope.email,
              "contactnumber": $scope.contactnumber,
              "imageUrl": $scope.imageUrl,
              "info": $scope.info,
              "rating":0,
              "numRating": 0,
              "diet": $scope.checkboxModel
            };

            let newRestaurantMenu = {
              "id": parseInt(numRests) + 1,
              "items": $scope.items
            };

            $http.post('http://localhost:3000/restaurants', JSON.stringify(newRestaurant)).then(
              function(response) {
              $http.post('http://localhost:3000/menus', JSON.stringify(newRestaurantMenu)).then(
                function(response) {
                  $log.log($scope.name + " added to database");
                  $window.alert($scope.name + " added to database!")
                  $location.path('#!/');
                }, function(response) {
                  $log.error("Error adding new restaurant menu");
                });
              }, function(response) {
                $log.error("Error creating new restaurant");
              });
            
            });
        };
  });
