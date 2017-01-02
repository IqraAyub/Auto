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
        title: 'text title',
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
                },
                center: {
                    maxText: '100%',
                    text: "great",
                    fontColor: '#FF6684',
                    fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                    fontStyle: 'normal',
                    minFontSize: 1,
                    maxFontSize: 256,
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
                        "#DC143C",
                        "#36A2EB"
                    ],
                    hoverBackgroundColor: [
                        "#DC143C",
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

    //Average Fuel Economy
    var ctx = document.getElementById("economy");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                "Best Condition",
                "White"
            ],
            datasets: [
                {
                    data: [75, 25],
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

    //Coolnut Temprature
    var ctx = document.getElementById("coolnutTemp");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                //"Green",
                //"White"
            ],
            datasets: [
                {
                    data: [25, 75],
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
    //Check Engine Light
    var ctx = document.getElementById("checkEngLight");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                //"Green",
                //"White"
            ],
            datasets: [
                {
                    data: [50, 75],
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
    //Off Road Driving
    var ctx = document.getElementById("offRoadDrive");
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                //"Green",
                //"White"
            ],
            datasets: [
                {
                    data: [50, 120],
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
    
}]);