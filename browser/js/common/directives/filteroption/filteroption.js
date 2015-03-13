app.directive('filterOptions', function(ChartFactory, FilterFactory, TypeFactory, TimeFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/filteroption/filteroption.html',
		link: function($scope, elem, attr) {
			$scope.options = Object.keys(FilterFactory.filterFunctions);
			$scope.selectedFilters = $scope.options.reduce(function(prev, cur) {
				prev[cur] = false;
				return prev;
			}, {});

			$scope.filterEmails = function() {
				FilterFactory.filterEmails($scope.selectedFilters);
				TimeFactory.filterEmails();
				TypeFactory.splitEmails();
				ChartFactory.updateChart();
			};
		}
	};
});