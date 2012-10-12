  
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
  var client = new Db('test', new Server("127.0.0.1", 27017, {}));
       
    client.open(function(err) {
       if(err)
        console.log(err);
    });
