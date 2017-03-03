// svm 

'use strict'

// Set server port
let SERVER_PORT = 1337; 
let FILE_CLIENT = __dirname + "/client-recognizer.html';
let FILE_MODEL = __dirname + "/train.model";
// Set svm-predict path
let SVM_PREDICT = "~/libsvm/svm-predict"; 
let DIR_TEMP = __dirname;

// module
let
  http = require('http'),
  URL  = require('url'),
  path = require('path'),
  fs   = require('fs'),
  exec = require('child_process').exec;


// Server start
let svr = http.createServer(checkRequest);
svr.listen(SERVER_PORT, function(){
  console.log("서버 실행했습니다");
  console.log("http://localhost:" + SERVER_PORT);
});

// Request
function checkRequest(req, res) {
  let uri = URL.parse(req.url, true);
  let pathname = uri.pathname;

  if (pathname == "/predict") {
    api_predict(req, res, uri);
  }
  else if (pathname == "/") {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(fs.readFileSync(FILE_CLIENT, "utf-8"));
  } else {
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end("File not found");
  }
  console.log(pathname);
};

// Predict
function api_predict(req, res, uri) {
  let p = uri.query.p;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let value = JSON.parse("[" + p + "]");
  let list = [];
  for (let i in value) {
    let v = value[i] / 255;
    if (v == 0) continue;
    list.push( (parseInt(i) + 1) + ":" + v );
  }

  // Test Data
  let testdata = "0 " + list.join(" ") + "\n";
  console.log(testdata);

  // Save Temporary File
  let r = Math.random();
  let t = (new Date()).getTime();
  let tmp_test = DIR_TEMP + "/test-" + t + "-" + r;
  let tmp_res  = DIR_TEMP + "/res-" + t + "-" + r;
  fs.writeFileSync(tmp_test, testdata, "utf-8");

  // Execute command
  let cmd_a = [
    SVM_PREDICT,
    '"' + tmp_test + '"',
    '"' + FILE_MODEL  + '"',
    '"' + tmp_res + '"'
  ];

  let cmd = cmd_a.join(" ");
  console.log("*** cmd ***",cmd, "***");

  // Execute command
  exec(cmd, function (err, stdin, stdout) {
    if (err) {
      //res.end("ERROR: exec commnad");
      console.log('error > ' + err);
    }
    // Read Result
     try {
      let a = fs.readFileSync(tmp_res, "utf-8");
    } catch(err) {
      console.log('error > ' + err);
    }
    console.log("predict>" + a);
    console.log(stdout);
    res.end("" + a);
    // Delete Temporary File
    fs.unlink(tmp_test);
    fs.unlink(tmp_res);
  });
}
