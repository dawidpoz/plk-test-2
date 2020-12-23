app.controller("userAddTemperatureController", ['$scope', 'serviceGetListOfStations', function($scope, serviceGetListOfStations) {
    $scope.home = "This is the homepage";
    $scope.warningFormTemp = false;
    $scope.errorFormTemp = false;

    $scope.stations = "a";

    $scope.getRequest = function() {
        serviceGetListOfStations.getData().then(
          function(response) {
            $scope.stations = response.data;
            console.log(response.data);
        }
        );
      };

    $scope.init = function(){
        this.getRequest();
    } 

    // TIME GENERATOR - CURRENT

    $scope.updateTime = function() {
        var time = new Date();
        return format_two_digits((time.getHours())%24) + ":" + format_two_digits((time.getMinutes())%60);
    };

    function format_two_digits(n) {
        return n < 10 ? '0' + n : n;
    }

    // DATE GENERATOR - CURRENT
    function updateDate(){
        var date = new Date();
        return date.getFullYear() + "-" + format_two_digits(date.getMonth()+1) + "-" + format_two_digits(date.getDate());
    }

    // TEMPERATURE VALIDATION VARIABLES
    $scope.onCheckTemperatureRange = 0.0;
    $scope.isTempValidError = true;

    // TEMPERATURE VALIDATION METHODES
    $scope.checkTemperatureRange = function(){
        if($scope.userTemperatureInputModel < -50){
            this.onCheckTemperatureRange = -50;
            this.isTempValidError = false;
            this.warningFormTemp = true;
        }else if($scope.userTemperatureInputModel > 90){
            this.onCheckTemperatureRange = 90;
            $scope.userTemperatureInputModel.value = 90;
            this.isTempValidError = false;
            this.warningFormTemp = true;
        }else{
            this.onCheckTemperatureRange = $scope.userTemperatureInputModel;
            this.isTempValidError = true;
            this.warningFormTemp = false;
        }
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

  }]);