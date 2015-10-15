angular.module('Router', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl:    'site',
                controller:     'AppController',
                controllerAs:   'app'
            })
            .when('/test', {
                templateUrl:    'test',
                controller:     'AppController',
                controllerAs:   'app'
            })
            .otherwise({
                templateUrl:    'site',
                controller:     'AppController',
                controllerAs:   'app'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
    .config([
    "$httpProvider", 
    function($httpProvider) {
        return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);
