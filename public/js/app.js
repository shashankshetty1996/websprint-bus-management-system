var app = angular.module("myApp", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.ejs',
            controller: 'homeController'
        })
        .when('/login', {
            templateUrl: 'pages/login.ejs',
            controller: 'loginController'
        })
        .when('/about', {
            templateUrl: 'pages/about.ejs',
            controller: 'aboutController'
        })
        .when('/rules', {
            templateUrl: 'pages/rules.ejs',
            controller: 'rulesController'
        })
        .when('/contact', {
            templateUrl: 'pages/contact.ejs',
            controller: 'contactController'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.ejs',
            controller: 'dashboardController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.run(function ($rootScope, $location, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = JSON.parse(localStorage.getItem('globals')) || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/', '/about', '/rules', '/contact']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        
        // set default redirect to home if not logged in
        if (restrictedPage && !loggedIn) {
            $location.path('/');
        }
    });
});