var cheerio = require("cheerio");
const client = require('cheerio-httpcli');
const request = require('request');
const fs = require('fs');
const URL = require('url');
const path = require('path');
const urlType = require('url');

// 쇼핑몰 TOP 10
const TARGET_URL1 = 'http://mall1.co.kr'; //1
const TARGET_URL2 = 'http://mall2.co.kr'; //2
const TARGET_URL3 = 'http://mall3.co.kr'; //3
const TARGET_URL4 = 'http://mall4.co.kr'; //4
const TARGET_URL5 = 'http://mall5.co.kr'; //5
const TARGET_URL6 = 'http://mall6.co.kr'; //6
const TARGET_URL7 = 'http://mall7.co.kr'; //7
const TARGET_URL8 = 'http://mall8.co.kr'; //8
const TARGET_URL9 = 'http://mall9.co.kr'; //9
const TARGET_URL10 = 'http://mall10.co.kr'; //10

// MAin
parseImg(TARGET_URL1, 0)

// Function
function parseImg(url, level) {
    var savepath = './testImg';
    client.fetch(url, {}, function(err, $, res) {
        $('a').each(function(idx) {
            // get <a> tag link
            let ahref = $(this).attr('href');
            ahref = url + ahref;
            let imgName = $(this).attr('name');
            let relativeLinks = $(this).children('img');
            relativeLinks.each( function() {
                var imgLink = $(this).attr('src');
                var regex = eval("/(co.kr|com)/");
                if (regex.test(imgLink)) {
                    var link = 'http:' + imgLink;
                    href = URL.resolve(url, link);
                    if (href.match(/google|font|facebook|git/g) !== null) return;
                    let savepath = href.split('/').slice(2).join('/');
                    checkSaveDir(savepath);
                    console.log(savepath);
                    request(href).pipe(fs.createWriteStream(savepath));
                    // 이미지, 링크, 이름 다 DB에 저장
                }
            });
        });
    });
};

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
