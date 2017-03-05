'use strict'

let bayes = require('bayes');
let mecab = require('./mecab-mod.js');

let t_jang = '장영실은 조선 전기의 관료자이며';
let t_lee = '이순신은 조선 중기의 무신이다';

let classifier = bayes({
        tokenizer: function (text) {return mecab.parse(text);}
});

classifier.learn(t_jang, '장영실');
classifier.learn(t_lee, '이순신');

categorize('관료자');
categorize('무신');

function categorize(text) {
        let r = classifier.categorize(text);
        console.log('카테고리=[' + r + '] - ' + text);
}
