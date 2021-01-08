app.directive('linearChart', function($parse, $window){
   return{
      scope: {
        requestDataTemperatures: '<'
      },
      template:"<svg width='500' height='240'></svg>",
       link: function(scope, elem, attrs){
           var exp = $parse(attrs.requestDataTemperatures);

           var TempDataToPlot=exp(scope);
           //console.log(TempDataToPlot);
           var padding = 50;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

           scope.$watchCollection(exp, function(newVal, oldVal){
            TempDataToPlot=newVal;

            //TempDataToPlot.forEach(printElt);
            // console.log(oldVal);
            //  console.log(newVal);
            //  console.log(TempDataToPlot);

            if(Object.keys(newVal).length !== 0){
                clearLineChart();
                drawLineChart();
            }else{
                clearLineChart();
            }
        });

        var parseDate = d3.time.format("%m/%d/%Y %H:%M:%S").parse;


        function printElt(element, index, array) {
            // console.log(element.time);
            // var date = new Date(element.time);
            // element.time = parseDate(
            //     parseInt(
            //         parseInt(date.getMonth())+1) +"/"+
            //          date.getDate() +"/"+  
            //          date.getFullYear() +" "+ 
            //          date.getHours() +":"+ 
            //          date.getMinutes() +":"+ 
            //          date.getSeconds()
            //     );
            // element.temperature = +element.temperature;
            // console.log(element.time);
            element.time = element.time * 1000;
        }

           function setChartParameters(){

               xScale = d3.time.scale()
                   //.domain([new Date(TempDataToPlot[0].time).getFullYear(), new Date(TempDataToPlot[TempDataToPlot.length-1].time).getFullYear()])
                   .domain([TempDataToPlot[0].time, TempDataToPlot[TempDataToPlot.length-1].time])
                   .range([padding + 5, rawSvg.attr("width") - padding]);


               yScale = d3.scale.linear()
                   .domain([-60, 100])
                   .range([rawSvg.attr("height") - padding - 40, 0]);


               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(TempDataToPlot.length - 1).tickFormat(d3.time.format("%d/%m/%y %H:%M"));

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
                   .interpolate("linear");
           }
         
         function drawLineChart() {

               setChartParameters();

               svg.append("svg:g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(0,160)")
                   .call(xAxisGen)
                   .selectAll("text")
                   .attr("transform", "rotate(50)")
                   .style("text-anchor", "start");

               svg.append("svg:g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(50,10)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(TempDataToPlot),
                       "stroke": "#fc5185",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   }).attr("transform", "translate(0,10)");
           }

           function clearLineChart(){
                d3.selectAll("svg > *").remove();
                //console.log("clear");
           }

       }
   };
});