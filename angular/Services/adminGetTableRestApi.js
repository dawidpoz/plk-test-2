app.service('adminGetTableRestApi', ['$http', function ($http) {

    this.getData = function() {
      return $http.get("http://localhost:5000/api/stations/joined");
    }

  }])