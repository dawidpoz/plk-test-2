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
           var xScale, yScale, xAxisGen, yAxisGen, lineFun, focus;

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

        TempDataToPlot.sort(function(a, b) { return a.time - b.time; });

        var parseDate = d3.time.format("%m/%d/%Y %H:%M:%S").parse;
        var formatDate = d3.time.format("%m/%d/%Y %H:%M:%S");

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

        function ticksSize(x){
            if(x.length > 10){
                return 10;
            }else{
                return x.length + 1;
            }
        }

           function setChartParameters(){

               xScale = d3.time.scale()
                   //.domain([new Date(TempDataToPlot[0].time).getFullYear(), new Date(TempDataToPlot[TempDataToPlot.length-1].time).getFullYear()])
                   .domain([TempDataToPlot[0].time - 3600000, TempDataToPlot[TempDataToPlot.length-1].time + 3600000])
                   .range([padding + 5, rawSvg.attr("width") - padding]);


               yScale = d3.scale.linear()
                   .domain([-60, 100])
                   .range([rawSvg.attr("height") - padding - 40, 0]);


               xAxisGen = d3.svg.axis()
                   .scale(xScale)
                   .orient("bottom")
                   .ticks(ticksSize(TempDataToPlot)).tickFormat(d3.time.format("%d/%m/%y %H:%M"));

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
                   .attr("transform", "translate(55,10)")
                   .call(yAxisGen);

               svg.append("svg:path")
                   .attr({
                       d: lineFun(TempDataToPlot),
                       "stroke": "#fc5185",
                       "stroke-width": 2,
                       "fill": "none",
                       "class": pathClass
                   }).attr("transform", "translate(0,10)");

                   focus = svg.append("g")
                   .attr("class", "focus")
                   .style("display", "none");
   
                   focus.append("circle")
                       .attr("r", 5);
   
                   focus.append("rect")
                       .attr("class", "tooltipsvg")
                       .attr("width", 100)
                       .attr("height", 50)
                       .attr("x", 10)
                       .attr("y", -22)
                       .attr("rx", 4)
                       .attr("ry", 4);
   
                   focus.append("text")
                       .attr("class", "tooltip-time")
                       .attr("x", 18)
                       .attr("y", -2);
   
                   focus.append("text")
                        .attr("class", "tooltip-text")
                       .attr("x", 18)
                       .attr("y", 18)
                       .text("Temperatura:");
   
                   focus.append("text")
                       .attr("class", "tooltip-temperature")
                       .attr("x", 110)
                       .attr("y", 18);

                       svg.append("rect")
                       .attr("class", "overlay")
                       .attr("width", 500)
                       .attr("height", 240)
                       .on("mouseover", function() { focus.style("display", null); })
                       .on("mouseout", function() { focus.style("display", "none"); })
                       .on("mousemove", mousemove);
           }

           function mousemove() {
                var x0 = xScale.invert(d3.mouse(this)[0]);
                var bisector = d3.bisector(function(d) { return d.time; }).left,
                    i = bisector(TempDataToPlot, x0.getTime(), 0),
                    d0 = TempDataToPlot[i - 1],
                    d1 = TempDataToPlot[i],
                    d;
                    //console.log(i);
                    if(i == TempDataToPlot.length){
                        d = TempDataToPlot[TempDataToPlot.length-1]

                        focus.select("rect").attr("x", -100);
                        focus.select("text").attr("x", -92);
                        focus.select(".tooltip-text").attr("x", -92);
                        focus.select(".tooltip-temperature").attr("x", 0);

                        focus.select("rect").attr("y", 12);
                        focus.select("text").attr("y", 50);
                        focus.select(".tooltip-time").attr("y", 34);
                        focus.select(".tooltip-text").attr("y", 50);
                        focus.select(".tooltip-temperature").attr("y", 50);

                        focus.attr("transform", "translate(" + xScale(d.time) + "," + parseFloat(yScale(d.temperature)+10) + ")");
                        focus.attr("style", "left:" + (xScale(d.time) + 64) + "px;top:" + parseFloat(yScale(d.temperature)+10) + "px;");
                        focus.select(".tooltip-time").text(new Date(d.time).toLocaleString());
                        focus.select(".tooltip-temperature").text(d.temperature);
                    }else if(i <= 0){
                        d = "";
                    }
                    else{
                        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                        if(xScale(d.time) <= 250){
                            focus.select("rect").attr("x", 10);
                            focus.select("text").attr("x", 18);
                            focus.select(".tooltip-text").attr("x", 18);
                            focus.select(".tooltip-temperature").attr("x", 110);

                            focus.select("rect").attr("y", -2);
                            focus.select("text").attr("y", 36);
                            focus.select(".tooltip-time").attr("y", 20);
                            focus.select(".tooltip-text").attr("y", 36);
                            focus.select(".tooltip-temperature").attr("y", 36);

                            focus.attr("transform", "translate(" + xScale(d.time) + "," + parseFloat(yScale(d.temperature)+10) + ")");
                            focus.attr("style", "left:" + (xScale(d.time) + 64) + "px;top:" + parseFloat(yScale(d.temperature)+10) + "px;");
                            focus.select(".tooltip-time").text(new Date(d.time).toLocaleString());
                            focus.select(".tooltip-temperature").text(d.temperature);
                        }else{
                            focus.select("rect").attr("x", -100);
                            focus.select("text").attr("x", -92);
                            focus.select(".tooltip-text").attr("x", -92);
                            focus.select(".tooltip-temperature").attr("x", 0);

                            focus.select("rect").attr("y", 12);
                            focus.select("text").attr("y", 50);
                            focus.select(".tooltip-time").attr("y", 34);
                            focus.select(".tooltip-text").attr("y", 50);
                            focus.select(".tooltip-temperature").attr("y", 50);

                            focus.attr("transform", "translate(" + xScale(d.time) + "," + parseFloat(yScale(d.temperature)+10) + ")");
                            focus.attr("style", "left:" + (xScale(d.time) + 64) + "px;top:" + parseFloat(yScale(d.temperature)+10) + "px;");
                            focus.select(".tooltip-time").text(new Date(d.time).toLocaleString());
                            focus.select(".tooltip-temperature").text(d.temperature);
                        }
                        
                    }
                 
            }

           function clearLineChart(){
                d3.selectAll("svg > *").remove();
                //console.log("clear");
           }

       }
   };
});