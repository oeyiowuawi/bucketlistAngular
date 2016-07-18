mainApp.controller("createUserController", function($scope, userService, sessionService, $location){
  $scope.user = {};

  $scope.submit = function() {
    // console.log($scope.user);
    userService.sendDetails($scope.user).then(function(result) {
      console.log(result);
      console.log(result.data.user.name);
      console.log(result.data.auth_token);
      sessionService.create(result.data.user.name, result.data.auth_token);
      $location.path("/bucketlists");
    }), function(err, status){
      console.log(err);
    }
  };
});
