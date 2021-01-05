app.service('loginPostService', ['$http', function ($http) {

    this.postData = function(data) {
      return $http.post("https://localhost:5001/api/stations/login", data, {
        headers : {
            'Content-Type' : 'application/json; charset=utf-8'
        }
    });
    }

  }])