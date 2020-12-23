app.controller("userAddTemperatureController", ['$scope', function($scope) {
    $scope.home = "This is the homepage";
    $scope.onCheckTemperatureRange = 0;

    $scope.updateTime = function() {
        var time = new Date();
        return format_two_digits((time.getHours())%24) + ":" + format_two_digits((time.getMinutes())%60);
    };

    function format_two_digits(n) {
        return n < 10 ? '0' + n : n;
    }

    $scope.checkTemperatureRange = function(){
        if($scope.userTemperatureInputModel < -50){
            this.onCheckTemperatureRange = -50;
        }else if($scope.userTemperatureInputModel > 90){
            this.onCheckTemperatureRange = 90;
        }
        console.log($scope.userTemperatureInputModel);
        console.log($scope.onCheckTemperatureRange);

    }
  }]);