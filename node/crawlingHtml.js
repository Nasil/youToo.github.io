// Download all HTML page (Node.js)
'use strict'

// --- Module ---
const client = require('cheerio-httpcli');
const request = require('request');
const URL = require('url');
const fs = require('fs');
const path = require('path');
const urlType = require('url');

// --- Common ---
const LINK_LEVEL = 3;
const TARGET_URL = 'http://nasil7737.cafe24.com/';
const list = {};

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
    let us = TARGET_URL.split('/');
    us.pop();
    let base = us.join('/');
    if (url.indexOf(base) < 0) return;

    // Save html page
    client.fetch(url, {}, function(err, $, res) {
        $('a').each(function(idx) {
            // get <a> tag link
            let href = $(this).attr('href');
            if (!href) return;
            href = URL.resolve(url, href);
            // Ignore after '#'
            href = href.replace(/\#.+$/, '');
            downloadRec(href, level + 1);
        });

        if (url.substr(url.length-1, 1) == '/') {
           url += 'index.html';
        }

        let savepath = url.split('/').slice(2).join('/');
        checkSaveDir(savepath);
        console.log(savepath);
        fs.writeFileSync(savepath, $.html());
    });
}

// Check exist Directory and create Directory
function checkSaveDir(fname) {
    let dir = path.dirname(fname);
    let dirlist = dir.split('/');
    let p = '';
    for (let i in dirlist) {
        p += dirlist[i] + '/';
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
}

// save css file
function saveCss(url) {
     client.fetch(url, {}, function(err, $,res) {
        $('link').each(function(idx) {
            let text = $(this).text();
            let href = $(this).attr('href');
            if (!href) return;
            href = URL.resolve(url, href);
            if (href.match(/google|font|git/g) !== null) return;
            let savepath = href.split('/').slice(2).join('/');
            checkSaveDir(savepath);
            console.log(savepath);
            request(href).pipe(fs.createWriteStream(savepath));
         });
    });
}

// save JS file
function saveJS(url) {
     client.fetch(url, {}, function(err, $,res) {
         $('script').each(function(idx) {
            let text = $(this).text();
            let href = $(this).attr('src');
            if (!href) return;
            href = URL.resolve(url, href);
            if (href.match(/google|font|git/g) !== null) return;
            let savepath = href.split('/').slice(2).join('/');
            checkSaveDir(savepath);
            console.log(savepath);
            request(href).pipe(fs.createWriteStream(savepath));
         });
    });
}
