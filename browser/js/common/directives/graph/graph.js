'use strict';

app.directive('graph', function(){
  function link(scope, element, attrs) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = 480 - margin.left - margin.right;
    var height = 250 - margin.top - margin.bottom;


    var data = scope.data;  
    var el = element[0];
   
    var xRange = d3.scale().linear().range([0, width]).domain([
                    d3.min(data, function(d) {
                      return d.x;
                    }),
                    d3.max(data, function(d) {
                      return d.y;
                    }) 
                  ]);
    var yRange = d3.scale.linear().range([height, 0]).domain([
                  d3.min(data, function (d) { 
                    return d.y; 
                  }),
                  d3.max(data, function (d) { 
                    return d.y; 
                  })
                ]);

    var xAxis = d3.svg.axis().scale(xRange).orient("bottom");
    var yAxis = d3.svg.axis().scale(yRange).orient("left");
    

    var vis = d3.select(el)
      .append('svg').attr('width', width).attr('height', height)
      .append('svg:g').call(xAxis)
      .append('svg:g').call(yAxis);

    var circles = vis.selectAll('circle').data(data);
    
    circles
    .enter()
    .insert('circle')
    .attr('cx', function (d) { return xRange(d); })
    .attr('cy', function (d) { return yRange(d); })
    .attr('r', 10)
    .style('fill', 'red');
  }

  return {
    restrict: 'AE',
    scope: {
      data: '=' 
    },
    link: link
  };
});