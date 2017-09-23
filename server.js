const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors())

var db;

// tossa-de-mar-girona
// rubi-barcelona
// ripollet-barcelona
// barcelona-barcelona
app.get('/garajes/:city', (req, res) => {
  var city = req.params.city;
  db.collection('aggregate_data').find({"_id.id":"venta-garajes-"+city+"-con-precio-hasta_25000"}).toArray(function(err, results) {
    res.send(results);
  });
});

app.get('/pisos/:city', (req, res) => {
  var city = req.params.city;
  db.collection('aggregate_data').find({"_id.id":city+"-con-precio-hasta_200000"}).toArray(function(err, results) {
    res.send(results);
  });
});

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost/prices', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8080, () => {
    console.log('listening on 8080')
  })
})
