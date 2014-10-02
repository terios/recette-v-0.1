/**
 * Created by terios on 10/1/14.
 */

'use strict';

/**
 * @ngdoc function
 * @name recetteApp.controller:footerCtrl
 * @description
 * # footerCtrl
 * Controller of the recetteApp
 */
angular.module('recetteApp').controller('footerCtrl', function ($scope) {
    $scope.init = function () {
        console.log('init du footer');
    }
});
