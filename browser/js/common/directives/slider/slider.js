app.directive('slider', function() {
  return {
    restrict: 'AE',
    templateUrl: 'js/common/directives/slider/slider.html',
    scope: {
      sliderStyle: '=',
      constraints: '='
    },
    link: function(scope, element, attrs) {
      scope.$watch('sliderStyle', function(newVal, oldValue) {
        if (newVal === 'Cummulative') scope.constraints.min = 0;
      })
    }
  }
})