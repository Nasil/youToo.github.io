'use strict'

let Mecab = require('./mecab-mod.js');
let mecab = new Mecab();

let text = "아버지가방에들어가신다";
mecab.parse(text, function(items) {
    for (var i in items) {
        let k = items[i];
        if (k == "EOS") continue;
        console.log(k[0] + ":" + k[1]);
    }
});

// 한글 형태소 분석
// mandyui-MacBook-Pro:Documents hyeonnasil$ node mecab-mod-test.js 
// 아버지:NNG
// 가:JKS
// 방:NNG
// 에:JKB
// 들어가:VV
// 신다:EP+EC

