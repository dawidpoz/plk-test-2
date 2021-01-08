app.service('adminCreateStationPostService', ['$http', function ($http) {

    this.postData = function(data) {
      return $http.post("https://localhost:5001/api/stations", data, {
        headers : {
            'Content-Type' : 'application/json; charset=utf-8'
        }
    });
    }

  }])