## 코딩 질문:
* 질문: foo의 값은 무엇인가요?
```javascript
var foo = 10 + '20';
```
* 질문: 아래 코드의 결과값은 무엇인가요?
```javascript
console.log(0.1 + 0.2 == 0.3);
```
* 질문: 아래 코드가 동작하게 하기 위해선 어떻게 해야할까요?
```javascript
add(2, 5); // 7
add(2)(5); // 7
```
* 질문: 아래 구문의 반환값은 무엇인가요?
```javascript
"i'm a lasagna hog".split("").reverse().join("");
```
* Question: What is the value of window.foo? 질문: window.foo의 값은 무엇인가요?
```javascript
( window.foo || ( window.foo = "bar" ) );
```
* 질문: 아래 두 alert의 결과값은 무엇인가요?
```javascript
var foo = "Hello";
(function() {
  var bar = " World";
  alert(foo + bar);
})();
alert(foo + bar);
```
* 질문: foo.length의 값은 무엇인가요
```javascript
var foo = [];
foo.push(1);
foo.push(2);
```
* 질문: foo.x의 값은 무엇인가요?
```javascript
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```
* 질문: 아래 코드의 출력값은 무엇인가요?
```javascript
console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
console.log('three');
```



===================================================

```javascript
'use strict';
function test1() {
    var a = 1 + '2';
     console.log(a); // 12

    var b = '2' + 1;
    console.log(b); 22

    var c = 3 + 'a' + 2;
    console.log(c); // 3a2
}

function test2() {
    console.log(0.1 + 0.2 == 0.3); // false
    let num = 0.1 + 0.2;
    console.log(num.toFixed(1) == 0.3); // true
    console.log(1 + 2 == 3); // true
    console.log(0.1 + 0.2); // 0.300000000000000004
}

function test3() {
    let add = function (a, b) {
        return a + b;
    }
    console.log(add(2, 5)); // 7

    var add2 = function(x) {
        return function(y) { return x + y; };
    }
    console.log(add2(2)(5)); // 7

    var add3 = function(x) {
        return function(x) {return x + x};
    }
    console.log(add3(2)(5)); // 10
}

function test4() {
    return "i'm a lasagna hog".split("").reverse().join("");
    // goh angasal a m'i
}

function test5() {
    var foo = "Hello";
    (function() {
      var bar = " World";
      console.log(foo + bar);
    })();
    //console.log(foo + bar); // bar is not defined
}

function test6() {
    var foo = [];
    foo.push(1);
    foo.push(2);
    console.log(foo); // [1, 2]
    console.log(foo.length); // 2
}

function test7() {
    let foo = {n: 1};
    let bar = foo;
    foo.x = foo = {n: 2};
    console.log(foo); // {n:2}
    console.log(foo.x); // undefined
    console.log(bar); // {n:1, x:{n:1}}
}

function test8() {
    console.log('one');
    setTimeout(function() {
        console.log('two');
    }, 0);
    console.log('three');

    // one thre tow
}


```
