app.controller("adminTableController",
              ['$scope',
              'adminTableGetService',
              'listOfStationsGetService',
              'adminGetTemperaturesService',
              'adminGetTemperaturesStatsService',
              '$location',
              'globalConfigFactory',
function(
  $scope,
  adminTableGetService,
  listOfStationsGetService,
  adminGetTemperaturesService,
  adminGetTemperaturesStatsService,
  $location,
  globalConfigFactory)

  {
    $scope.home = "This is the homepage";
    $scope.requestDataTemperatures = "";
    $scope.requestDataStats = "";
    $scope.stations = "";

    $scope.init = function(){
      if(globalConfigFactory.getRole() === "user"){
        $location.url("/");
      }else if(globalConfigFactory.getRole() === "notLogged"){
        $location.url("/login");
      }
      else if(globalConfigFactory.getRole() === "admin"){
        this.getStations();
      }
  }

    $scope.getStations = function() {
      listOfStationsGetService.getData().then(
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
          // console.log(data);
          // console.log("????????");
        adminGetTemperaturesService.getData(data).then(
          function(response){
            if(Object.keys(response.data).length === 0){
              $scope.requestDataTemperatures = "";
            }else{
              $scope.requestDataTemperatures = response.data;

              console.log(response.data);
              
              // $scope.requestDataTemperatures = 
              // response.data.forEach(function (element, index, array){element.time = element.time*1000});

              // console.log(response.data);
            }
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

      // console.log($scope.adminPanelStationModel);
      // console.log($scope.adminPanelStartDateModel);
      // console.log($scope.adminPanelEndDateModel);
    }

  }]);

