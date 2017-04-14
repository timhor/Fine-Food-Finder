'use strict';

/**
 * @ngdoc function
 * @name fineFoodFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fineFoodFinderApp
 */
angular.module('fineFoodFinderApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
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