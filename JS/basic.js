'use strict'

var a = 10;
var b;
var c = "hello";
var d = true;
var e = "";
var f = null;
var aArr = [];
var oObj = {
	name : "haha",
	age : "bb",
	height : 180
};

// object
console.log(b); // undefined
console.log(e); // 
console.log(f); // null
console.log(oObj.name); // haha
console.log(oObj["age"]); // bb

// type 
console.log(typeof(a)) // number
console.log(typeof(b)) // undefined
console.log(typeof(c)) // string
console.log(typeof(d)) // boolean
console.log(typeof(e)) // string
console.log(typeof(f)) // object
console.log(typeof(aArr)) // object
console.log(typeof(oObj)) // object

var num=1;
console.log(num);
console.log(num++);
console.log(num);

var num2=1;
console.log(num2);
console.log(++num2);
console.log(num2);

console.log(Math.pow(2,3));
console.log(Math.sqrt(16));
console.log(Math.random());



