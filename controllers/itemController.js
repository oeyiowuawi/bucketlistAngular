mainApp.controller("itemsController", function($scope, bucketlistService, $routeParams, itemService){
  $scope.init = function(){
    $scope.items = [];
    $scope.show($routeParams.id);
    console.log($routeParams.id);
    $scope.item = {};
    $scope.error = "";
  };


  $scope.delete = function(item){
    var index = $scope.items.indexOf(item);
    itemService.delete(item.id, $scope.bucket_id).then(function(response){
      console.log("index: " + index);
      console.log("before delete " + $scope.items);
      $scope.items.splice(index, 1);
      console.log("after delete " + $scope.items);
    }
    , function(err){console.log(err)})
  };

  $scope.createItem = function(){
    itemService.createItem($scope.item,$scope.bucket_id).then(function(response){

      console.log(response);
      $scope.items.push(response.data)
      $("#myModal").modal('hide');
    }, function(error){
      $scope.error = "couldn't create the Item"
      console.log(error);
    })
  };
  $scope.updateitem = function(){
    itemService.update($scope.bucket_id, $scope.pass_item).then(function(response){
      $scope.error = "" ;
      $("#myModal2").modal('hide');
    },function(err){
      console.log(err);
      $scope.error ="Could not update the bucketlist. Try again!";
    })
  };
  $scope.passItem = function(item){
    $scope.pass_item = item;

  };

  $scope.show = function(id){
    bucketlistService.show(id).then(function(response){
      $scope.bucket_id = response.data.id;
      $scope.items = response.data.items;
    }, function(err){
      console.log(err);
    })
  };
  $scope.init();
});
