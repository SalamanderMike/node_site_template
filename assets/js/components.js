// USE DIRECTIVES TO ATTACH SPECIFIC BEHAVIOR OR TRANSFORMATIONS TO DOM ELEMENTS
// BUILT IN (HIDDEN) DIRECTIVES INCLUDE: ngModel, ngBind,& ngClass

angular.module('Components', [])
	.directive('tabs', function() {
		return {
			restrict: 'E',															// MATCH BY ELEMENT
			transclude: true,														// LOOKS FOR SCOPE OUTSIDE OF THE DIRECTIVE (instead of inside)
			scope: {},
			controller: function($scope, $element) {
				var panes = $scope.panes = [];

				$scope.select = function(pane) {
					angular.forEach(panes, function(pane) {
						pane.selected = false;
					});
					pane.selected = true;
				};

				this.addPane = function(pane) {
					if (panes.length === 0) $scope.select(pane);
					panes.push(pane);
				};
			},
			templateUrl: '/partials/tabs.html',										// FIND HTML TEMPLATE IN PARTIALS
			replace: true
		};
	})

	.directive('pane', function() {
		return {
			require: '^tabs',														// CONNECTS THIS .directive TO THE "tabs" .directive
			restrict: 'E',
			transclude: true,
			scope: { title: '@' },													// COPIES THE VALUE OF THE 'title="...' from the DOM
			link: function(scope, element, attrs, tabsController) {					// PASSES IN THE controller from the "tabs" .directive
				tabsController.addPane(scope);
			},
			templateUrl: '/partials/panes.html',
			replace: true
		};
	})

	.directive('currentTime', ['$interval','dateFilter', function($interval, dateFilter) {
		function link(scope, element, attrs) {
			var format,
				tickTock;

			function updateTimeAndFormat() {
				element.text(dateFilter(new Date(), format));
			}

			scope.$watch(attrs.currentTime, function(value) {				// WATCH THE ATTRIBUTES ASSOCIATED WITH THE DIRECTIVE: currentTime
				format = value;												// AND CHANGE THE VALUE OF THE FORMAT IF THERE IS A CHANGE
				updateTimeAndFormat();										// THEN CALL THE updateTimeAndFormat() FUNCTION
			});

			element.on('$destroy', function() {								// !!!PREVENT MEMORY LEAKS BY LISTENING FOR $destroy
				$interval.cancel(tickTock);
			});

			tickTock = $interval(function() {								// SET INTERVAL EVERY 1 SECOND TO CALL THE updateTimeAndFormat FUNCTION
				updateTimeAndFormat();
			}, 1000);
		}

		return {
			link: link 
		};
	}]);
