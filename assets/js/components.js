// USE DIRECTIVES TO ATTACH SPECIFIC BEHAVIOR OR TRANSFORMATIONS TO DOM ELEMENTS
// BUILT IN (HIDDEN) DIRECTIVES INCLUDE: ngModel, ngBind,& ngClass

angular.module('Components', [])

.directive('responsive', function ($window, $timeout) {							// APPLY TEMPLATE AT BREAKPOINTS FOR RESPONSIVE DESIGN
	return {																	// MAY USE THIS FOR EXTENSIVE SMALL VIEWPORT CHANGES
		template: "<div ng-include='template' views='views' pages='pages'></div>",
		scope: { 
			views: '=',
			pages: '='
		},
		replace: true,
		controller: 'AppController',
		controllerAs: 'app',
		link: function postLink(scope, element, attrs, AppController) {
			function checkBreaks() {
				var curBreak = $window.innerWidth,
					template = attrs.responsive,
					smBreak = parseInt(attrs.smbreak),
					mdBreak = parseInt(attrs.mdbreak);	

				if (smBreak && curBreak < smBreak) {
					scope.hideForSmallView = false;
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
				scope.$apply(function(){checkBreaks(element[0].clientWidth)});	// $apply TO SEND TO ANGULAR

			};

// TEST FUNCTIONS

			// $timeout(function() {
			// 	console.log(scope.$parent.views);
			// }, 10);
			

			scope.$watch('views', function (value) {		// TEST $watch
				scope.views = value;
				scope.$apply;					
				// console.log("DIRECTIVE $WATCH TRIGGERED..." + scope.views.bind);
			}, true);

			// scope.views = {
			// 	bind: true,
			// 	filter: false,
			// 	update: false,
			// 	task: false,
			// 	locale: false
			// }
		}
	};
})

.directive('tabs', function() {													// TABS & PANELS DIRECTIVES
	return {
		templateUrl: '/partials/tabs.html',										// FIND HTML TEMPLATE IN PARTIALS
		scope: true,
		restrict: 'EA',															// MATCH BY ELEMENT
		transclude: true,														// LOOKS FOR SCOPE OUTSIDE OF THE DIRECTIVE (instead of inside)
		replace: true,
		controller: 'AppController',
		controllerAs: 'app'
	};
})
.directive('page', function() {
	return {
		require: '^tabs',														// CONNECTS THIS .directive TO THE "tabs" .directive
		template: "<div class='tab-pane' ng-class='{active: selected}' ng-transclude></div>",
		scope: { title: '@' },													// COPIES THE VALUE OF THE 'title="...' from the DOM
		restrict: 'E',
		transclude: true,
		replace: true,
		controller: 'AppController',
		controllerAs: 'app',
		link: function(scope, element, attrs, AppController) {					// PASSES IN THE controller from the "tabs" .directive
			AppController.addPage(scope);
		}
	};
})

.directive('drawer', function() {												// SLIDING SIDE MENU DIRECTIVES
	return {
		template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
		scope: {
			visible: '=',
			alignment: '@'
		},
		restrict: 'E',
		transclude: true
	};
}) 
.directive('item', function() {
	return {
		template: "<div ng-repeat='page in pages' ng-click='app.showSelect(page)' views='views' pages='pages' test='test'>{{ page.title }}</div>",
		scope: { 
			title: '@',
			views: '=',
			pages: '=',
			test: '='
		},
		restrict: 'EA',
		// transclude: true,
		controller: 'AppController',
		controllerAs: 'app',
		link: function(scope, element, attrs, AppController) {
			AppController.addPage(scope);

// TEST FUNCTIONS

			// AppController.showSelect = function(item) {
			// 	scope.$parent.test = false;

			// 	AppController.testFunction();

			// 	angular.forEach(Object.keys(scope.views), function (page) {
			// 		scope.views[page] = false;
			// 		scope.$apply;
			// 	});
			// 	scope.views[item.title] = true;
			// 	scope.$apply;


			// }
		}
	};
})

.directive('currentTime', function ($interval, dateFilter) {			// TIME & DATE DIRECTIVE
	return function (scope, element, attrs) {
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
})

.directive('autoFocus', function ($timeout) {							// AUTOFOCUS INPUT FIELD ON PAGE LOAD
    return function postLink(scope, element, attr) {
        $timeout(function() {
			element[0].focus();
		});
    }
})
.directive('focusField', function ($timeout) { 							// INPUT FIELD FOCUS ON CLICK
    return function (scope, element, attrs) {
        scope.$watch(attrs.focusField, function (value) {
            if (value) $timeout(function() {element[0].focus();} );
        });
    }
});
