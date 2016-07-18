mainApp.service("sessionService",function($cookies, $http, $q){
  var session = {};
  session.user = {};
  session.user.name = $cookies.get("currentUser");
  session.user.token = $cookies.get("token");

  session.create = function(user, token){
    $cookies.put("token", token);
    $cookies.put("currentUser", user);
    session.setUser();
  };

  session.setUser = function(){
    session.user.name = $cookies.get("currentUser");
    session.user.token = $cookies.get("token");
    // console.log(session.user.name);
  };

  session.login = function(logInDetails){
    var defer = $q.defer();
    // var req = {
    //   method: "POST",
    //   url: "https://e-list.herokuapp.com/auth/login"
    // };
    $http.post("https://e-list.herokuapp.com/auth/login", logInDetails).then(function(response){
      defer.resolve(response);
    }).catch(function(e){
      defer.reject(e);
    });
    return defer.promise;
  };

  session.destroy = function(){
    var defer = $q.defer();

    var req = {
     method: 'GET',
     url: 'https://e-list.herokuapp.com/auth/logout',
     headers: {
       'Authorization': session.user.token
     }
   };

    $http(req).then(function(response) {
      console.log("entering the ajax request for logout")
      $cookies.remove("token");
      $cookies.remove("currentUser");
      session.user = {};
      defer.resolve(response);
    }).catch(function(e) {
      defer.reject(e);
    });
    return defer.promise;
  };
  return session;
});
