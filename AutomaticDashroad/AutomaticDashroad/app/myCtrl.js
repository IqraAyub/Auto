//var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', ['$scope', '$http', 'automaticService', function ($scope, $http, automaticService) {

    $scope.veh = { make: 'Lexus', model: 'ES 350', year: '2016', bodyType: 'Sedan', fuelType: 'Gasoline', powerTrain: 'Front wheel drive', vinId: 'jtmzf33v895004330', prodNum: '004330', distanceKM:'' };
    $scope.vehAna = { hard_brakes: '', hard_accels: '', overSpeed: '' };
    var totalDistance = 0;
    var totalFuelInLiters = 0;
    var harshBrake = 0;
    var harshAccel = 0;
    var OverSpeed = 0;
    var cityFraction = 0;
    var highwayFraction = 0;
    var avgMPG = 0;
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
        automaticService.getVehData().then(function (result) {
            var data = result.results;
            console.log("Vehicle Data" + data);
            for (var i = 0; i < data.length; i++) {
                $scope.vehicleDetail = data[i];
                if ($scope.vehicleDetail.id == "C_367870de4daccca6") {
                    $scope.veh.make = $scope.vehicleDetail.make;
                    $scope.veh.model = $scope.vehicleDetail.model;
                    $scope.veh.year = $scope.vehicleDetail.year;
                    $scope.veh.bodyType = 'Sedan';
                    $scope.veh.fuelType = $scope.vehicleDetail.fuel_grade;
                    $scope.veh.powerTrain = 'Front wheel drive';
                    $scope.veh.vinId = $scope.vehicleDetail.vin;
                    $scope.veh.prodNum = $scope.veh.vinId.slice(-6);
                } else if ($scope.vehicleDetail.id == "C_801597d31934aea6") {
                    $scope.veh.make = $scope.vehicleDetail.make;
                    $scope.veh.model = $scope.vehicleDetail.model;
                    $scope.veh.year = $scope.vehicleDetail.year;
                    $scope.veh.bodyType = 'Sedan';
                    $scope.veh.fuelType = $scope.vehicleDetail.fuel_grade;
                    $scope.veh.powerTrain = 'Front wheel drive';
                    $scope.veh.vinId = $scope.vehicleDetail.vin;
                    $scope.veh.prodNum = $scope.veh.vinId.slice(-6);
                } else if ($scope.vehicleDetail.id == "C_7a4dec8e226393d2") {
                    $scope.veh.make = $scope.vehicleDetail.make;
                    $scope.veh.model = $scope.vehicleDetail.model;
                    $scope.veh.year = $scope.vehicleDetail.year;
                    $scope.veh.bodyType = 'Sedan';
                    $scope.veh.fuelType = $scope.vehicleDetail.fuel_grade;
                    $scope.veh.powerTrain = 'Front wheel drive';
                    $scope.veh.vinId = $scope.vehicleDetail.vin;
                    $scope.veh.prodNum = $scope.veh.vinId.slice(-6);
                }
    
            }
            return $scope.vehicleDetail;
        })
    }
    

    var sumDrive = 0;
    var distanceKM = 0;
    var sumDuration = 0;
    var fuelCostUSD = 0;


    function InitTrip() {
        $scope.data = {};
        automaticService.getTripData().then(function (result) {
            var data = result.results;
            console.log("Trip Data" + data);
            for (var i = 0; i < data.length; i++) {
                $scope.trip = data[i];
                //if ($scope.trip.vehicle == "https://api.automatic.com/vehicle/C_367870de4daccca6/") {
                //    distanceKM += $scope.trip.distance_m;
                //    sumDrive += $scope.trip.distance_m;
                //    totalDistance = sumDrive / data.length;
                //    totalFuelInLiters += $scope.trip.fuel_volume_l;
                //    harshBrake += $scope.trip.hard_brakes;
                //    harshAccel += $scope.trip.hard_accels;
                //    OverSpeed += $scope.trip.duration_over_70_s;

                //    cityFraction += $scope.trip.city_fraction;
                //    highwayFraction += $scope.trip.highway_fraction;
                //    //  avgMPG = Math.min(($scope.trip.distance_m * 0.00062137 / totalFuelInLiters) || 0, 100);
                //}
                if ($scope.trip.vehicle == "https://api.automatic.com/vehicle/C_7a4dec8e226393d2/") {
                    distanceKM += $scope.trip.distance_m;
                    sumDuration += $scope.trip.duration_s;
                    fuelCostUSD += $scope.trip.fuel_cost_usd;
                    sumDrive += $scope.trip.distance_m;
                    totalDistance = sumDrive * 0.000621371192 / 14;
                    totalFuelInLiters += $scope.trip.fuel_volume_l;
                    harshBrake += $scope.trip.hard_brakes;
                    harshAccel += $scope.trip.hard_accels;
                    OverSpeed += $scope.trip.duration_over_70_s;


                    cityFraction += $scope.trip.city_fraction;
                    highwayFraction += $scope.trip.highway_fraction;
                    // avgMPG = Math.min(($scope.trip.distance_m * 0.00062137 / totalFuelInLiters) || 0, 100);
                }
                //if ($scope.trip.vehicle == "https://api.automatic.com/vehicle/C_801597d31934aea6/") {
                //    distanceKM += $scope.trip.distance_m;
                //    sumDrive += $scope.trip.distance_m;
                //    totalDistance = sumDrive / data.length;
                //    totalFuelInLiters += $scope.trip.fuel_volume_l;
                //    harshBrake += $scope.trip.hard_brakes;
                //    harshAccel += $scope.trip.hard_accels;
                //    OverSpeed += $scope.trip.duration_over_70_s;

                //    cityFraction += $scope.trip.city_fraction;
                //    highwayFraction += $scope.trip.highway_fraction;
                //    // avgMPG = Math.min(($scope.trip.distance_m * 0.00062137 / totalFuelInLiters) || 0, 100);    
                //}
                
            }
            var distanceInMiles = sumDrive * 0.000621371192;
            var durationInHrs = sumDuration * 0.00027778;
            var totalfuelCostUSD = fuelCostUSD;
            avgMPG = Math.min((distanceInMiles / (totalFuelInLiters * 0.264172)) || 0, 100);
            $scope.veh.distanceKM = distanceKM/1000;
            $scope.vehAna.hard_accels = harshAccel;
            $scope.vehAna.hard_brakes = harshBrake;
            $scope.vehAna.overSpeed = OverSpeed;

            heavyDerive(totalDistance);
            drawAvgFuelEconomy(avgMPG);
            drawhighwayCity(cityFraction, highwayFraction);
            return cityFraction, highwayFraction, avgMPG;

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
                        data: [totalDistance, 10],
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
                        data: [highwayFraction, cityFraction],
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
    function drawAvgFuelEconomy(avgMPG) {
        var ctx = document.getElementById("economy");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    "Average MPG",
                    "White"
                ],
                datasets: [
                    {
                        data: [avgMPG, 10],
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
    

    //RPM Range
    var ctx = document.getElementById("barChart");
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data:{
            labels: ["<1000", "1000 to 2500", "2500 to 3500"],
            datasets: [
                {
                    label: "RPM Range",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: [40, 100, 30],
                }
            ]
        }
    });

    //Fuel Economy
    var ctx = document.getElementById("lineChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
            datasets: [
                {
                    label: "Speed(miles/hr)",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    //borderCapStyle: 'butt',
                  //  borderDash: [],
                 //   borderDashOffset: 0.0,
                  //  borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    //pointBorderWidth: 1,
                    //pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [10, 15, 21, 23, 25, 30, 26, 22, 18, 15],
                   // spanGaps: false,
                }
            ]
        }
    });



}]);