/**
 * Created by terios on 10/1/14.
 */

/**
 * @ngdoc function
 * @name recetteApp.controller:headerCtrl
 * @description
 * # headerCtrl
 * Controller of the recetteApp
 */
angular.module('recetteApp')
    .controller('headerCtrl', function ($scope) {
        $scope.init = function () {
            console.log('init du header');
        }
    });
