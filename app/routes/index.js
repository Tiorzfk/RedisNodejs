var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

/* GET home page. */
router.get('/api/:key', function(req, res, next) {

  client.on("error", function (err) {
    console.log("Error " + err);
  });

  var key = req.params.key;

  client.get(key, function(error, result) {

      if (result) {
        // the result exists in our cache - return it to our user immediately
        res.send({ "key": result});
      } else {

        console.log('Simpan key baru pada redis.');

        client.set(key,'Tio Ganteng',function(err,reply){
          console.log('Berhasil menyimpan key baru');
        });

        client.get(key,function(err,data){
          res.send({key:data});
        });

      }

  });

});

router.get('/storeArray', function(req, res, next) {

  client.on("error", function (err) {
    console.log("Error " + err);
  });

  client.smembers('name', function(error, result) {

      if (result) {
        // the result exists in our cache - return it to our user immediately
        res.send({ "array": result});
      }
  });

});

module.exports = router;
