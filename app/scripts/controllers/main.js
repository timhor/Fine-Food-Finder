'use strict';

angular.module('fineFoodFinderApp')
  .controller('MainCtrl', function($scope, $location) {
    $scope.search = function() {
        $location.path('/results').search({query: $scope.query});
    };
  });

// highlights active tab in navbar
$(".nav a").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).parent().addClass("active");
});
