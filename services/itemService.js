mainApp.service("itemService", function(sessionService, $http, $q){

  var itemService = {};

  itemService.delete = function(id, bucket_id){
    var defer = $q.defer();
    var req = {
      method: "DELETE",
      url: "https://e-list.herokuapp.com/bucketlists/"+ bucket_id + "/items/" + id,
      headers: {
        "Authorization": sessionService.user.token
      }
    };

    $http(req).then(function(response){
      defer.resolve(response);
      console.log("sixes");
    }).catch(function(err){
      defer.reject(err);
    });
    return defer.promise;
  };

  itemService.update = function(bucket_id, item){
    var defer = $q.defer();
    var req = {
      method: "PUT",
      url: "https://e-list.herokuapp.com/bucketlists/" + bucket_id + "/items/" + item.id ,
      data: item,
      headers: {
        "Authorization": sessionService.user.token
      }
    };

    $http(req).then(function(response){
      console.log("updating");
      defer.resolve(response);
    }).catch(function(error){
      console.log(error);
      defer.reject(error);
    })
    return defer.promise;
  };

  itemService.createItem = function(datum, bucket_id){
    var defer = $q.defer();
    var req = {
      method: "POST",
      url: "https://e-list.herokuapp.com/bucketlists/"+ bucket_id + "/items",
      data: datum,
      headers: {
        "Authorization": sessionService.user.token
      }
    };

    $http(req).then(function(response){
      console.log("received");
      defer.resolve(response);
    }).catch(function(err){
      console.log("bleh");

      defer.reject(err);
    });
    return defer.promise;
  };
  return itemService;
});
