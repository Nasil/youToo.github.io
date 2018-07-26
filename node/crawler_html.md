# Web crawler & Download web-page 

```
'use strict';

const Crawler = require("crawler");
const fs = require("fs");

let crawler = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

crawler.queue({
   uri: 'https://test.html?board_no=5&category_no=9&cate_no=9&page=1&category_no=9',
   filename: 'test1.html',
   encoding: null,
   jQuery: false
});

crawler.queue({
   uri: 'https://test.html?board_no=5&category_no=9&cate_no=9&page=2&category_no=9',
   filename: 'test2.html',
   encoding: null,
   jQuery: false
});
```
