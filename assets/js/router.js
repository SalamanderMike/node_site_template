Router = angular.module('Router', ['ngRoute', 'ngSanitize']);

Router.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title:          'TestSite',
			templateUrl:    'site',
			controller:     'AppController',
			controllerAs:   'app'
		})
		.otherwise({
			redirectTo: "/"
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

Router.run(function ($location, $rootScope) {										// DYNAMICALLY CHANGE <head><title>
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		if (current.hasOwnProperty('$$route')) {
			$rootScope.title = current.$$route.title;
		}
	});
});

Router.run(function ($rootScope) {													// SLIDING SIDE MENU
	document.addEventListener('keyup', function (e) {								// LISTEN FOR CLICK TO CLOSE DRAWER
		if (e.keyCode === 27) $rootScope.$broadcast('escapePressed', e.target);
	});
	document.addEventListener('click', function (e) {
		$rootScope.$broadcast('documentClicked', e.target);
	});
});

Router.config(function ($httpProvider) {
		return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	}
);
