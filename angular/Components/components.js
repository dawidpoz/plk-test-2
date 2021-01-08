app.component('home', {
        templateUrl: "Components/main-page.html"
    });

app.component('navbar', {
    bindings: {
        role: '<',
    },
    templateUrl: "Components/navbar.html"
    });

app.component('admintable', {
        bindings: {
            requestDataTemperatures: '<',
        },
        templateUrl: "Components/admin-table.html"
    });

app.component('admintablestats', {
        bindings: {
            requestDataStats: '<',
        },
        templateUrl: "Components/admin-table-stats.html"
    });