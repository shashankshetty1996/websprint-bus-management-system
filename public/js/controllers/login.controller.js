angular.module("myApp").controller("loginController", loginController);

loginController.$inject = ["$scope", "$location", "AuthService"];
function loginController($scope, $location, AuthService) {
    $scope.errorMsg = "invalid user";
    $scope.errorStatus = false;
    AuthService.clearAuth();

    $scope.login = function() {
        let username = $scope.username;
        let password = $scope.password;
        
        AuthService.login(username, password, function(response) {
            alert(username);
            if(response.success) {
                $location.path('/dashboard');
            } else {
                $scope.errorStatus = true;
            }
        });
    }

    $scope.errorStatusReset = function() {
        $scope.errorStatus = !$scope.errorStatus;
    }
}
