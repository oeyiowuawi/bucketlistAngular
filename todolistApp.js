var mainApp = angular.module("todolistApp", [
  'ngRoute',
  "ngCookies",
  "ui.bootstrap"
]);
mainApp.config(function($routeProvider) {
$routeProvider.when("/", {
      templateUrl : "pages/index.html",
      controller: "mainController"
  })

  // route for the login
  .when("/login", {
      templateUrl : "pages/login.html",
      controller  : "sessionController"
  })

  // route for the user creation
  .when("/register", {
      templateUrl : "pages/signup.html",
      controller  : "createUserController"
  })
  .when("/bucketlists", {
      templateUrl : "pages/bucketlist/index.html",
      controller  : "bucketlistController"
  })
  .when("/item/:id", {
      templateUrl : "pages/item/index.html",
      controller  : "itemsController"
  })
  .otherwise({ redirectTo: "/" });

});
