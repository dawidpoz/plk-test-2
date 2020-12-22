app.controller("adminTableController", ['$scope', 'adminGetTableRestApi', function($scope, adminGetTableRestApi) {
    $scope.home = "This is the homepage";
    $scope.requestData = "";
    
    $scope.getRequest = function() {
      adminGetTableRestApi.getData().then(
        function(response) {
          $scope.requestData = response.data;
      }
      );
      //console.log(adminGetTableRestApi.getData());
      //$scope.requestData = adminGetTableRestApi.getData();
    };
  }]);