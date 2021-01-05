app.controller("loginController", ['$scope', 'globalConfigController', 'loginPostService', function($scope, globalConfigController, loginPostService) {

    $scope.postRequest = function(){
      var data = {login: $scope.loginLoginModel, password: $scope.loginPasswordModel};
      
      loginPostService.postData(JSON.stringify(data)).then(function(response, status, headers, config){
            console.log("success");
            console.log(response);
            
            if(response.data.role === "admin"){
                globalConfigController.setRole("admin");
            }
            else{
                globalConfigController.setRole("user");
            }
        }
        ).catch(function(data, status, headers, config){
            console.log(data);
        });

    };

  }]);