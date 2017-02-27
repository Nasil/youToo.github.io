'use strict'

let fs = require('fs');
let path = require('path');
let parseString = require('xml2js').parseString;

//xml
let xml = '<soap:Body> <ReviseItem> zozozo </ReviseItem> <ItemReturn> haha </ItemReturn> <Address> hello </Address>  </soap:Body>'

// xml to json
parseString(xml, {trim: true}, function (err, result) {
    if (err) {
        console.log(err.message);
        return;
    }
    let savepath = './xml/parse/test.txt';
    checkSaveDir(savepath);
    console.log(result);
    fs.writeFileSync(savepath, result);
});

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
