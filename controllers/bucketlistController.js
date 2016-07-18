mainApp.controller("bucketlistController", function($scope, bucketlistService, $uibModal){
  $scope.init = function(){

    $scope.bucketlists = [];
    $scope.getAllBucketlists();
    $scope.bucketlistdetail = { name: "" };
  };
$scope.createBucketlist = function(){

  bucketlistService.createBucketlist($scope.bucketlistdetail.name).then(function(response){
    $scope.bucketlists.push(response.data);
    $scope.error = "" ;
    $("#myModal").modal('hide');
  }, function(err, status){
    console.log(err);
    $scope.error ="Could not create the bucketlist. Try again!";
  });
};

$scope.updateBucket = function(id){
  console.log(id);
  bucketlistService.update(id, $scope.bucket.name).then(function(response){
    // $scope.getAllBucketlists();
    $scope.error = "" ;
    $("#myModal2").modal('hide');
  },function(err){
    console.log(err);
    $scope.error ="Could not update the bucketlist. Try again!";
  })
};

$scope.delete = function(bucket){
  var index = $scope.bucketlists.indexOf(bucket);
  console.log(bucket.id);
  bucketlistService.delete(bucket.id).then(function(response){
    console.log("deleted");
    $scope.bucketlists.splice(index, 1);
    $scope.error = "" ;
  }, function(error){
    console.log(err);
    $scope.error ="Could not delete the bucketlist. Try again!";
  })
};

$scope.passbucket = function(bucketlist){
  $scope.bucket = bucketlist;
  // $scope.bucket_items = bucketlist.items;
  // $scope.bucket_id = bucketlist.id;
  // $scope.bucket_created = bucketlist.date_created;
  // $scope.bucket_updated = bucketlist.date_modified;

};
$scope.retainItemList = function(bucketlist){
  console.log("mama");
  console.log(bucketlist);
  bucketlistService.retainItemList(bucketlist.id, bucketlist.items);
};

$scope.getAllBucketlists = function(){
      bucketlistService.all()
      .then(function(response){
        console.log(response);
        console.log("let my niggas out");
        $scope.bucketlists = response.data;
      }, function(err, status){
        console.log(err);
      })
    };
    $scope.init();
});
