app.component('home', {
        templateUrl: "Components/main-page.html"
    });

app.component('navbar', {
        templateUrl: "Components/navbar.html"
    });

app.component('admintable', {
        bindings: {
            requestData: '<',
        },
        templateUrl: "Components/admin-table.html"
    });

app.component('admintablestats', {
        bindings: {
            requestDataStats: '<',
        },
        templateUrl: "Components/admin-table-stats.html"
    });