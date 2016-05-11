var myApp = angular.module("myApp", []);

myApp.controller("myController", function ($scope, $http) {
    $scope.existed = true;

    $scope.checkExist = function () {
        var httpReq = "/check/" + $scope.username + "/" + $scope.password;
        var data = {
            username: $scope.username,
            password: $scope.password
        };
        $http.get(httpReq).then(function (response) {
            $scope.message = response.data.message;
            $scope.existed = response.data.existed
        }, function (err) {
            console.log(err);
        });
    }
});
