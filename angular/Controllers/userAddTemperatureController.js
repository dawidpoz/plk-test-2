app.controller("userAddTemperatureController", 
['$scope', 'listOfStationsGetService', 'userTemperaturePostService', 'formatTimeFilter', '$location', 'globalConfigFactory', 
function($scope, listOfStationsGetService, userTemperaturePostService, formatTimeFilter, $location, globalConfigFactory) {
    $scope.home = "This is the homepage";
    $scope.warningFormTemp = false;
    $scope.errorFormTemp = false;
    $scope.validatedTemp = false;

    $scope.errorMessageUserInput = "";
    $scope.successMessageUserInput = "";

    $scope.stations = "a";

    $scope.getRequestStations = function() {
        listOfStationsGetService.getData().then(
          function(response) {
            $scope.stations = response.data;
            $scope.userStationInputModel = $scope.stations[0];
            //console.log(response.data);
        }
        );
      };

    $scope.init = function(){
        if(globalConfigFactory.getRole() === "admin"){
            $location.url("/");
          }else if(globalConfigFactory.getRole() === "notLogged"){
            $location.url("/login");
          }
          else if(globalConfigFactory.getRole() === "user"){
            this.getRequestStations();
          }
    } 

    $scope.Date = function () {return new Date();}

    // TIME GENERATOR - CURRENT

    $scope.updateTime = function() {
        var time = new Date();
        return formatTimeFilter((time.getHours())%24) + ":" + formatTimeFilter((time.getMinutes())%60);
    };

    // DATE GENERATOR - CURRENT
    function updateDate(){
        var date = new Date();
        return date.getFullYear() + "-" + formatTimeFilter(date.getMonth()+1) + "-" + formatTimeFilter(date.getDate());
    }

    // TEMPERATURE VALIDATION VARIABLES
    $scope.onCheckTemperatureRange = '';
    $scope.isTempValidError = true;

    // TEMPERATURE VALIDATION METHODES
    $scope.checkTemperatureRange = function(){
        if($scope.userTemperatureInputModel === '' || $scope.userTemperatureInputModel === undefined || $scope.userTemperatureInputModel === null){
            this.errorFormTemp = true;
            this.warningFormTemp = false;
        }else{
            if($scope.userTemperatureInputModel < -50){
                $scope.onCheckTemperatureRange = -50;
                this.isTempValidError = false;
                this.warningFormTemp = true;
            }else if($scope.userTemperatureInputModel > 90){
                $scope.onCheckTemperatureRange = 90;
                $scope.userTemperatureInputModel.value = 90;
                this.isTempValidError = false;
                this.warningFormTemp = true;
            }
            else{
                this.onCheckTemperatureRange = $scope.userTemperatureInputModel;
                this.isTempValidError = true;
                this.warningFormTemp = false;
            }
            this.errorFormTemp = false;
        }
        //console.log($scope.userTemperatureInputModel);
        this.validatedTemp = true;
        //https://docs.angularjs.org/api/ng/input/input%5Bnumber%5D ????
    }

    // DATE VALIDATION VARIABLES
    $scope.onCheckDateRange = updateDate(); // "2018-07-22"


    // DATE VALIDATION METHODES
    $scope.checkDateRange = function(){
        var dateFromInput = new Date($scope.useDateInputModel);
        var today = new Date();
        var todayMinus2 = new Date(today.getFullYear(), today.getMonth(), today.getDate()-2, today.getHours(), today.getMinutes(), today.getSeconds());
        if(today - dateFromInput < 0){
            // data z przyszłości
        }else{
            if(todayMinus2 > dateFromInput){
                //data z przeszłości więcej niż 2 dni
            }
        }
    }

    $scope.formatTime = function(hours, minutes){
        return (
            formatTimeFilter(hours)
            +
            ","
            +
            formatTimeFilter(minutes)
            +
            ",00")
    }

    $scope.formatDate = function(days, months, years){
        return (
            years
            +
            ","
            +
            formatTimeFilter(months+1)
            +
            ","
            +
            formatTimeFilter(days))
    }

    $scope.parseDate = function(date, time){
        var line = date + "," + time;
        var x = line.split(",");
        // console.log(x[0], x[1], x[2], x[3], x[4], x[5]);
        // console.log(new Date(x[0], x[1], x[2], x[3], x[4], x[5]));
        // console.log((new Date(x[0], x[1], x[2], x[3], x[4], x[5]).getTime() / 1000).toFixed(0));

        return parseInt((new Date(x[0], x[1], x[2], x[3], x[4], x[5]).getTime() / 1000).toFixed(0));
    }

    // POST to REST API
    $scope.postData = function(){
        if($scope.userTimeInputModel
            && $scope.userDateInputModel
                && $scope.userTemperatureInputModel !== ''
                    && $scope.userTemperatureInputModel !== undefined
                        && $scope.userStationInputModel){
                            var currentDate = new Date().getTime();

                            var data = {temperature: "", time: "", date: "", stationId: ""};
                            var time = this.formatTime($scope.userTimeInputModel.getHours(), $scope.userTimeInputModel.getMinutes())
                            var date = this.formatDate($scope.userDateInputModel.getDate(), $scope.userDateInputModel.getMonth()-1, $scope.userDateInputModel.getFullYear());
                            data['temperature'] = parseFloat($scope.onCheckTemperatureRange);
                            data['time'] = this.parseDate(date, time);
                            data['date'] =
                                            $scope.userDateInputModel.getFullYear()
                                            +
                                            "-"
                                            +
                                            formatTimeFilter($scope.userDateInputModel.getMonth()+1)
                                            +
                                            "-"
                                            +
                                            formatTimeFilter($scope.userDateInputModel.getDate())

                            data['stationId'] = parseInt($scope.userStationInputModel);
                            //console.log($scope.userStationInputModel);

                            //console.log(data);

                            if(currentDate < data['time']){
                                $scope.errorMessageUserInput = "Data z przyszłości";
                            }else if(currentDate - date['time'] > 172800){
                                $scope.errorMessageUserInput = "Data starsza niż 2 dni";
                            }else{
                                userTemperaturePostService.postData(data).then(function(response){
                                    if(response){
                                        $scope.errorMessageUserInput = "";
                                        $scope.successMessageUserInput = "Dodano";
                                    }
                                }).catch(function(response){
                                    if(response.status == 400){
                                        if(response.data == "Data z przyszłości"){
                                            $scope.errorMessageUserInput = "Data z przyszłości";
                                        }else if(response.data == "Data starsza niż 2 dni"){
                                            $scope.errorMessageUserInput = "Data starsza niż 2 dni";
                                        }else{
                                            $scope.errorMessageUserInput = "Nieznany błąd";
                                        }
                                        $scope.successMessageUserInput = "";
                                    }
                                });
                            }
                        }else{
                            $scope.errorMessageUserInput = "Brakujące dane";
                            $scope.successMessageUserInput = "";
                        }
    }
  }]);