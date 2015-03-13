app.directive('categoryOptions', function(ChartFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categoryoption/categoryoption.html',
		link: function($scope, elem, attr) {
			$scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);
			$scope.radioOptions = Object.keys(ChartFactory.categoryOptions);
			$scope.selected = ChartFactory.categoryOptions;

			$scope.updateChart = function() {
				ChartFactory.updateChart();
			};
		}
	};
});