angular.module("myApp").controller("homeController", homeController);

homeController.$inject = ["$scope"];
function homeController($scope) {
    $scope.msg = "Home Controller";
    console.log($scope.msg);
}
