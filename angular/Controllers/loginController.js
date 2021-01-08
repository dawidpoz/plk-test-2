app.controller("loginController", ['$scope', 'globalConfigFactory', 'loginPostService', '$location', function($scope, globalConfigFactory, loginPostService, $location) {

    $scope.errorMsg = "";

    $scope.postRequest = function(){
        if(!$scope.loginLoginModel && !$scope.loginPasswordModel){
            $scope.errorMsg = "Podaj login i hasło";
        }else if(!$scope.loginLoginModel && $scope.loginPasswordModel){
            $scope.errorMsg = "Podaj login";
        }else if($scope.loginLoginModel && !$scope.loginPasswordModel){
            $scope.errorMsg = "Podaj hasło";
        }
        if($scope.loginLoginModel && $scope.loginPasswordModel){
        var data = {login: $scope.loginLoginModel, password: $scope.loginPasswordModel};
        
        loginPostService.postData(JSON.stringify(data)).then(function(response, status, headers, config){
                console.log("success");
                //console.log(response);
                
                if(response){
                    $scope.errorMsg = "";
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
                $scope.errorMsg = "Logowanie nie powiodło się";
            });
            
        }   
    };

  }]);