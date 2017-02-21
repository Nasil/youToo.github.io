// Download all HTML page (Node.js)
// --- Module ---
var client = require('cheerio-httpcli');
var request = require('request');
var URL = require('url');
var fs = require('fs');
var path = require('path');
var urlType = require('url');

// --- Common ---
var LINK_LEVEL = 3;
var TARGET_URL = "https://tympanus.net/Development/MirrorEffect/";
var list = {};

// Main
downloadRec(TARGET_URL, 0);
saveCss(TARGET_URL);
saveJS(TARGET_URL);

function downloadRec(url, level) {
    // Check max level
    if (level >= LINK_LEVEL) return;

    // Ignore site already downloaded
    if (list[url]) return;
    list[url] = true;

    // Original page Ignore external pages
    var us = TARGET_URL.split("/");
    us.pop();
    var base = us.join("/");
    if (url.indexOf(base) < 0) return;

    // Save html page
    client.fetch(url, {}, function(err, $, res) {
        $("a").each(function(idx) {
            // get <a> tag link
            var href = $(this).attr('href');
            if (!href) return;
            href = URL.resolve(url, href);
            // Ignore after '#'
            href = href.replace(/\#.+$/, "");
            downloadRec(href, level + 1);
        });

        if (url.substr(url.length-1, 1) == '/') {
           url += "index.html";
        }

        var savepath = url.split("/").slice(2).join("/");
        checkSaveDir(savepath);
        console.log(savepath);
        fs.writeFileSync(savepath, $.html());
    });
}

// Check exist Directory and create Directory
function checkSaveDir(fname) {
    var dir = path.dirname(fname);
    var dirlist = dir.split("/");
    var p = "";
    for (var i in dirlist) {
        p += dirlist[i] + "/";
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
}

// save css file
function saveCss(url) {
     client.fetch(url, {}, function(err, $,res) {
        $("link").each(function(idx) {
            var text = $(this).text();
            var href = $(this).attr('href');
            if (!href) return;
            href = URL.resolve(url, href);
            if (href.match(/google|font|git/g) !== null) return;
            var savepath = href.split("/").slice(2).join("/");
            checkSaveDir(savepath);
            console.log(savepath);
            request(href).pipe(fs.createWriteStream(savepath));
         });
    });
}

// save JS file
function saveJS(url) {
     client.fetch(url, {}, function(err, $,res) {
         $("script").each(function(idx) {
            var text = $(this).text();
            var href = $(this).attr('src');
            if (!href) return;
            href = URL.resolve(url, href);
            if (href.match(/google|font|git/g) !== null) return;
            var savepath = href.split("/").slice(2).join("/");
            checkSaveDir(savepath);
            console.log(savepath);
            request(href).pipe(fs.createWriteStream(savepath));
         });
    });
}
