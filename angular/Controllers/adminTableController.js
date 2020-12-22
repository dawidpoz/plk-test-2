app.controller("adminTableController", ['$scope', 'adminGetTableRestApi', function($scope, adminGetTableRestApi) {
    $scope.home = "This is the homepage";
  
    $scope.getRequest = function() {
      console.log("I've been pressed!");
      adminGetTableRestApi.getData();
    };
  }]);