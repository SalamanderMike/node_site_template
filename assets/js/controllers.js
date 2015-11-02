angular.module('Controllers', [])
	.controller('AppController', ['$scope', '$rootScope', '$translate', function ($scope, $rootScope, $translate) {
		
// VARIABLES
		var app = this;
		$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT
		$scope.languages = ['中国（简体)','English'];
		$scope.disable = false;										// ENABLE FUNCTIONALITY
		$scope.focusFocus = false;
		$scope.red = "red";

// SECTION: TODO
		app.todos = [												// Array of items for our Todo List
			{text:'Item #1', done:true},
			{text:'Item #2', done:false}
		];

		app.addTodo = function() {									// Function to add to our list
			app.todos.push({text:app.todoText, done:false});
			app.todoText = '';
			$scope.focusFocus = false;
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



// CONTROLLER FROM .directives
		// var pages = $scope.pages = [];

		// $scope.select = function(page) {
		// 	console.log(page);
		// 	angular.forEach(pages, function (page) {
		// 		page.selected = false;
		// 	});
		// 	page.selected = true;
		// };

		// this.addPage = function(page) {
		// 	if (pages.length === 0) $scope.select(page);
		// 	pages.push(page);
		// };






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
		}

		$rootScope.$on("documentClicked", _close);
		$rootScope.$on("escapePressed", _close);

		function _close() {
			$scope.$apply(function() {
				app.close(); 
			});
		}

		app.navigate = function (title) {
			console.log(title);
		}

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
