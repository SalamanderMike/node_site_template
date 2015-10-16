angular.module('Controllers', [])
	.controller('AppController', function($scope) {
		var app = this;


// SECTION: TODO
		app.todos = [													// Array of items for our Todo List
			{text:'Item #1', done:true},
			{text:'Item #2', done:false}];

		app.addTodo = function() {										// Function to add to our list
			app.todos.push({text:app.todoText, done:false});
			app.todoText = '';
		};

		app.remaining = function() {									// Function to find number of unchecked items
			var count = 0;
			angular.forEach(app.todos, function(todo) {
				count += todo.done ? 0 : 1;
			});
			return count;
		};

		app.clear = function() {										// Function to remove done items
			var allTodos = app.todos;
			app.todos = [];
			angular.forEach(allTodos, function(todo) {
				if (!todo.done) app.todos.push(todo);
			});
		};

	})
	.controller('DateCtrl', function($scope) {
		$scope.format = 'M/d/yyyy h:mm:ss a';							// DATE AND TIME FORMAT
	});