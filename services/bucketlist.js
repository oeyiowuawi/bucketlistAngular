mainApp.service("bucketlistService",function(sessionService, $http, $q){
  var bucketlists = {};
   bucketlists.bucket_detail = {};
  bucketlists.createBucketlist = function(data){
    var defer = $q.defer();
    reqData = {name: data};

    var req = {
      method: "POST",
      url: "https://e-list.herokuapp.com/bucketlists",
      data: reqData,
      headers: {
        "Authorization": sessionService.user.token,
        "Content-Type": "application/json"
      }
    };
    console.log("this is the data " + data);

    console.log(reqData);
    $http(req, reqData).then(function(response){
      defer.resolve(response);
    }).catch(function(err){
      defer.reject(err);
    });

    return defer.promise;
  };

  bucketlists.all = function(){
      var defer = $q.defer();
      var req = {
        method: "GET",
        url: "https://e-list.herokuapp.com/bucketlists",
        headers: {
          "Authorization": sessionService.user.token
        }
      };
      $http(req)
        .then(function(response){
        defer.resolve(response);
      })
      .catch(function(err, status){
        // console.log(err);
        // console.log(status);
        defer.reject(err);
      })

      return defer.promise;
    };

  bucketlists.show = function(id){
      var defer = $q.defer();
      var req = {
        method: "GET",
        url: "https://e-list.herokuapp.com/bucketlists/" + id,
        headers: {
          "Authorization": sessionService.user.token
        }
      };
      $http(req)
        .then(function(response){
          console.log(response);
        defer.resolve(response);
      })
      .catch(function(err, status){
        // console.log(err);
        // console.log(status);
        defer.reject(err);
      })

      return defer.promise;
    };

  bucketlists.update = function(id, bucket_name){
    var reqData = {name: bucket_name}
    var defer = $q.defer();
    var req = {
      method: "PUT",
      url: "https://e-list.herokuapp.com/bucketlists/" + id,
      data: reqData,
      headers: {
        "Authorization": sessionService.user.token
      }
    };

    $http(req, reqData).then(function(response){
      defer.resolve(response);
    }).catch(function(error){
      console.log(error);
      defer.reject(error);
    })
    return defer.promise;
  };

  bucketlists.delete = function(id){
    var defer = $q.defer();
    var request = {
      method: "DELETE",
      url: "https://e-list.herokuapp.com/bucketlists/" + id,
      headers: {
        "Authorization": sessionService.user.token
      }

    };
    $http(request).then(function(response){
      defer.resolve(response);
    }).catch(function(e){
      defer.reject(e);
    })
    return defer.promise;
  };

  bucketlists.retainItemList = function(bucket_id, items){
    // console.log(bucket);
    // var bucket_details = {itemlist: items, bucketlist_id: bucket_id}
    console.log(items);
    console.log(bucket_id);
    bucketlists.bucket_detail.itemlist = items;
    bucketlists.bucket_detail.bucketlist_id = bucket_id;
  };


  return bucketlists;
});
