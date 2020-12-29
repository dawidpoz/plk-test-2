app.service('adminGetTemperaturesStatsService', ['$http', function ($http) {

    this.getData = function(searchString) {
        return $http.get("https://localhost:5001/api/stations/joinedinfo/"+searchString);
      }
  }])