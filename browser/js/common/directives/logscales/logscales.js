app.directive('logScales', function(LogFactory, ChartFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/logscales/logscales.html',
    scope: {},
    link: function($scope, elem, attr) {
      $scope.logStates = LogFactory.logStates;

      $scope.updateScales = function() {
        ChartFactory.updateChart();
      };
    }
  };
});