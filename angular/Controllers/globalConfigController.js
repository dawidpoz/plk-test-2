app.controller("globalConfigController", ['$scope', 'globalConfigFactory', function($scope, globalConfigFactory) {

    $scope.role = "";
    $scope.nick = "";
    $scope.test = "asasd";

    // function getRole(){
    //     //console.log(globalConfigFactory.getRole());
    //     return globalConfigFactory.getRole();
    // }

    $scope.$watch(function() { return globalConfigFactory.getRole(); }, function(){
        $scope.role = globalConfigFactory.getRole();
    }); 

    $scope.$watch(function() { return globalConfigFactory.getNickname(); }, function(){
        $scope.nick = globalConfigFactory.getNickname();
    }); 

    $scope.logout = function(){
        globalConfigFactory.setRole("notLogged");
        globalConfigFactory.setNickname("");
        console.log("CLICK?");
    }

  }]);