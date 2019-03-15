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



// 참고 : https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/
// 자바스크립트 이벤트 위임
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent);
});
function logEvent(event) {
	console.log(event.currentTarget.className); // 자식 노드로 부터 부모 노드 출력
}

// 자바스크립트 이벤트 캡처
var divs = document.querySelectorAll('div');
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});
function logEvent(event) {
	console.log(event.currentTarget.className); // 부모 노드부터 자식 노드로 출력
}

// stopPropagation 이벤트 위임
divs.forEach(function(div) {
	div.addEventListener('click', logEvent);
});
function logEvent(event) {
	event.stopPropagation();
	console.log(event.currentTarget.className); // 맨끝 자식 노드 하나만 나옴
}
// stopPropagation 이벤트 캡처
divs.forEach(function(div) {
	div.addEventListener('click', logEvent, {
		capture: true // default 값은 false입니다.
	});
});
function logEvent(event) {
	event.stopPropagation();
	console.log(event.currentTarget.className);  // 맨처음 부모 노드 하나만 나옴
}

// 자바스크립트 테스트 예제
var result = sum(1, 2);
var expected = 5;

if (result !== expected) {
	throw new Error(result + ' is not equal to ' + expected);
}

// 에러 함수
function test(title, testCode) {
  try {
    testCode();
  } catch (error) {
    console.error(error);
  }
}

function expect(result) {
  return {
    toBe: function(expected) {
      if (result !== expected) {
      	throw new Error(result + ' is not equal to ' + expected);
      }
    }
  }
}

test('sum(1, 2) is not equal 5', function() {
  expect(sum(1, 2)).toBe(5);
});
