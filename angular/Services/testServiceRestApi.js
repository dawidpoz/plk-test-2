app.service('serviceRestApi', ['$http', function ($http) {

  this.getData = function() {
    $http.get("https://randomuser.me/api/").
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