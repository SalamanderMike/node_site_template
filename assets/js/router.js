var Path, Router;

Path = (function() {
    function Path(routeProvider, locationProvider) {
        this.routeProvider = routeProvider;
        this.locationProvider = locationProvider;
        this.routeProvider.when("/", {
            templateUrl: "/site",
            controller: "AppController as app"
        });
        this.locationProvider.html5Mode(true);
    }

    return Path;

})();

Router = angular.module("Router", ["ngRoute"]);

Router.config(["$routeProvider", "$locationProvider", Path]);

Router.config([
    "$httpProvider", 
    function($httpProvider) {
        return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);
