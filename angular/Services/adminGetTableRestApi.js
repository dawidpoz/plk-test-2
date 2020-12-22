app.service('adminGetTableRestApi', ['$http', function ($http) {

    this.getData = function() {
      $http.get("http://localhost:5000/api/stations/joined").
      then(
        function successCallback(response) {
          console.log(response.data);
          return response.data;
        },
        function errorCallback(response) {
          console.log("Unable to perform get request");
        }
      );
    }
  
  }])