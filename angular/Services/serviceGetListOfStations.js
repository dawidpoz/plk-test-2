app.service('serviceGetListOfStations', ['$http', function ($http) {

    this.getData = function() {
      return $http.get("https://localhost:5001/api/stations");
    }

  }])