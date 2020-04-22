var app = angular.module('myapp', []);
app.controller('myCtrl', function($scope, postdata) {
  // $scope.user.firstName = 'John';
  // $scope.user.lastName = 'Doe';
  $scope.user = { firstName: 'John', lastName: 'Doe' };
  $scope.send = function(val) {
    postdata.postingdata(val); // calling the post function
  };
});
app.service('postdata', function($http) {
  return {
    postingdata: function(value) {
      $http({
        method: 'post',
        url: '/postdata',
        data: value
      }).then(
        function(success) {
          console.log(success);
        },
        function(error) {
          console.log(err);
        }
      );
    }
  };
});
