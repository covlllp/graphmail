app.directive('categoryOptions', function(ChartFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categoryoption/categoryoption.html',
		link: function($scope, elem, attr) {
			$scope.categoryOptions = Object.keys(ChartFactory.categoryFunctions);
			$scope.radioOptions = Object.keys(ChartFactory.chart);
			$scope.selected = $scope.radioOptions.reduce(function(prev, cur) {
				prev[cur] = null;
				return prev;
			}, {});

			$scope.updateChart = function() {
				console.log($scope.selected);
				$scope.radioOptions.forEach(function(key) {
					var functionName = $scope.selected[key];
					if (functionName)
						ChartFactory.chart[key] = ChartFactory.categoryFunctions[functionName]($scope.emails);
				});
			};
		}
	};
});