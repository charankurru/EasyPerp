var app = angular.module('myapp', []);
app.controller('myCtrl', function (
  $scope,
  postdata,
  posdata,
  podata,
  pdata,
  editdata,
  getdata,
  getdat,
  getda,
  getd
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
  $scope.send = function (val) {
    //$scope.Astore.push(val);
    postdata.postingdata(val);
    //insertdata.postingdata(val);
    $scope.user = {}; // calling the post function
  };

  $scope.go = function (val) {
    //$scope.Bstore.push(val);
    posdata.postingdata(val);
    $scope.obj = {}; // calling the post function
  };

  $scope.went = function (val) {
    //$scope.Cstore.push(val);
    podata.postingdata(val);
    $scope.det = {}; // calling the post function
  };

  $scope.gone = function (val) {
    //$scope.Dstore.push(val);
    pdata.postingdata(val);
    $scope.dat = {}; // calling the post function
  };

  // editing the data______________________________________________________________________________________
  $scope.update = function (val) {
    editdata.editingdata(val);
  };

  //getting data from database_ and storing them in a array_____________________________________________________________________________
  $scope.get = function (val) {
    console.log(val);
    getdata.gettingdata(val).then(function (data) {
      if (data) {
        $scope.Astore = data;
        console.log($scope.store);
      } else {
        $scope.Astore = [];
      }
    });

    getdat.gettingdata(val).then(function (data) {
      if (data) {
        $scope.Bstore = data;
        console.log($scope.store);
      } else {
        $scope.Bstore = [];
      }
    });

    getda.gettingdata(val).then(function (data) {
      if (data) {
        $scope.Cstore = data;
        console.log($scope.store);
      } else {
        $scope.Cstore = [];
      }
    });

    getd.gettingdata(val).then(function (data) {
      if (data) {
        $scope.Dstore = data;
        console.log($scope.store);
      } else {
        $scope.Dstore = [];
      }
    });
  };
});

// service is used to making the response _______________________________________________________________________________________________________________________________________--

app.service('postdata', function ($http) {
  return {
    postingdata: function (value) {
      $http({
        method: 'post',
        url: '/postdata',
        data: value,
      }).then(
        function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        }
      );
    },
  };
});

app.service('posdata', function ($http) {
  return {
    postingdata: function (value) {
      $http({
        method: 'post',
        url: '/posdata',
        data: value,
      }).then(
        function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        }
      );
    },
  };
});

app.service('podata', function ($http) {
  return {
    postingdata: function (value) {
      $http({
        method: 'post',
        url: '/podata',
        data: value,
      }).then(
        function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        }
      );
    },
  };
});

app.service('pdata', function ($http) {
  return {
    postingdata: function (value) {
      $http({
        method: 'post',
        url: '/pdata',
        data: value,
      }).then(
        function (success) {
          console.log(success);
        },
        function (error) {
          console.log(error);
        }
      );
    },
  };
});

app.service('editdata', function ($http) {
  return {
    editingdata: function (value) {
      $http({
        method: 'post',
        url: '/edit',
        data: value,
      }).then(function (success) {
        console.log(success);
        alert('successfully_updates');
      }),
        function (error) {
          console.log(error);
          alert(error.data);
        };
    },
  };
});

//______________________________________________________________________________________________________________________________________
// factory is used to get an response from the backend
app.factory('getdata', function ($http) {
  return {
    gettingdata: function (value) {
      dattas = $http({
        method: 'get',
        url: '/getdata',
        data: value,
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      });
      return dattas;
    },
  };
});

app.factory('getdat', function ($http) {
  return {
    gettingdata: function (value) {
      dattas = $http({
        method: 'get',
        url: '/getdat',
        data: value,
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      });
      return dattas;
    },
  };
});

app.factory('getda', function ($http) {
  return {
    gettingdata: function (value) {
      dattas = $http({
        method: 'get',
        url: '/getda',
        data: value,
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      });
      return dattas;
    },
  };
});

app.factory('getd', function ($http) {
  return {
    gettingdata: function (value) {
      dattas = $http({
        method: 'get',
        url: '/getd',
        data: value,
      }).then(function (response) {
        console.log(response.data);
        return response.data;
      });
      return dattas;
    },
  };
});
