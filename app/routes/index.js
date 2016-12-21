var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
