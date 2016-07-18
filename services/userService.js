mainApp.service("userService",function($http, $q){
  var _ = {};

  _.sendDetails = function(data) {
    var defer = $q.defer();

    $http.post("https://e-list.herokuapp.com/users",data).then(function(response) {
      defer.resolve(response);
    }).catch(function(e) {
      defer.resolve(e);
    });

      return defer.promise;
  }

  return _;

});
