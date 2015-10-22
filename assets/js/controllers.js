angular.module('Controllers', [])
	.controller('AppController', ['$scope', '$rootScope', '$translate', function ($scope, $rootScope, $translate) {
		
// VARIABLES
		var app = this;
		$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT
		$scope.languages = ['中国（简体)','English'];
		$scope.disable = false;										// ENABLE FUNCTIONALITY



// SECTION: TODO
		app.todos = [												// Array of items for our Todo List
			{text:'Item #1', done:true},
			{text:'Item #2', done:false}
		];

		app.addTodo = function() {									// Function to add to our list
			app.todos.push({text:app.todoText, done:false});
			app.todoText = '';
		};

		app.remaining = function() {								// Function to find number of unchecked items
			var count = 0;
			angular.forEach(app.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		app.clear = function() {									// Function to remove done items
			var allTodos = app.todos;
			app.todos = [];
			angular.forEach(allTodos, function(todo) {
				if (!todo.done) app.todos.push(todo);
			});
		};

// SECTION: TRANSLATION
		app.chooseLanguage = function (lang) {

			if (lang === "中国（简体)") {
				$translate.use('zhCN');
			} else if (lang === "English") {
				$translate.use('enUS');
			}

		};

	}])
	.controller('DateCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
		$scope.disable = true;											// DISABLE TODO AND DATE EDIT FUNCTIONALITY
		$scope.format = 'M/d/yyyy h:mm:ss a';							// DATE AND TIME FORMAT
		$scope.languages = ['中国（简体)','English'];

	}]);
