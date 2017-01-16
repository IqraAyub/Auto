myApp.controller('myCtrl', ['$scope', '$http', '$window', 'automaticService', function ($scope, $http, $window, automaticService) {
    //Global scope objects
    $scope.allItemsSelected = false;
    $scope.veh = { make: '', model: '', year: '', fuelType: '', vinId: '', prodNum: '', distanceKM: '' };
    $scope.vehAna = { hard_brakes: '', hard_accels: '', overSpeed: '' };
    $scope.trips = [];
    $scope.selectedItem = '';
    //Global veriables
    var totalAvgDistance = 0;
    var totalFuelInLiters = 0;
    var harshBrake = 0;
    var harshAccel = 0;
    var OverSpeed = 0;
    var cityFraction = 0;
    var highwayFraction = 0;
    var avgMPG = 0;
    var sumDistance = 0;
    var sumDuration = 0;
    var sumFuelCostUSD = 0;
    var speedMPHDataArray = [];
    var mpgFuelEconomy = [];
    var distInMilesDataArray = [];
    var fuelInGallonArray = [];
  //  var today, todayNumber, mondayNumber, sundayNumber, monday, sunday, month, year, lastDay, firstDay;

    getVehicle();
    getTrip();
    getMIL();

    function getVehicle() {
        automaticService.getVehicle().then(function (result) {
            var data = result.results;
            for (var i = 0; i < data.length; i++) {
                $scope.vehicleDetail = data[i];
                    $scope.veh.make = $scope.vehicleDetail.make;
                    $scope.veh.model = $scope.vehicleDetail.model;
                    $scope.veh.year = $scope.vehicleDetail.year;
                    $scope.veh.bodyType = 'Sedan';
                    $scope.veh.fuelType = $scope.vehicleDetail.fuel_grade;
                    $scope.veh.powerTrain = 'Front wheel drive';
                    $scope.veh.vinId = $scope.vehicleDetail.vin;
                }
            return $scope.veh;
        })
    }

    function getTrip() {
        automaticService.getTrips().then(function (result) {
            var data = result.results;
            $scope.trips = result.results;
            for (var i = 0; i < data.length/4; i++) {
                $scope.trip = data[i];
                    sumDistance += $scope.trip.distance_m;
                    sumDuration += $scope.trip.duration_s;
                    sumFuelCostUSD += $scope.trip.fuel_cost_usd;
                    totalAvgDistance = sumDistance * 0.000621371192 / 14;
                    totalFuelInLiters += $scope.trip.fuel_volume_l;
                //for driving style
                    harshBrake += $scope.trip.hard_brakes;
                    harshAccel += $scope.trip.hard_accels;
                    OverSpeed += $scope.trip.duration_over_70_s;
                //for driving style
                //for fuel economy
                    var distInM = $scope.trip.distance_m * 0.000621371192;
                    var durationInHr = $scope.trip.duration_s * 0.00027778;
                    var fuelInGallon = $scope.trip.fuel_volume_l * 0.264172;
                    var speedMPH = Math.round(distInM / durationInHr);
                    speedMPHDataArray.push(speedMPH);
                    var mpgEconomy = Math.round(Math.min((distInM / fuelInGallon) || 0, 100));
                    mpgFuelEconomy.push(mpgEconomy);
                //for fuel economy
                //for trip graph
                    distInMilesDataArray.push(Math.ceil(distInM));
                    fuelInGallonArray.push(Math.ceil(fuelInGallon));
                //for trip graph
                //for city vs highway
                    cityFraction += $scope.trip.city_fraction;
                    highwayFraction += $scope.trip.highway_fraction;
                //for city vs highway
                }

            var distanceInMiles = sumDistance * 0.000621371192;
            var durationInHrs = sumDuration * 0.00027778;
            var totalfuelCostUSD = sumFuelCostUSD;
            avgMPG = Math.min((distanceInMiles / (totalFuelInLiters * 0.264172)) || 0, 100);
            $scope.veh.distanceKM = sumDistance / 1000;
            //for driving style
            $scope.vehAna.hard_accels = harshAccel;
            $scope.vehAna.hard_brakes = harshBrake;
            $scope.vehAna.overSpeed = Math.ceil(OverSpeed * 0.00027778);
            //for driving style

            //  Calling graph functions
            heavyDerive(Math.ceil(totalAvgDistance));
            drawAvgFuelEconomy(Math.ceil(avgMPG));
            drawhighwayCity(Math.ceil(cityFraction), Math.ceil(highwayFraction));
            fuelEconomy(speedMPHDataArray, mpgFuelEconomy);
            trip(distInMilesDataArray, fuelInGallonArray);
            initHeatMap($scope.trips);
            // initMap(data);
            return cityFraction, highwayFraction, avgMPG, data, $scope.trip;
        })
    };

    function getMIL() {
        $scope.data = {};
        automaticService.getMILData().then(function (result) {
            var data = result.results;
        });
    };

    //% Heavy Driving
    function heavyDerive(totalAvgDistance) {
        var ctx = document.getElementById("driving");
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    "%Heavy Drive",
                    "%Normal Drive"
                ],
                datasets: [
                    {
                        data: [totalAvgDistance/100, (100-totalAvgDistance)/100],
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
            text: {
                label: "Total revenue: $60K"
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
                    "Average MPG"
                ],
                datasets: [
                    {
                        data: [avgMPG, (100-avgMPG)],
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
    //Fuel Economy
    function fuelEconomy(speedMPHDataArray, mpgFuelEconomy) {
        var ctx = document.getElementById("lineChart");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: speedMPHDataArray,
                datasets: [
                    {
                        label: "SpeedMPH/FuelMPG",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: mpgFuelEconomy,
                    }
                ]
            }
        });

    }
    //Each trip chart
    function trip(distInMilesDataArray, fuelInGallonArray) {
        var ctx = document.getElementById("tripBarChart");
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: distInMilesDataArray, 
                datasets: [
                    {
                        label: "Distance(miles)/Fuel(gallons)",
                        backgroundColor: 
                            'rgba(255, 99, 132, 0.2)',
                        borderColor: 
                            'rgba(255,99,132,1)',                       
                        borderWidth: 1,
                        data: fuelInGallonArray,
                    }
                ]
            }
        });

    }

    $scope.getTripRoute = function (tripStart, tripEnd) {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: new google.maps.LatLng(37.86974, -122.31934)
            });
            directionsDisplay.setMap(map);

            directionsService.route({
                origin: tripStart,
                destination: tripEnd,
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }
    
        //$scope.selectEntity = function () {
        //    // If any entity is not checked, then uncheck the "allItemsSelected" checkbox
        //    for (var i = 0; i < $scope.trips.length; i++) {
        //        if (!$scope.trips[i].isChecked) {
        //            $scope.allItemsSelected = false;
        //            return;
        //        }
        //    }

        //    // ... otherwise check the "allItemsSelected" checkbox
        //    $scope.allItemsSelected = true;
        //};

        //// Fired when the checkbox in the table header is checked
        //$scope.selectAll = function () {
        //    // Loop through all the entities and set their isChecked property
        //    for (var i = 0; i < $scope.trips.length; i++) {
        //        $scope.trips[i].isChecked = $scope.allItemsSelected;
        //    }
        //};

        //console.log("Items" + $scope.allItemsSelected);
    
    //Heat Map
    $window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 25.229087999999997,
            lng: 55.410776
        },
        zoom: 9,
        styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2e5d4" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }]

    });

    function initHeatMap(points) {
        var heatmap;
        var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(25.229087999999997, 55.410776),
            styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }, { "lightness": 33 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2e5d4" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#c5dac6" }] }, { "featureType": "poi.park", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": 20 }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#c5c6c6" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#e4d7c6" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#fbfaf7" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#acbcc9" }] }]
        };

        var mapElement = document.getElementById('map');
        map = new google.maps.Map(mapElement, mapOptions);

        var data = points;
        function getPoints(data) {
            var dataArr = [];
            var lat, lng;
            var pointsArr = [];
            for (var prop in data) {
                dataArr.push(data[prop]);
            }
            for (var i = 0; i < dataArr.length; i++) {
                lat = dataArr[i].start_location.lat;
                lng = dataArr[i].start_location.lon;

                pointsArr.push(new google.maps.LatLng(lat, lng));
            }
            return pointsArr;
        }

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: getPoints(data),
            map: map
        });

    }
}]);