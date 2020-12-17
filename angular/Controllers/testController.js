app.controller("testController", ['$scope', 'serviceRestApi', function($scope, serviceRestApi) {
    $scope.home = "This is the homepage";
  
    $scope.getRequest = function() {
      console.log("I've been pressed!");
      serviceRestApi.getData();
    };
  }]);