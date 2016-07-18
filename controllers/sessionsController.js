
mainApp.controller("sessionController", function($scope, sessionService, $location){
  $scope.init = function(){
      $scope.loginUser = {};
      $scope.error = "";
      $scope.username = sessionService.user.name;
    };
  $scope.loggedin = function (){
    // return sessionService.user.name != undefined || sessionService.user.token != undefined;
    if (sessionService.user.name == null && sessionService.user.token == null){
      // console.log()
      return false;
    }
    else{
      // console.log(sessionService.user.name);
      return true;
    };
      // if(session.user.token == null || session.user.token == ""){
      //   return false;
      // }
      // else {
      //   $scope.username = session.user.name;
      //   return true;
      // }
  };


  $scope.logout = function(){
    sessionService.destroy().then( function(response){
      $location.path("/");
    });

  }

  $scope.login = function(){
    sessionService.login($scope.loginUser).then( function(response){
      console.log(response)

      sessionService.create(response.data.name, response.data.auth_token);
      $location.path("/bucketlists");
      // sessionService.create();
    }, function(err, status){
      $scope.error = "Invalid Username or password";
    })

  };
  $scope.init();
});
