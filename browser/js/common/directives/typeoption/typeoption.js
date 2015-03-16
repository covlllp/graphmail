app.directive('typeOptions', function(ChartFactory, TypeFactory) {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/typeoption/typeoption.html',
		link: function($scope, elem, attr) {
			$scope.typeOptions = Object.keys(TypeFactory.typeFunctions);
      $scope.selectedType = TypeFactory.selectedType;
      $scope.typeFunctions = TypeFactory.typeFunctions;

      $scope.splitEmails = function() {
        TypeFactory.splitEmails();
        ChartFactory.updateChart();
      };
		}
	};
});