angular.module("myApp").controller("rulesController", rulesController);

rulesController.$inject = ["$scope"];
function rulesController($scope) {
    $scope.msg = "Rule and Regulations to be followed";
}
