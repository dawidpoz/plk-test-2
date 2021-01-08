app.controller("loginController", ['$scope', 'globalConfigFactory', 'loginPostService', function($scope, globalConfigFactory, loginPostService) {

    $scope.postRequest = function(){
      var data = {login: $scope.loginLoginModel, password: $scope.loginPasswordModel};
      
      loginPostService.postData(JSON.stringify(data)).then(function(response, status, headers, config){
            console.log("success");
            console.log(response);
            
            if(response.data.role === "admin"){
                globalConfigFactory.setRole("admin");
                console.log(globalConfigFactory.getRole());
            }
            else{
                globalConfigFactory.setRole("user");
                console.log(globalConfigFactory.getRole());
            }
        }
        ).catch(function(data, status, headers, config){
            console.log(data);
        });
        
    };

  }]);