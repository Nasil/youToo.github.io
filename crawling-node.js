var url = "http://nasil7737.cafe24.com/";
var savepath = "test22.html";

var http = require('http');
var fs = require('fs');

var outfile = fs.createWriteStream(savepath);

http.get(url, function(res){
	res.pipe(outfile);
	res.on('end', function() {
		outfile.close();
		console.log("ok");
	});
});


