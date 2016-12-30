myApp.controller('myCtrl', ['$scope','$http', function ($scope, $http) {

    $scope.veh = { make: 'Lexus', model: 'ES 350', year: '2016', bodyType: 'Sedan', fuelType: 'Gasoline', powerTrain: 'Front wheel drive', vinId: 'JTHBK1GG9G2219733' };

    var baseUrl = "https://api.automatic.com/vehicle/";
    var config = {
        headers: {
            'Authorization': 'Bearer e39bdae812a9c2c6d8e3b37a190f9e6445e8df1a'
        }
    }
    $http.get(baseUrl, config).success(function (response) {
        var data = response;
        console.log(data);
    });
    //Vehicle Score
    var ctx = document.getElementById("scroe");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                "Best Condition",
                "White"
            ],
            datasets: [
                {
                    data: [100, 50],
                    backgroundColor: [
                        "#90EE90",
                        "#FFFAF0"
                    ],
                    hoverBackgroundColor: [
                        "#90EE90",
                        "#FFFAF0"
                    ]
                }]
        },
        options: {
            elements: {
                arc: {
                    borderColor: "#FFFAF0"
                }
            }
        }
    });
    //% Heavy Driving
    var ctx = document.getElementById("driving");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                "Heavy Drive",
                "Normal Drive"
            ],
            datasets: [
                {
                    data: [40, 60],
                    backgroundColor: [
                        "#DC143C",
                        "#90EE90"
                    ],
                    hoverBackgroundColor: [
                        "#DC143C",
                        "#90EE90"
                    ]
                }]
        },
        chart: {
            defaultCenterLabel: "Total revenue: $60K",
            centerLabel: "Revenue from"
        },
        options: {
            elements: {
                arc: {
                    borderColor: "#FFFAF0"
                }
            }
        }
    });
    //Highway VS City
    var ctx = document.getElementById("highwayVScity");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                "Highway 60%",
                "City 40%"
            ],
            datasets: [
                {
                    data: [100, 50],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB"
                    ]
                }]
        },
        options: {
            elements: {
                arc: {
                    borderColor: "#FFFAF0"
                }
            }
        }
    });
}]);