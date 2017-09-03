'use strict'

// 순수 함수
function addObj(obj, b) {
	return {var : obj.val + b};
}

var oObj = {val:10};
console.log(oObj);
console.log(addObj(oObj, 2));
console.log(oObj);

// 일급 함수 
function add_maker(a) {
	return function(b) {
		return a + b;
	}
}

var add10 = add_maker(10);
console.log(add10(20));
