app.directive('categoryOptions', function(ChartFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/categoryoption/categoryoption.html',
		scope: {
			options: '='
		},
		link: function($scope, elem, attr) {
			$scope.catRadioOptions = Object.keys(ChartFactory.chart);
			$scope.selected = {};
			$scope.catRadioOptions.forEach(function(key) {
				$scope.selected[key] = {};
			});

			$scope.radioClick = function(option, i) {
				for (var key in $scope.selected[option]) {
					$scope.selected[option][key] = false;
				}
			};
		}
	};
});