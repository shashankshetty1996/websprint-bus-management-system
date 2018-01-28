angular.module("myApp").controller("dashboardController", dashboardController);

dashboardController.$inject = ["$scope"];
function dashboardController($scope) {
    $scope.msg = "dashboard Controller";
}
