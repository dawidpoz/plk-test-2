app.controller("adminTableController",
              ['$scope',
              'adminGetTableRestApi',
              'serviceGetListOfStations',
              'adminGetTemperaturesService',
              'adminGetTemperaturesStatsService',
function(
  $scope,
  adminGetTableRestApi,
  serviceGetListOfStations,
  adminGetTemperaturesService,
  adminGetTemperaturesStatsService)

  {
    $scope.home = "This is the homepage";
    $scope.requestData = "";
    $scope.requestDataStats = "";
    $scope.stations = "";

    $scope.init = function(){
      this.getStations();
  }

    $scope.getRequest = function() {
      adminGetTableRestApi.getData().then(
        function(response) {
          $scope.requestData = response.data;
          $scope.requestDataStats = "";
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

          console.log(response.data);
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
            $scope.requestData = response.data;
            console.log(response.data);
          }
        )

        adminGetTemperaturesStatsService.getData(data).then(
          function(response){
            $scope.requestDataStats = response.data;
            console.log(response.data);
          }
        )
      }else{
        console.log("else");
      }
    }

  }]);

