app.filter("formatTime", function(){
    return function(n){

      return n < 10 ? '0' + n : n;
    }
});

app.filter("formatUnixTime", function(formatTimeFilter){
  return function(x){
    var date = new Date(x*1000);
    var output = formatTimeFilter(date.getHours()) + ":" + formatTimeFilter(date.getMinutes());

    return output;
  }
});

app.filter("formatLongDate", function(){
  return function(x){

    return x.split("T")[0];
  }
})

app.filter("formatDoubleToFloat", function(){
  return function(x){

    return x.toFixed(1);
  }
})