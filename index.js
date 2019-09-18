const express = require('express')
const app = express()
const port = 8080

var redis = require('redis')
var client = redis.createClient()

client.on('error', function (err) {
  console.log('Error ' + err)
})

app.get('/', (req, res) => {
    client.get('usercounter', (err, rep) => {
        client.set('usercounter', rep + 1, (err2, resp) => {
            res.send("Current usercounter is " + resp);
        });
    });
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))