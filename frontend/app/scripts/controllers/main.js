'use strict';

angular.module('wtbApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.url = "http://www.kimonolabs.com/api/ce6dd1oc?apikey=2323b50a71ade7d336c82c9f9dd5c072";
    $scope.newMessage = "";
    $scope.messages = ["Steve Jobs - 515,000,000 results"];

    $scope.add = function(){
      alert("hi");
      $http.jsonp($scope.url).then(function(response) {
                // alert(response);
                $scope.newMessage = response.data;
                $scope.messages.push($scope.newMessage);
      });
      console.log($scope.newMessage);
    };
    $scope.altLoc = "";
    $scope.pos;
    $scope.altLook
    $scope.geoLook = function(){
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
    //   //
    //   //if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       $scope.startPos = position;
    //       // document.getElementById("startLat").innerHTML = startPos.coords.latitude;
    //       // document.getElementById("startLon").innerHTML = startPos.coords.longitude;
    //     }, function(error) {
    //       alert("Error occurred. Error code: " + error.code);
    //       // error.code can be:
    //       //   0: unknown error
    //       //   1: permission denied
    //       //   2: position unavailable (error response from locaton provider)
    //       //   3: timed out
    //     });
    //
    //     // navigator.geolocation.watchPosition(function(position) {
    //     //   document.getElementById("currentLat").innerHTML = position.coords.latitude;
    //     //   document.getElementById("currentLon").innerHTML = position.coords.longitude;
    //     //   document.getElementById("distance").innerHTML =
    //     //     calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
    //     //                       position.coords.latitude, position.coords.longitude);
    //     // });
    //   }
    //
    //
    // //};


  });

//
// var startPos;
//
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     startPos = position;
  //     document.getElementById("startLat").innerHTML = startPos.coords.latitude;
  //     document.getElementById("startLon").innerHTML = startPos.coords.longitude;
  //   }, function(error) {
  //     alert("Error occurred. Error code: " + error.code);
  //     // error.code can be:
  //     //   0: unknown error
  //     //   1: permission denied
  //     //   2: position unavailable (error response from locaton provider)
  //     //   3: timed out
  //   });
//
//     navigator.geolocation.watchPosition(function(position) {
//       document.getElementById("currentLat").innerHTML = position.coords.latitude;
//       document.getElementById("currentLon").innerHTML = position.coords.longitude;
//       document.getElementById("distance").innerHTML =
//         calculateDistance(startPos.coords.latitude, startPos.coords.longitude,
//                           position.coords.latitude, position.coords.longitude);
//     });
//   }
// };
