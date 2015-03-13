app.directive('slider', function(FilterFactory, filterTime) {
  return {
    restrict: 'AE',
    templateUrl: 'js/common/directives/slider/slider.html',
    scope: {
      sliderStyle: '='
    },
    link: function(scope, element, attrs) {

      var min, max;
      min = max = Date.now();
     
      function getMinMax(){
        FilterFactory.data.emails.forEach(function(email) {
          if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
            var val = email.payload.headers[1].value;
            var date = Date.parse(val.split(';')[1].trim());
            console.log('date', date)
            if (date < min) min = date;
            //if (date > max) max = date;
          }

          scope.constraints = {
            min: min,
            max: max,
            modelMin: min,
            modelMax: max

          };
        })
      }
      


      


      scope.$watch('sliderStyle', function(newVal, oldValue) {

        if (newVal === 'Cummulative') {
          if (scope.constraints) scope.constraints.modelMin = min;
        }

        getMinMax();

      })
    }
  }
})