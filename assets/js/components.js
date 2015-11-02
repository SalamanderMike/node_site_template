// USE DIRECTIVES TO ATTACH SPECIFIC BEHAVIOR OR TRANSFORMATIONS TO DOM ELEMENTS
// BUILT IN (HIDDEN) DIRECTIVES INCLUDE: ngModel, ngBind,& ngClass

angular.module('Components', [])
.directive('responsive', function ($window) {									// APPLY TEMPLATE AT BREAKPOINTS FOR RESPONSIVE DESIGN
	return {																	// MAY USE THIS FOR EXTENSIVE SMALL VIEWPORT CHANGES
		replace: true,
		template: '<div ng-include="template"></div>',
		scope: {},

		link: function postLink(scope, element, attrs) {
			function checkBreaks() {
				var curBreak = $window.innerWidth,
					template = attrs.responsive,
					smBreak = parseInt(attrs.smbreak),
					mdBreak = parseInt(attrs.mdbreak);	

				if (smBreak && curBreak < smBreak) {
					curBreak = smBreak;
					template = attrs.smtemplate;
				} else if (mdBreak && curBreak < mdBreak) {	
					curBreak = mdBreak;
					template = attrs.mdtemplate
				}
				
					if (curBreak != scope.break) {									// FEED BACK TO SCOPE
						scope.break = curBreak;
						scope.template = template;
					}
				};

				checkBreaks(element[0].clientWidth);								// CHECK WINDOW SIZE

				$window.onresize = function() {										// WHEN RESIZING WINDOW,
					scope.$apply(function (){checkBreaks(element[0].clientWidth)});	// $apply TO SEND TO ANGULAR
				};
			}
	};
})

.directive('tabs', function() {													// TABS & PANELS DIRECTIVES
	return {
		restrict: 'E',															// MATCH BY ELEMENT
		transclude: true,														// LOOKS FOR SCOPE OUTSIDE OF THE DIRECTIVE (instead of inside)
		scope: {},
		controller: function($scope) {
			var pages = $scope.pages = [];

			$scope.select = function(page) {
				console.log(page);
				angular.forEach(pages, function (page) {
					page.selected = false;
				});
				page.selected = true;
			};

			this.addPage = function(page) {
				if (pages.length === 0) $scope.select(page);
				pages.push(page);
			};
		},
		templateUrl: '/partials/tabs.html',										// FIND HTML TEMPLATE IN PARTIALS
		replace: true
	};
})
.directive('page', function() {
	return {
		require: '^tabs',														// CONNECTS THIS .directive TO THE "tabs" .directive
		restrict: 'E',
		transclude: true,
		scope: { title: '@' },													// COPIES THE VALUE OF THE 'title="...' from the DOM
		link: function(scope, element, attrs, tabsController) {					// PASSES IN THE controller from the "tabs" .directive
			tabsController.addPage(scope);
		},
		template: "<div class='tab-pane' ng-class='{active: selected}' ng-transclude></div>",
		replace: true
	};
})

.directive('drawer', function() {													// SLIDING SIDE MENU DIRECTIVES
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			visible: '=',
			alignment: '@'
		},
		template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>"
	};
}) 
.directive('item', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: { title: '@' },
		link: function($scope, element, attrs, tabsController) {
			var pages = $scope.pages = [''];
			$scope.navigate = function() {
				console.log(window.location.title);
				window.location.title = $scope.title;
				console.log($scope.title);
			};
			$scope.select = function(page) {
				console.log(page);
				angular.forEach(pages, function (page) {
					page.selected = false;
				});
				page.selected = true;
			};

		},

		template: "<div ng-repeat='page in pages' ng-click='select(page)' ng-transclude>{{ page.title }}</div>"
	};
})

.directive('currentTime', ['$interval','dateFilter', function ($interval, dateFilter) {	// TIME & DATE DIRECTIVE
	function link(scope, element, attrs) {
		var format,
			tickTock;

		function updateTimeAndFormat() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.currentTime, function (value) {				// WATCH THE ATTRIBUTES ASSOCIATED WITH THE DIRECTIVE: currentTime
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
}])


.directive('autoFocus', function ($timeout) {							// AUTOFOCUS INPUT FIELD ON PAGE LOAD
    return {
        link: {
            post: function postLink(scope, element, attr) {
                $timeout(function () {
					element[0].focus();
				});
            }
        }
    }
})
.directive('focusBool', function ($timeout) { 							// INPUT FIELD FOCUS ON CLICK
    return function (scope, element, attrs) {
        scope.$watch(attrs.focusBool, function (value) {
            if (value) $timeout(function () {element[0].focus();});
        });
    }
});
