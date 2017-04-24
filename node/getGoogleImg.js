'use strict'

let Scraper = require ('images-scraper')
  , google = new Scraper.Google();

google.list({
    keyword: 'cafe24',
    num: 10,
    detail: true,
    nightmare: {
        show: true
    }
})
.then(function (res) {
    console.log('first 10 results from google', res);
}).catch(function(err) {
    console.log('err', err);
});

// you can also watch on events
google.on('result', function (item) {
    console.log('out', item);
});
