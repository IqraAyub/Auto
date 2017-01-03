var myApp = angular.module('myApp', []);
//myApp.config(function ($httpProvider, $routeProvider) {
//    $routeProvider

//        .when('/', {
//            templateUrl: 'index.html',
//            controller: 'myCtrl'
//        })
//        .otherwise({
//            redirectTo: '/'
//        });
//    });

//var myApp = angular.module('myApp', []);
myApp.service('testService', function ($http) {

    var service = {
        getVehData: getVehData,
        getTripData: getTripData
    };

    return service;

    function getVehData() {
        var defer = $.Deferred();
        $http.get('/dependancy/vehicles.eea2fa51.json')
             .success(function (response) {
                 console.log(response);
                 defer.resolve(response);

             })
             .error(function (error) {
                 console.error("The async call has fail");
             });
        return defer.promise();
    }

    function getTripData() {
        var defer = $.Deferred();
        $http.get('/dependancy/trips.ea76ba5e.json')
             .success(function (response) {
                 console.log(response);
                 defer.resolve(response);

             })
             .error(function (error) {
                 console.error("The async call has fail");
             });
        return defer.promise();
    }

});


//myApp.factory('datacontext', datacontext);
//datacontext.$inject = ['$scope', '$http'];
//myApp.factory('dataFactory', ['$scope', '$http', function dataFactory($scope, $http) {
//    var service = {
//        get: get
//    };

//    var baseUrl = "https://api.automatic.com/vehicle/";
//    return service;

//    var config = {
//        headers: {
//            'Authorization': 'Bearer e39bdae812a9c2c6d8e3b37a190f9e6445e8df1a'
//        }
//    }
//    function get() {

//        $http.get(baseUrl, config).success(function (response) {
//            $scope.data = response;
//            alert("im here in datacontext");
//            console.log($scope.data);
//        });
//    }

//}]);





