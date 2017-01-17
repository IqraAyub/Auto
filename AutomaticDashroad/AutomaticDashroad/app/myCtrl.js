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
                    cityFraction += $scope.trip.duration_over_70_s;
                    highwayFraction += $scope.trip.duration_over_75_s + $scope.trip.duration_over_80_s;
                    var city = (cityFraction / (cityFraction + highwayFraction)) * 0.00027778;
                    var highway = (highwayFraction / (cityFraction + highwayFraction)) * 0.00027778;
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
            drawhighwayCity(Math.ceil(city), Math.ceil(highway));
            fuelEconomy(speedMPHDataArray, mpgFuelEconomy);
            trip(distInMilesDataArray, fuelInGallonArray);
            initHeatMap($scope.trips);
            // initMap(data);
            return city, highway, avgMPG, data, $scope.trip;
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
                    "Highway " +highwayFraction+"%",
                    "City "+cityFraction+"%"
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
        var ctx = document.getElementById("lineChart").getContext("2d");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0,10,20,30,40,50,60,70,80,90,100],
                datasets: [
                    {
                        label: "MPG",
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
        var a = distInMilesDataArray;
        var b = fuelInGallonArray;
        var asJSON = [];
        for (i = 0; i < a.length; i++) {
            var obj = {};
                obj['x'] = a[i];
                obj['y'] = b[i];
                asJSON.push(obj);
        }
        var chart = new CanvasJS.Chart("tripBarChart", {
            axisX: {						
                title: "Distance(ML)",
                titleFontWeight: "bold",
                titleFontSize: 14,
                titleFontFamily: "open serif, sans-serif",
            },
            axisY: {						
                title: "Fuel(G)",
                titleFontWeight: "bold",
                titleFontSize: 14,
                titleFontFamily: "open serif, sans-serif",
            },
            data: [{
                type: "column",
                dataPoints: asJSON
            }]
        });

        chart.render();

        //var ctx = document.getElementById("tripBarChart");
        //var myBarChart = new Chart(ctx, {
        //    type: 'line',
        //    data: {
        //       // labels: distInMilesDataArray, 
        //     //   labels:[10,20,30,40,50],
        //        datasets: [
        //            {
        //                label: "Distance(miles)/Fuel(gallons)",
        //                backgroundColor: 
        //                    'rgba(255, 99, 132, 0.2)',
        //                borderColor: 
        //                    'rgba(255,99,132,1)',                       
        //                borderWidth: 1,
        //                data: asJSON,
        //            }
        //        ]
        //    }
        //});

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
            dissipating: false,
            radius: 5,
            data: getPoints(data),
            map: map
        });

    }
}]);