app.controller("adminTableController", ['$scope', 'adminGetTableRestApi', 'serviceGetListOfStations', 'adminGetTemperaturesService', function($scope, adminGetTableRestApi, serviceGetListOfStations, adminGetTemperaturesService) {
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
          $scope.requestData.sort(function(a, b){

            return a.time-b.time;
          })
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

    $scope.getStationsFiltered = function() {
      if($scope.adminPanelStationModel && $scope.adminPanelStartDateModel && $scope.adminPanelEndDateModel){
        var startDate = $scope.adminPanelStartDateModel;
        var endDate = $scope.adminPanelEndDateModel;
        var stationValue = JSON.parse(($scope.adminPanelStationModel).replaceAll("'", "\""))
        var data =
          "dateStart="
          +
          startDate.getFullYear()
            + "-"
              + (parseInt(startDate.getMonth())+1)
                + "-"
                  + startDate.getDate()
          +
          "&dateEnd="
          +
          endDate.getFullYear()
            + "-"
              + (parseInt(endDate.getMonth())+1)
                + "-"
                  + endDate.getDate()
          +
          "&stationName="
          +
          stationValue.name;
        adminGetTemperaturesService.getData(data).then(
          function(response){
            $scope.stations = response.data;
          }
        )
      }else{
        console.log("else");
      }
    }

  }]);

