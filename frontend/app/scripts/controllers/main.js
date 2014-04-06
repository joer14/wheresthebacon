'use strict';

angular.module('wtbApp')
  .controller('MainCtrl', function ($scope, $http, leafletData) {
   $scope.showLeaflet = function() {
              leafletData.getMap().then(function(map) {
                  console.log(map);
                  //map.invalidateSize(true);
                  map.fitBounds([ [40.712, -74.227], [40.774, -74.125] ]);
              });
          };


    $scope.url = "http://www.kimonolabs.com/api/ce6dd1oc?apikey=2323b50a71ade7d336c82c9f9dd5c072";
    $scope.newMessage = "";
    $scope.messages = ["Steve Jobs - 515,000,000 results"];

    $scope.add = function(){
      // alert("hi");
      $http.jsonp($scope.url).then(function(response) {
                // alert(response);
                $scope.newMessage = response.data;
                $scope.messages.push($scope.newMessage);
      });
      console.log($scope.newMessage);
    };

    $scope.altLoc = "";
    $scope.startup = true;

    $scope.pos;
    $scope.altLook
    $scope.geoLook = function(){
         $scope.startup = false;
         alert("hi");
         $scope.showLoc = false;
         if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(function(pos){
                   $scope.pos = pos;
                   $scope.showLoc = true;
                   $scope.$apply();
                   console.log($scope.pos);
              },function(err){
                   $scope.showLoc = false;
                   $scope.$apply();
              });



        }
    };

    var local_icons = {
        default_icon: {},
        leaf_icon: {
            iconUrl: 'examples/img/leaf-green.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
             iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        div_icon: {
            type: 'div',
            iconSize: [230, 0],
            html: 'Using <strong>Bold text as an icon</strong>: Lisbon',
            popupAnchor:  [0, 0]
        },
        orange_leaf_icon: {
            iconUrl: 'examples/img/leaf-orange.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62]
        }
    };

    angular.extend($scope, {
        icons: local_icons
    });

    angular.extend($scope, {
        lisbon: {
            lat:36.98904808157193,
            lng:-122.0545220375061,
            zoom: 14
        },
        markers: {
            m1: {
                lat:36.996991744785,
                lng:-122.0530629158,
                message: "Cowell/ Stevenson",
                //icon: local_icons.default_icon,
            },
            m2: {
                lat:37.001093932027,
                lng:-122.05775812268,
                message: "9/10 Dining Hall",
                //icon: local_icons.default_icon,
            },
            m3: {
                lat:36.991587873187,
                lng:-122.06532329321 ,
                message: "College 8 / Oakes",
                //icon: local_icons.default_icon,
            },
            m4: {
                lat: 36.994365371902,
                lng:-122.06584632396,
                message: "Porter / Kresge",
                //icon: local_icons.default_icon,
            },
            m5: {
                lat:36.999974688794,
                lng:-122.05444693565,
                message: "Crown / Merrill",
                //icon: local_icons.default_icon,
            }
        },
        defaults: {
            scrollWheelZoom: false
        }



    });



  });
