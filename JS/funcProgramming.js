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


// 응용형 함수 (고차함수)
var users = [
	{id : 1, name : 'person1', age: 36 },
	{id : 2, name : 'person2', age: 26 },
	{id : 3, name : 'person3', age: 16 },
	{id : 4, name : 'person4', age: 6 },
	{id : 5, name : 'person5', age: 45 },
	{id : 6, name : 'person6', age: 36 },
	{id : 7, name : 'person7', age: 26 },
	{id : 8, name : 'person8', age: 16 },
	{id : 9, name : 'person9', age: 56 },
	{id : 10, name : 'person10', age: 38 }
];

function _filter(users, predi) {
	var new_list = [];
	for (var i = 0 ; i < users.length; i++) {
		if (predi(users[i])) {
			new_list.push(users[i]);
		}
	}
	return new_list;
}

var ageCheck = function(user) {
	return user.age >= 30
};

console.log(
	_filter(users, ageCheck)
);
