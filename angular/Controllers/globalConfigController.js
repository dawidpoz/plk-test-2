app.controller("globalConfigController", ['$scope', 'globalConfigFactory', function($scope, globalConfigFactory) {

    $scope.role = getRole();
    $scope.test = "asasd";

    function getRole(){
        //console.log(globalConfigFactory.getRole());
        return globalConfigFactory.getRole();
    }

  }]);