angular.module('Router', ['ngRoute', 'i18ng', 'ngSanitize'])
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
                title:          '缺省',
                templateUrl:    'site',
                controller:     'AppController',
                controllerAs:   'app'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
    .config(['i18ngProvider', function(i18ngProvider) {

        i18ngProvider.init({
            debug: true,
            fallbackLng: 'zh-CN',
            ignoreRoutes: ['assets/', 'node_modules/', 'routes/', 'views/', 'bower_components/'],
            useCookie: false,
            detectLngFromHeaders: false,
            resGetPath: '/locales/__lng__/__ns__.json'
         })

    }])
    .config([
        "$httpProvider", 
        function($httpProvider) {
            return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        }
    ])
    .run(['$location', '$rootScope', function ($location, $rootScope) {                 // DYNAMICALLY CHANGE <head><title>
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

            if (current.hasOwnProperty('$$route')) {

                $rootScope.title = current.$$route.title;
            }
        });
    }]);
