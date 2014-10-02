'use strict';

/**
 * @ngdoc function
 * @name recetteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the recetteApp
 */
angular.module('recetteApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
