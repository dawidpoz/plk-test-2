// app.controller('D3Controller', ['$scope','$interval', function($scope, $interval){
//     $scope.TempData=[
//         {
//         temperature: 0.04,
//         time: 15
//     },
//     {
//         temperature: 5,
//         time: 16
//     },
//     {
//         temperature: 0.03,
//         time: 17
//     },
//     {
//         temperature: 7,
//         time: 18
//     }
//     ];

// }]);

app.directive('linearChart', function($parse, $window){
   return{
      scope: {
        requestDataTemperatures: '='
      },
      template:"<svg width='500' height='200'></svg>",
       link: function(scope, elem, attrs){
           var exp = $parse(attrs.requestDataTemperatures);

           var TempDataToPlot=exp(scope);
           //console.log(TempDataToPlot);
           var padding = 20;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
            TempDataToPlot=newVal;
            console.log(oldVal);
            console.log(newVal);

            if(Object.keys(newVal).length !== 0){
                clearLineChart();
                drawLineChart();
            }else{
                clearLineChart();
            }
        });

           function setChartParameters(){

               xScale = d3.scale.linear()
                   .domain([TempDataToPlot[0].time, TempDataToPlot[TempDataToPlot.length-1].time])
                   .range([padding + 5, rawSvg.attr("width") - padding]);

               yScale = d3.scale.linear()
                   .domain([d3.min(TempDataToPlot, function (d) {
                    return d.temperature;
                }), d3.max(TempDataToPlot, function (d) {
                       return d.temperature;
                   })])
                   .range([rawSvg.attr("height") - padding, 0]);

               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(TempDataToPlot.length - 1);

               yAxisGen = d3.svg.axis()
                   .scale(yScale)
                   .orient("left");

               lineFun = d3.svg.line()
                   .x(function (d) {
                       return xScale(d.time);
                   })
                   .y(function (d) {
                       return yScale(d.temperature);
                   })
                   .interpolate("basis");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,180)")
                   .call(xAxisGen);

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(20,0)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(TempDataToPlot),
                       "stroke": "blue",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   });
           }

           function clearLineChart(){
                d3.selectAll("svg > *").remove();
                console.log("clear");
           }

       }
   };
});