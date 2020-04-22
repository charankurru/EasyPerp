var app = angular.module('myapp', []);
app.controller('myCtrl', function(
  $scope,
  postdata,
  posdata,
  podata,
  pdata,
  editdata
) {
  // $scope.user.firstName = 'John';
  // $scope.user.lastName = 'Doe';
  $scope.user = {};
  $scope.obj = {};
  $scope.det = {};
  $scope.dat = {};

  $scope.Astore = [];
  $scope.Bstore = [];
  $scope.Cstore = [];
  $scope.Dstore = [];

  $scope.user = { firstName: 'John', lastname: 'Doe' };
  $scope.send = function(val) {
    $scope.Astore.push(val);
    postdata.postingdata(val);
    //insertdata.postingdata(val);
    $scope.user = {}; // calling the post function
  };

  $scope.go = function(val) {
    $scope.Bstore.push(val);
    posdata.postingdata(val);
    $scope.obj = {}; // calling the post function
  };

  $scope.went = function(val) {
    $scope.Cstore.push(val);
    podata.postingdata(val);
    $scope.det = {}; // calling the post function
  };

  $scope.gone = function(val) {
    $scope.Dstore.push(val);
    pdata.postingdata(val);
    $scope.dat = {}; // calling the post function
  };

  // editing the data
  $scope.update = function(val) {
    editdata.editingdata(val);
  };
});
//--_______________________________________________________________________________________________________________________________________--

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
          console.log(error);
        }
      );
    }
  };
});

// app.service('insertdata', function($http) {
//   return {
//     postingdata: function(value) {
//       $http({
//         method: 'post',
//         url: '/getda',
//         data: value
//       }).then(
//         function(success) {
//           console.log(success);
//         },
//         function(error) {
//           console.log(error);
//         }
//       );
//     }
//   };
// });

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
          console.log(error);
        }
      );
    }
  };
});

app.service('posdata', function($http) {
  return {
    postingdata: function(value) {
      $http({
        method: 'post',
        url: '/posdata',
        data: value
      }).then(
        function(success) {
          console.log(success);
        },
        function(error) {
          console.log(error);
        }
      );
    }
  };
});

app.service('podata', function($http) {
  return {
    postingdata: function(value) {
      $http({
        method: 'post',
        url: '/podata',
        data: value
      }).then(
        function(success) {
          console.log(success);
        },
        function(error) {
          console.log(error);
        }
      );
    }
  };
});

app.service('pdata', function($http) {
  return {
    postingdata: function(value) {
      $http({
        method: 'post',
        url: '/pdata',
        data: value
      }).then(
        function(success) {
          console.log(success);
        },
        function(error) {
          console.log(error);
        }
      );
    }
  };
});

app.service('editdata', function($http) {
  return {
    editingdata: function(value) {
      $http({
        method: 'post',
        url: '/edit',
        data: value
      }).then(function(success) {
        console.log(success);
        alert('successfully_updates');
      }),
        function(error) {
          console.log(error);
          alert(error.data);
        };
    }
  };
});
