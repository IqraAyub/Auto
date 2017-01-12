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
myApp.service('automaticService', function ($http) {

    var service = {
        getVehicle: getVehicle,
        getTrips: getTrips,
        getTripOfThisRange: getTripOfThisRange,
        getVehData: getVehData,
        getTripData: getTripData,
        getMILData: getMILData
    };

    return service;

    function getVehicle() {
        var baseUrl = "https://api.automatic.com/vehicle/";

        var config = {
            headers: {
                'Authorization': 'Bearer ea30bd82abe0e5b0f373741aeede98a3ac946564'
            }
        }
            var defer = $.Deferred();
            $http.get(baseUrl, config).success(function (response) {
                console.log(response);
                defer.resolve(response);
            }).error(function (error) {
                console.error("The async call has failed");
            });
            return defer.promise();
        }

    function getTrips() {
        var baseUrl = "https://api.automatic.com/trip/?started_at__gte=1363071600&started_at__lte=1481396400&limit=250";

        var config = {
            headers: {
                'Authorization': 'Bearer ea30bd82abe0e5b0f373741aeede98a3ac946564'
            }
        }
        var defer = $.Deferred();
        $http.get(baseUrl, config).success(function (response) {
            defer.resolve(response);
        }).error(function (error) {
            console.error("The async call has failed");
        });
        return defer.promise();
    }

    function getTripOfThisRange(firstDate, secondDate) {

        var Url = "https://api.automatic.com/trip/";
        var baseUrl = Url + "?started_at__gte=" + firstDate + "&started_at__lte=" + secondDate + "&limit=" + 250;

        var config = {
            headers: {
                'Authorization': 'Bearer ea30bd82abe0e5b0f373741aeede98a3ac946564'
            }
        }
        var defer = $.Deferred();
        $http.get(baseUrl, config).success(function (response) {
            defer.resolve(response);
        }).error(function (error) {
            console.error("The async call has failed");
        });
        return defer.promise();
    }

    function getVehData() {
        var defer = $.Deferred();
        $http.get('/dependancy/vehicles.eea2fa51.json')
             .success(function (response) {
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

    function getMILData() {
        var defer = $.Deferred();
        $http.get('/dependancy/vehicle-mil.json')
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



myApp.service('testService', function ($http) {

    var service = {
        getVehData: getVehData,
        getTripData: getTripData,
        getMILData: getMILData
    };

    return service;

    function getVehData() {
        var defer = $.Deferred();
        $http.get('/dependancy/vehicles.eea2fa51.json')
             .success(function (response) {
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

    function getMILData() {
        var defer = $.Deferred();
        $http.get('/dependancy/vehicle-mil.json')
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




