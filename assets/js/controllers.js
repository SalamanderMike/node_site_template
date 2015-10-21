angular.module('Controllers', [])
	.constant('HEADER', {
        SUBTITLE: "<script> x=<%=translate('header.subTitle')%></script>"
    })
	.controller('AppController', ['$scope', 'i18ng', '$rootScope', 'HEADER', function ($scope, i18ng, $rootScope, HEADER) {
		var app = this;
		
// TRANSLATION VARIABLES
		$scope.headTitle = window.headTitle
		$scope.headSubtitle = window.headSubtitle
		$scope.headName = window.headName

		$scope.tabBind = window.tabBind
		$scope.tabFilter = window.tabFilter
		$scope.tabUpdate = window.tabUpdate
		$scope.tabTask = window.tabTask
		$scope.tabLocale = window.tabLocale

		$scope.currentLng = window.i18n.lng();						//NOT WORKING YET
		console.log(window.i18n.lng() + "Hello");

		$scope.changeLng = window.changeLng





		$scope.disable = false;										// ENABLE FUNCTIONALITY

		$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT

		$scope.languages = ['mandarin','english'];

		$scope.choice = "Default";

		$scope.greeting = 'header.name';

		// $scope.x = HEADER.SUBTITLE;


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


		app.chooseLanguage = function (lang) {

			if (lang === "mandarin") {
				console.log("MANDARIN!")
				i18n.setLng('zh-CN', { fixLng: true }, function(zhCN) { /* done */ });
			} else if (lang === "english") {
				console.log("ENGLISH!");
			} else {
				console.log("Default")
			}

		};

	}])
	.controller('DateCtrl', ['$scope', 'i18ng', '$rootScope', function ($scope, i18ng, $rootScope) {
		$scope.disable = true;											// DISABLE TODO AND DATE EDIT FUNCTIONALITY
		$scope.format = 'M/d/yyyy h:mm:ss a';							// DATE AND TIME FORMAT
		$scope.languages = ['mandarin','english'];

	}]);
