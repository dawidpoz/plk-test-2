var app = angular.module("projekt2", ["ngRoute"]);

app.config(function($routeProvider) {
    
    $routeProvider.when("/", {
        template: '<home></home>'
    })

    $routeProvider.when("/page", {
        templateUrl : "Components/page.html"
    })

    $routeProvider.when("/admin", {
        templateUrl : "Components/admin.html"
    })

    $routeProvider.when("/admin/panel", {
        templateUrl : "Components/admin-panel.html"
    })

    $routeProvider.when("/user", {
        templateUrl : "Components/user.html"
    })

    $routeProvider.when("/user/add", {
        templateUrl : "Components/user-add.html"
    })

    $routeProvider.when("/notFound", {
        templateUrl : "Components/notFound.html"
    })

    $routeProvider.otherwise({
        redirectTo: "/notFound"
    });
    
});

app.component('home', {
        templateUrl: "Components/main-page.html"
    });

app.component('navbar', {
        templateUrl: "Components/navbar.html"
    });

app.component('admin-table', {
        templateUrl: "Components/admin-table.html"
    });