'use strict'

let Scraper = require("image-scraper");

// DO it
// Get Shoppingmall image
let scraper = new Scraper('http://www.dabagirl.co.kr/product/list.html?cate_no=67');
scraper.scrape(function(image) {
    console.log(image);
});

