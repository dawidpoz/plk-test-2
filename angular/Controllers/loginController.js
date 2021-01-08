app.controller("loginController", ['$scope', 'globalConfigFactory', 'loginPostService', function($scope, globalConfigFactory, loginPostService) {

    $scope.postRequest = function(){
      var data = {login: $scope.loginLoginModel, password: $scope.loginPasswordModel};
      
      loginPostService.postData(JSON.stringify(data)).then(function(response, status, headers, config){
            console.log("success");
            console.log(response);
            
            if(response){
                globalConfigFactory.setRole(response.data.role);
                globalConfigFactory.setNickname(response.data.login)
                //console.log(globalConfigFactory.getRole());
            }

        }
        ).catch(function(data, status, headers, config){
            console.log(data);
        });
        
    };

  }]);