"use strict";

angular.module("myApp").factory("UserService", UserService);

UserService.$inject = ["$http"];

function UserService($http) {
    let service = {};
    service.getUser = getUser;
    service.getAuth = getAuth;

    return service;

    function getUser() {
        $http.get('/users/').then(successHandler, errorHandler('Error in fetching'));
    }

    function getAuth(username, password) {
        let data = {username: username, password: password};
        console.log(data);
        $http.post('/users/auth', data).then(successHandler, handleError('Error getting user by username and password'));
    }

    function successHandler(res) {
        console.log('here suce');
        return res.data;
    }

    function handleError(error) {
        return function () {
            return {
                success: false,
                message: error
            }
        }
    }
}