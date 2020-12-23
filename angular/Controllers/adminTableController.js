app.controller("adminTableController", ['$scope', 'adminGetTableRestApi', 'serviceGetListOfStations', function($scope, adminGetTableRestApi, serviceGetListOfStations) {
    $scope.home = "This is the homepage";
    $scope.requestData = "";
    $scope.stations = "";

    $scope.init = function(){
      this.getStations();
  } 
    
    $scope.getRequest = function() {
      adminGetTableRestApi.getData().then(
        function(response) {
          $scope.requestData = response.data;
      }
      );
      console.log("click");
      //$scope.requestData = adminGetTableRestApi.getData();
    };

    $scope.getStations = function() {
      serviceGetListOfStations.getData().then(
        function(response) {
          $scope.stations = response.data;
      }
      );
    };
  }]);