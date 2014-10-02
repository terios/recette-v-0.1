'use strict';

/**
 * @ngdoc overview
 * @name recetteApp
 * @description
 * # recetteApp
 *
 * Main module of the application.
 */
angular
    .module('recetteApp', [
        "ui.router",
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: "",
                views: {
                    "header": {
                        templateUrl: 'views/header.html',
                        controller: 'headerCtrl'
                    },
                    "content": {
                        templateUrl: 'views/main.html',
                        controller: 'mainCtrl'
                    },
                    "footer": {
                        templateUrl: 'views/footer.html',
                        controller: 'footerCtrl'
                    }

                }
            })
    });