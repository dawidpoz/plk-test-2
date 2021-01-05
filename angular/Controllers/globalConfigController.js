app.factory('globalConfigController', [ '$rootScope', function ($rootScope) {
    $rootScope.role = "";
    return {
        getData: function() {
            return $rootScope;
        },

        setRole: function(data){
            $rootScope.role = data;
        },

        getRole: function() {
            return $rootScope.role;
        }
    };
}])