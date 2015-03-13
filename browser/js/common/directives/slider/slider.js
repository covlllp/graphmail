app.directive('slider', function(TimeFactory, FilterFactory, TypeFactory, ChartFactory) {
  return {
    restrict: 'AE',
    templateUrl: 'js/common/directives/slider/slider.html',
    scope: {
      sliderStyle: '='
    },
    link: function(scope, element, attrs) {
      scope.constraints = TimeFactory.constraints;
      
      scope.$watchCollection('constraints', function(newVal, oldVal) {  
        if(newVal) {
          TimeFactory.storeConstraints(newVal.min, newVal.max);
          TimeFactory.filterEmails();
          TypeFactory.splitEmails();
          ChartFactory.updateChart();
        }
      });

      scope.$watch('sliderStyle', function(newVal, oldValue) {
        if (newVal === 'Cummulative') {
          if (scope.constraints) scope.constraints.min = scope.constraints.allmin;
        }
        TimeFactory.resetMinMax();
      });
    }
  };
});