app.factory('globalConfigFactory', [ '$rootScope', function ($rootScope) {
    //$rootScope.role = "notLogged";
    $rootScope.role = "admin";
    $rootScope.nickname = "";
    return {
        getData: function() {
            return $rootScope;
        },

        setRole: function(data){
            $rootScope.role = data;
        },

        getRole: function() {
            return $rootScope.role;
        },

        setNickname: function(data){
            $rootScope.nickname = data;
        },

        getNickname: function() {
            return $rootScope.nickname;
        }
    };
}])