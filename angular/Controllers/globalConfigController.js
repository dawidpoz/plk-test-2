app.controller('myAppCtrl', ['$scope', 'myService', function ($scope, myService) {
    console.log(myService.isAdmin());
    $scope.admin = myService.isAdmin().toString();
}])

app.factory('myService', [ '$rootScope', function ($rootScope) {
    return {
        getData: function() {
            return $rootScope;
        },

        isAdmin: function() {
            return true;
        }
    };
}])