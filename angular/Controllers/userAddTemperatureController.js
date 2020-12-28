app.controller("userAddTemperatureController", ['$scope', 'serviceGetListOfStations', 'userPostTemperature', 'formatTimeFilter', function($scope, serviceGetListOfStations, userPostTemperature, formatTimeFilter) {
    $scope.home = "This is the homepage";
    $scope.warningFormTemp = false;
    $scope.errorFormTemp = false;
    $scope.validatedTemp = false;

    $scope.stations = "a";

    $scope.getRequestStations = function() {
        serviceGetListOfStations.getData().then(
          function(response) {
            $scope.stations = response.data;
            $scope.userStationInputModel = $scope.stations[0];
            console.log(response.data);
        }
        );
      };

    $scope.init = function(){
        this.getRequestStations();
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
                this.onCheckTemperatureRange = -50;
                this.isTempValidError = false;
                this.warningFormTemp = true;
            }else if($scope.userTemperatureInputModel > 90){
                this.onCheckTemperatureRange = 90;
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
        console.log($scope.userTemperatureInputModel);
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
        var data = {temperature: "", time: "", date: "", stationId: ""};
        var time = this.formatTime($scope.userTimeInputModel.getHours(), $scope.userTimeInputModel.getMinutes())
        var date = this.formatDate($scope.userDateInputModel.getDate(), $scope.userDateInputModel.getMonth()-1, $scope.userDateInputModel.getFullYear());
        data['temperature'] = parseFloat($scope.userTemperatureInputModel);
        data['time'] = this.parseDate(date, time);
        data['date'] = "2020-05-01T00:00:00"; // to chyba wywalę z backu
        data['stationId'] = parseInt($scope.userStationInputModel);
        console.log($scope.userStationInputModel);

        console.log(data);

        userPostTemperature.postData(data);
    }

  }]);