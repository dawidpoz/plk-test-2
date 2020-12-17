app.factory('serviceRestApi', ['$http', function ($http) {
    return {
        getData: function() {
          $http.get("https://randomuser.me/api/").then(
            function successCallback(response) {
              console.log(response.data);
            },
            function errorCallback(response) {
              console.log("Unable to perform get request");
            }
          );
        },
    };
}])