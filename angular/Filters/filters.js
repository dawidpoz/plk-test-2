app.filter("formatTime", function(){
    return function(n){

      return n < 10 ? '0' + n : n;
    }
});

app.filter("formatUnixTime", function(formatTimeFilter){
  return function(x){
    var date = new Date(x);
    var output = formatTimeFilter(date.getHours()) + ":" + formatTimeFilter(date.getMinutes());

    return output;
  }
});

app.filter("formatLongDate", function(){
  return function(x){
    var array = (x.split("T")[0]).split("-");
    return array[2] + "/" + array[1] + "/" + array[0];
  }
})

app.filter("formatDoubleToFloat", function(){
  return function(x){

    return x.toFixed(2);
  }
})