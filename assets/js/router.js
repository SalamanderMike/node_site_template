angular.module('Router', ['ngRoute', 'ngSanitize', 'pascalprecht.translate'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                title:          '您好',
                templateUrl:    'site',
                controller:     'AppController',
                controllerAs:   'app'
            })
            .when('/test', {                                // CONTROLLER WITH LIMITED FUNCTIONALITY
                title:          '试验',
                templateUrl:    'site',
                controller:     'DateCtrl',
                controllerAs:   'app'
            })
            .otherwise({
                redirectTo: "/"
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .config(function ($translateProvider) {
        $translateProvider
        .useStaticFilesLoader({
            prefix: '/locales/',
            suffix: '.json'
        })
        .registerAvailableLanguageKeys(['enUS', 'zhCN'])
        .preferredLanguage('enUS')
        .fallbackLanguage('enUS')
        .determinePreferredLanguage()
        .useSanitizeValueStrategy('escapeParameters');
    })
    .run(['$location', '$rootScope', function ($location, $rootScope) {                 // DYNAMICALLY CHANGE <head><title>
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            if (current.hasOwnProperty('$$route')) {

                $rootScope.title = current.$$route.title;
            }
        });
    }])
    .run(function ($rootScope) {                                                        // SLIDING SIDE MENU
        document.addEventListener('keyup', function(e) {                                // LISTEN FOR CLICK TO CLOSE DRAWER
            if (e.keyCode === 27)
                $rootScope.$broadcast('escapePressed', e.target);
            });

        document.addEventListener('click', function(e) {
            $rootScope.$broadcast('documentClicked', e.target);
        });
    })
    .config([
        '$httpProvider', 
        function($httpProvider) {
            return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ]);
