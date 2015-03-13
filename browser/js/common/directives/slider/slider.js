app.directive('slider', function(TimeFactory, FilterFactory) {
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
        FilterFactory.data.chartEmails.forEach(function(email) {
          if (email.payload.headers[1] && email.payload.headers[1].name === 'Received') {
            var val = email.payload.headers[1].value;
            var date = Date.parse(val.split(';')[1].trim());
            if (date < min) min = date;
          }

          scope.constraints = {
            min: min,
            max: max,
            modelMin: min,
            modelMax: max
          };

          TimeFactory.storeConstraints(min, max);
        })
      }
      
      scope.$watchCollection('constraints', function(newVal, oldVal) {  
        console.log(newVal, oldVal)
        if(newVal) { 
          var min = newVal.modelMin, max = newVal.modelMax;    

          
          TimeFactory.storeConstraints(min, max);
          TimeFactory.filterEmails();
          
        }
      })


      


      scope.$watch('sliderStyle', function(newVal, oldValue) {

        if (newVal === 'Cummulative') {
          if (scope.constraints) scope.constraints.modelMin = min;
        }

        getMinMax();

      })
    }
  }
})