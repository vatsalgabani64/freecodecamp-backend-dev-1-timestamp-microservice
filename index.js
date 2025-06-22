// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?",(req,res)=>{
  // console.log(isNaN(new Date(Number(req.params.date))));
  
  let date;
  if((req.params.date === '' || req.params.date===undefined)){
    date = new Date();
  }
  else if(!isNaN(new Date(Number(req.params.date)))){
    date=new Date(Number(req.params.date));
  }else if(!isNaN(new Date(req.params.date))){
    date=new Date(req.params.date);
  }else{
    return res.json({"error":"Invalid Date"});
  }
  const unixTimeStamp = Math.floor(date.getTime() );
  const utcTimeStamp = date.toUTCString();
  res.json({
    "unix":unixTimeStamp,
    "utc":`${utcTimeStamp}`
  });
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
