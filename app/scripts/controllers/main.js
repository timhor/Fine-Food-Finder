'use strict';

/**
 * @ngdoc function
 * @name fineFoodFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fineFoodFinderApp
 */
angular.module('fineFoodFinderApp')
  .controller('MainCtrl', function($scope, $location) {
    $scope.search = function() {
        $location.path('/results').search({query: $scope.query});
    };
  });

$(document).ready(function () {
$('.nav li a').click(function(e) {

    $('.nav li').removeClass('active');

    var $parent = $(this).parent();
    if (!$parent.hasClass('active')) {
        $parent.addClass('active');
    }

});
});