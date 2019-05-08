var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt ="Generation: " + q.generation + " Score: " + q.score + " % Population Alive: " + q.population;
  console.log("Generation: " + q.generation); //returns 'localhost:8080'
  console.log("Score: " + q.score); //returns '/default.htm'
  console.log("Population % alive: " + q.population); //returns '?year=2017&month=february'
  res.end(txt);
}).listen(3561);





// var MongoClient = require('mongodb').MongoClient;
//
// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db) {
//     console.log(db);
//     console.log(db.collection);
//     db.collection('Persons', function (err, collection) {
//
//         collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
//         collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
//         collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });
//
//
//
//         db.collection('Persons').count(function (err, count) {
//             if (err) throw err;
//
//             console.log('Total Rows: ' + count);
//         });
//     });
//
// });
//
