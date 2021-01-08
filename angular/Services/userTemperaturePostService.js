app.service('userTemperaturePostService', ['$http', function ($http) {

    this.postData = function(data) {
        return $http.post("https://localhost:5001/api/stations/temp", data, {
          headers : {
              'Content-Type' : 'application/json; charset=utf-8'
          }
      });
      }
  
  }])