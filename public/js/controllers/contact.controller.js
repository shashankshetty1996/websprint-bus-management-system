angular.module("myApp").controller("contactController", contactController);

contactController.$inject = ["$scope"];
function contactController($scope) {
    $scope.msg = "contact Controller";
}
