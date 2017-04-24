var fs = require("fs");
var http = require("http");
var https = require("https");
var path = require("path");
var url = require("url");
var events = require("events").EventEmitter;
var util = require("util");
var cheerio = require("cheerio");

const TARGET_URL = 'http://gaengs.co.kr';
parseImg(TARGET_URL, 0)


function parseImg(utl, level) {

    // Support HTTPS.
    var protocol = http;
    var request = protocol.request(utl, function(response){
        if(response.statusCode != 200){
            onsole.log('HAHA');
            console.error("Image scraper(1): web page couldn't be found. (statusCode:" + response.statusCode + ")");
            request.end();
            return process.exit(1);
        }
        else{
            response.setEncoding("utf8");
            var previous = "";
            var current;
            response.on("data", function(data){
                var current = previous + data;
                current.replace(/<img[\S\s]*?>/ig, function(m){
                    let imageInfo = cheerio.load(m)("img")[0];
                    let at = imageInfo.attribs; // 에러 잡기
                    let name = path.basename(at.src, path.extname(at.src)); // img name
                    let pullUrl = utl + at.src;
                    let saveTo = path.dirname(require.main.filename)
                    let extension = path.extname(at.src); // img type
                    let savepath = saveTo + '\\' + name + extension;
                    // 의미 있는 데이터만 추출
                    console.log(pullUrl);
                    //fs.writeFileSync(savepath, pullUrl);
                });
                previous = data;
            });
        }
    });
    request.end();
    request.on("error", function(e){
        console.error("Image scraper(2): error while loading web page: " + e + ".");
    });
};
