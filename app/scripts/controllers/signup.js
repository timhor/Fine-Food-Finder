'use strict';

angular.module('fineFoodFinderApp')
  .controller('SignUpCtrl', function($scope, $http, $log, $window, $location) {
        $scope.list = [];
        $scope.submit = function() {
          if ($scope.password1 === $scope.password2) {
            $http.get('http://localhost:3000/users').then(function(response) {
              let numUsers = response.data.length;
              sha256($scope.password1).then(function(digest) {
                let newUser = {
                  "id": parseInt(numUsers) + 1,
                  "username": $scope.username,
                  "password": digest,
                  "email": $scope.email
                };
                $http.post('http://localhost:3000/users', JSON.stringify(newUser)).then(
                  function(response) {
                    $log.log($scope.username + " (" + $scope.email + ") signed up");
                    $location.path('/login');
                  }, function(response) {
                    $log.error("Error creating new user");
                  });
              });
            });
          } else {
            $window.alert("Error: passwords don't match");
          }
        };
  });

// the following code is taken verbatim from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

function sha256(str) {
  var buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash);
  });
}

function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i);
    var stringValue = value.toString(16);
    var padding = '00000000';
    var paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}