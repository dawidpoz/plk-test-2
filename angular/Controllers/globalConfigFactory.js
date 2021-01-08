app.factory('globalConfigFactory', [ '$rootScope', function ($rootScope) {
    $rootScope.role = "a";
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