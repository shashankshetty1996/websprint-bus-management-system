angular.module("myApp").controller("aboutController", aboutController);

aboutController.$inject = ["$scope"];
function aboutController($scope) {
    $scope.msg = "about Controller";
}
