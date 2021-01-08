app.config(function($routeProvider) {
    
    $routeProvider.when("/", {
        template: '<home></home>'
    })

    $routeProvider.when("/page", {
        templateUrl : "Components/page.html",
        controller: "globalConfigController"
    })

    $routeProvider.when("/admin", {
        templateUrl : "Components/admin.html",
        controller: "adminTableController"
    })

    $routeProvider.when("/admin/panel", {
        templateUrl : "Components/admin-panel.html",
        controller: "adminTableController"
    })

    $routeProvider.when("/user", {
        templateUrl : "Components/user.html",
        controller: "testController"
    })

    $routeProvider.when("/login", {
        templateUrl : "Components/login.html",
        controller: "loginController"
    })

    $routeProvider.when("/user/add", {
        templateUrl : "Components/user-add.html",
        controller: "userAddTemperatureController"
    })

    $routeProvider.when("/notFound", {
        templateUrl : "Components/notFound.html"
    })

    $routeProvider.otherwise({
        redirectTo: "/notFound"
    });
    
});