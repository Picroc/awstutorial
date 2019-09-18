var express = require('express');
var router = express.Router();

var redis = require('redis')
var client = redis.createClient({host: 'redis'})

client.on('error', function (err) {
  console.log('Error ' + err)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  client.incr('usercounter', (err, rep) => {
    client.get('usercounter', (err2, resp) => {
      res.render('index', { title: 'Hello! ' + resp + ' users visited this site!' });
    });
  });
});

module.exports = router;
