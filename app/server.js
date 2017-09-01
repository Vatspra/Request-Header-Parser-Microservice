// server.js
// where your node app starts

// init project
var express = require('express');
const os =require('os');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
var ips =ip.split(',');
var operatingSystem =os.platform();
var arch =os.arch();
var language = req.headers['accept-language'].split(',');
  
res.setHeader('Content-Type', 'application/json');
  var headers= req.headers['user-agent'].split('()');
  
  var b = JSON.stringify(headers);
  var c =[];
  var index1 = b.indexOf('(');
  var index2 = b.indexOf(')');
  var operate="";
  for(var i =index1+1;i<index2;i++){
    operate =operate+b[i];
  }
  var firstIndex = operate.indexOf(";");
  var lastIndex = operate.lastIndexOf(";");
  var operatingSys ="";
  if(firstIndex===lastIndex){
    operatingSys=operate
  }
  else{
    for(var i=0;i<lastIndex;i++){
      operatingSys=operatingSys+operate[i];
    }
  }
  
  res.send(JSON.stringify({"ip":ips[0],"language":language[0],"software":operatingSys}))
   
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
