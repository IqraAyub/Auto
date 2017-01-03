//var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', ['$scope', '$http','testService', function ($scope, $http, testService) {

    $scope.veh = { make: 'Lexus', model: 'ES 350', year: '2016', bodyType: 'Sedan', fuelType: 'Gasoline', powerTrain: 'Front wheel drive', vinId: 'JTHBK1GG9G2219733', prodNum: '219733' };
    $scope.vehAna = { hard_brakes: '', hard_accels: '', overSpeed: '' };
    var totalDistance = 0;
    var totalFuel = 0;
    var harshBrake = 0;
    var harshAccel = 0;
    var OverSpeed = 0;
    var cityFraction = 0;
    var highwayFraction = 0;
    var avgKMPL = 0;
    Init();
    InitTrip();
    

   // var io = require('socket.io-client')
   // var socket = io();
    //var socket = io('https://stream.automatic.com?token=55a66dd9775239162e5f:03a7ec9219b92eb4edf6eb23adae86894a04ee80')

    //socket.on('connect', function () {
    //    console.log(socket.id); // 'G5p5...'
    //});
    //// Listen for `trip:finished` event
    //socket.on('trip:finished', function (eventJSON) {
    //    console.log('Trip Finished', eventJSON);
    //});

    //// Listen for `ignition:on` event
    //socket.on('ignition:on', function (eventJSON) {
    //    console.log('Ignition On', eventJSON);
    //});

    //// Handle `error` messages
    //socket.on('error', function (errorMessage) {
    //    console.log('Error', errorMessage);
    //});



    function Init() {
        $scope.data = {};
        testService.getVehData().then(function (result) {
            var data = result.results;
            console.log("Vehicle Data" + data);
            for (var i = 0; i < data.length; i++) {
                $scope.project = data[i];
                if ($scope.project.id == "C_7a4dec8e226393d2") {
                    $scope.veh.make = $scope.project.make;
                    $scope.veh.model = $scope.project.model;
                    $scope.veh.year = $scope.project.year;
                    $scope.veh.bodyType = 'Sedan';
                    $scope.veh.fuelType = 'Gasoline';
                    $scope.veh.powerTrain = 'Front wheel drive';
                    $scope.veh.vinId = $scope.project.id;
                    $scope.veh.prodNum = $scope.veh.vinId.slice(-6);
                }
                    
            }
            return $scope.project;
        })
    }
    

    var sumDrive = 0;

    function InitTrip() {
        $scope.data = {};
        testService.getTripData().then(function (result) {
            var data = result.results;
            console.log("Trip Data" + data);
            for (var i = 0; i < data.length; i++) {
                $scope.trip = data[i];
                if ($scope.trip.vehicle == "https://api.automatic.com/vehicle/C_7a4dec8e226393d2/") {
                    sumDrive += $scope.trip.distance_m;
                    totalDistance = sumDrive / data.length;
                    totalFuel += $scope.trip.fuel_volume_l;
                    harshBrake += $scope.trip.hard_brakes;
                    harshAccel += $scope.trip.hard_accels;
                    OverSpeed += $scope.trip.duration_over_70_s;

                    cityFraction += $scope.trip.city_fraction;
                    highwayFraction += $scope.trip.highway_fraction;
                    avgKMPL += $scope.trip.average_kmpl;
                }

            }

            $scope.vehAna.hard_accels = harshAccel;
            $scope.vehAna.hard_brakes = harshBrake;
            $scope.vehAna.overSpeed = OverSpeed;

            heavyDerive(totalDistance);
            drawAvgFuelEconomy(avgKMPL);
            drawhighwayCity(cityFraction, highwayFraction);
            return cityFraction, highwayFraction, avgKMPL;

        })
    };

 





    var baseUrl = "https://api.automatic.com/vehicle/";
   // var baseUrl = "https://dashboard.automatic.com/data/vehicles.eea2fa51.json";
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
    function heavyDerive(totalDistance) {
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
                        data: [totalDistance, 1000],
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
    }
    //Highway VS City
    function drawhighwayCity(cityFraction, highwayFraction) {
        var ctx = document.getElementById("highwayVScity");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    "Highway",
                    "City"
                ],
                datasets: [
                    {
                        data: [highwayFraction+1, cityFraction+2],
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
    }

    //Average Fuel Economy
    function drawAvgFuelEconomy(avgKMPL) {
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
                        data: [avgKMPL, 10],
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
    }
   

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