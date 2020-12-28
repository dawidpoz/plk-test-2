app.controller("testController", ['$scope', 'serviceRestApi', 'adminPostCreateStation', function($scope, serviceRestApi, adminPostCreateStation) {
    $scope.home = "This is the homepage";
  
    $scope.getRequest = function() {
      console.log("I've been pressed!");
      serviceRestApi.getData();
    };

    $scope.postRequest = function(){
      var tmp = {name: "123", city: "321"};
      adminPostCreateStation.postData(JSON.stringify(tmp)).then(function(){
        console.log("then");
      }).catch(function(){
        console.log("catch");
        console.log(tmp);
        console.log(JSON.stringify(tmp));
      });
    };
  }]);