app.service('logoutPostService', ['$http', function ($http) {

    this.postData = function() {
      return $http.post("https://localhost:5001/api/stations/logout", data, {
        headers : {
            'Content-Type' : 'application/json; charset=utf-8'
        }
    });
    }

  }])