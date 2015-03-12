app.directive('categoryOptions', function(ChartFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categoryoption/categoryoption.html',
		link: function($scope, elem, attr) {
			$scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);
			$scope.radioOptions = Object.keys(ChartFactory.chart);
			$scope.selected = ChartFactory.categoryOptions;

			$scope.updateChart = function() {
				ChartFactory.updateChart();
				// $scope.radioOptions.forEach(function(key) {
				// 	var functionName = $scope.selected[key];
				// 	if (functionName)
				// 		ChartFactory.chart[key] = ChartFactory.categoryFunctions[functionName]($scope.emails);
				// });
			};
		}
	};
});