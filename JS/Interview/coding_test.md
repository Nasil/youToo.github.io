## 코딩 질문:
* 질문: foo의 값은 무엇인가요?
```
var foo = 10 + '20';
```
* 질문: 아래 코드의 결과값은 무엇인가요?
```
console.log(0.1 + 0.2 == 0.3);
```
* 질문: 아래 코드가 동작하게 하기 위해선 어떻게 해야할까요?
```
add(2, 5); // 7
add(2)(5); // 7
```
* 질문: 아래 구문의 반환값은 무엇인가요?
```
"i'm a lasagna hog".split("").reverse().join("");
```
* Question: What is the value of window.foo? 질문: window.foo의 값은 무엇인가요?
```
( window.foo || ( window.foo = "bar" ) );
```
* 질문: 아래 두 alert의 결과값은 무엇인가요?
```
var foo = "Hello";
(function() {
  var bar = " World";
  alert(foo + bar);
})();
alert(foo + bar);
```
* 질문: foo.length의 값은 무엇인가요
```
var foo = [];
foo.push(1);
foo.push(2);
```
* 질문: foo.x의 값은 무엇인가요?
```
var foo = {n: 1};
var bar = foo;
foo.x = foo = {n: 2};
```
* 질문: 아래 코드의 출력값은 무엇인가요?
```
console.log('one');
setTimeout(function() {
  console.log('two');
}, 0);
console.log('three');
```
