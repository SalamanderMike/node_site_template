// var Path, Router;


// Path = (function() {
//     function Path(routeProvider, locationProvider) {
//         this.routeProvider = routeProvider;
//         this.locationProvider = locationProvider;
//         this.routeProvider.when("/site", {
//             templateUrl: "/site.ejs",
//             controller: "AppController as app"
//         });
//         this.locationProvider.html5Mode(true);
//     }

//     return Path;

// })();

// Router = angular.module("Router", ["ngRoute"]);

// Router.config(["$routeProvider", "$locationProvider", Path]);

// Router.config([
//     "$httpProvider", 
//     function($httpProvider) {
//         return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
//     }
// ]);



var Router = angular.module('Router', ['ngRoute']).
    config(['$routeProvider', '$locationProvider', function($routeProvider,$locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'site.ejs',
            controller: 'AppController'
        }).
        otherwise({
            templateUrl: 'test.ejs'
        });
        $locationProvider.html5Mode(true);
    }]);
