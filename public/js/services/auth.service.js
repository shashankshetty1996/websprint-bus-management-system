"use strict";

angular.module("myApp").factory("AuthService", AuthService);

AuthService.$inject = ["$http", "$rootScope", "UserService"];

function AuthService($http, $rootScope, UserService, $location) {
    let service = {};
    let callback;
    service.login = login;
    service.getAuth = getAuth;
    service.setAuth = setAuth;
    service.clearAuth = clearAuth;

    return service;

    function login(username, password, callback) {
        console.log('test 1');
        UserService.getAuth(username, password)
            .then((user) => {
                if(user !== null && user.username === username) {
                    response = { success : true };             
                    setAuth(user.username, user.token);
                } else {
                    response = { success: false, message: 'Username or password is incorrect' };
                }
                callback(response);
            });
    }

    function Login(username, password, callback) {
        UserService.getAuth(username, password)
            .then( function(user) {                    
                if(user !== null && user.username === username) {
                    response = { success : true };             
                    SetCredentialToken(user.username, user.token);
                } else {
                    response = { success: false, message: 'Username or password is incorrect' };
                }
                callback(response);
            });
    }

    function getAuth() {
        $http.get('/users/').then(successHandler, errorHandler('Error in fetching'));
    }

    function setAuth(username, token) {
        $rootScope.globals = {
            currentUser: {
                username: username,
                token: token
            }
        };
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        localStorage.setItem('globals', JSON.stringify($rootScope.globals));
    }

    function clearAuth() {
        $rootScope.globals.currentUser = {};
        localStorage.removeItem('globals');
    }

    function successHandler(res) {
        return res.data;
    }

    function errorHandler(error) {
        return function () {
            return {
                success: false,
                message: error
            }
        }
    }
}