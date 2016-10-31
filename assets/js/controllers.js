Crtl = angular.module('Controllers', []);

Crtl.controller('AppController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
// SCOPE VARIABLES
	var app = this;
	$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT
	$scope.focusFocus = false;
	$scope.views = {
		HOME: 	true,
		FILTER: false,
		UPDATE: false,
		TASK: 	false,
		API: 	false
	};


// TEST AREA (HARD HAT REQUIRED)









// END OF TEST AREA




// SECTION: TODO
	app.todos = [
		{text:'Item #1', done:true},
		{text:'Item #2', done:false}
	];

	app.addTodo = function() {
		app.todos.push({text:app.todoText, done:false});
		app.todoText = '';
		$scope.focusFocus = false;
	};

	app.remaining = function() {
		var count = 0;
		angular.forEach(app.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	app.clear = function() {
		var allTodos = app.todos;
		app.todos = [];
		angular.forEach(allTodos, function(todo) {
			if (!todo.done) app.todos.push(todo);
		});
	};

// SECTION: NAV-TABS
	app.tabFunction = function(tab) {
		// PERFORMANCE TESTING
		// console.time("TAB-FUNCTION");							
		views = $scope.views;
		angular.forEach(Object.keys(views), function (page) {
			if (tab != page) {
				views[page] = false;
			} else {
				views[page] = true;
			};
		});
		$scope.views = views;
	};

// SLIDING SIDE MENU
	$scope.leftVisible = false;
	$scope.rightVisible = false;

	app.close = function() {
		$scope.leftVisible = false;
		$scope.rightVisible = false;
	};

	app.showLeft = function(e) {
		$scope.leftVisible = true;
		e.stopPropagation();
	};

	app.showRight = function(e) {
		$scope.rightVisible = true;
		e.stopPropagation();
	};

	$rootScope.$on("documentClicked", _close);
	$rootScope.$on("escapePressed", _close);

	function _close() {
		$scope.$apply(function() {
			app.close(); 
		});
	};
}]);
