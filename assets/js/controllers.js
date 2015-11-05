angular.module('Controllers', [])
	.controller('AppController', ['$scope', '$rootScope', '$translate', '$timeout', function ($scope, $rootScope, $translate, $timeout) {
		
// VARIABLES
		var app = this;
		$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT
		$scope.languages = ['中国（简体)','English'];
		$scope.disable = false;										// ENABLE FUNCTIONALITY
		$scope.focusFocus = false;
		$scope.smallView = false;
		$scope.red = "red";

// TEST AREA (HARD HAT REQUIRED)
		$scope.hideForSmallView = true;
		// $scope.showBind = true;
		// $scope.showFilter = false;
		// $scope.showUpdate = false;
		// $scope.showTask = false;
		// $scope.showLocale = false;

		// $timeout(function() {
		// 	$scope.views = {
		// 		bind: false,
		// 		filter: true,
		// 		update: false,
		// 		task: false,
		// 		locale: false
		// 	}
		// },10)


		// $scope.test = function(page) {
		// 	$scope.showBind = false;
		// 	$scope.showFilter = false;
		// 	$scope.showUpdate = false;
		// 	$scope.showTask = false;
		// 	$scope.showLocale = false;			

		// 	switch (page.title) {
		// 		case "filter":
		// 			console.log(page.title);
		// 			console.log($scope.showFilter);
		// 			$scope.showFilter = true;
		// 			console.log($scope.showFilter);
		// 			break;
		// 		case "update":
		// 			$scope.showUpdate = true;
		// 			break;
		// 		case "task":
		// 			$scope.showTask = true;
		// 			break;
		// 		case "locale":
		// 			$scope.showLocale = true;
		// 			break;
		// 		case "bind":
		// 			$scope.showBind = true;
					
		// 	}

		// 	console.log(page.title);
		// 	angular.forEach(pages, function (page) {
		// 		page.selected = false;
		// 	});
		// 	page.selected = true;
		// };

		$scope.test = true;
		$scope.testObj = {
			bind: false,
		}

		app.testFunction = function() {
			// $scope.testObj.bind = true;
			console.log($scope.test);
		}

		$scope.$watch('test', function () {		// TEST $watch
			console.log("TEST $WATCH TRIGGERED...");
			$scope.test = true;
			$scope.$apply;
		}, true);

		$scope.$watch('views', function (value) {		// TEST $watch
			// console.log("CONTROLLER $WATCH TRIGGERED..." + value.bind);
			$scope.views = value;
			// $scope.$apply;
		}, true);

// END OF TEST AREA





		$scope.views = {
			bind: false,
			filter: true,
			update: false,
			task: false,
			locale: false
		}

// CONTROLLERS FROM .directives
		var pages = $scope.pages = [];

		app.showSelect = function(item) {
			$scope.test = false;
			app.testFunction();

			angular.forEach(Object.keys($scope.views), function (page) {
				$scope.views[page] = false;
			});
			$scope.views[item.title] = true;
		}

		$scope.select = function(page) {
			angular.forEach(pages, function (page) {
				page.selected = false;
			});
			page.selected = true;
		};

		this.addPage = function(page) {
			if (pages.length === 0) $scope.select(page);
			pages.push(page);
			$scope.pages = pages;
		};



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







// SLIDING SIDE MENU
		$scope.leftVisible = false;
		$scope.rightVisible = false;

		app.close = function() {
			$scope.leftVisible = false;
			$scope.rightVisible = false;
		};

		app.showLeft = function(e) {
			$scope.smallView = true;
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
