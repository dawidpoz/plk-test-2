app.controller("loginController", ['$scope', 'globalConfigFactory', 'loginPostService', '$location', function($scope, globalConfigFactory, loginPostService, $location) {

    $scope.postRequest = function(){
      var data = {login: $scope.loginLoginModel, password: $scope.loginPasswordModel};
      
      loginPostService.postData(JSON.stringify(data)).then(function(response, status, headers, config){
            console.log("success");
            console.log(response);
            
            if(response){
                globalConfigFactory.setRole(response.data.role);
                globalConfigFactory.setNickname(response.data.login)
                if(response.data.role === "admin"){
                    $location.url('/admin/panel');
                }else{
                    $location.url('/user/add');
                }
            }

        }
        ).catch(function(data, status, headers, config){
            console.log(data);
        });
        
    };

  }]);