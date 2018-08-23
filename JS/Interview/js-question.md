## JS
## 1. event delegation?
- 이벤트위임 (event delegation) 은 각 자식요소에 핸들러를 반인딩 하는 대신 하나의 부모 요소에 이벤트 핸들러를 반인딩하는 방법입니다.
- Dom 트리에 자식 요소를 추가하더라도 이벤트 처리는 부모 요소에 위임 되었기 때문에 새로운 핸들러를 다시 반인딩할 필요가 없습니다.
```html
<!DOCTYPE html>
<html>
<body>
  <ul id="parent-list">
    <li id="post-1">Item 1</li>
    <li id="post-2">Item 2</li>
    <li id="post-3">Item 3</li>
    <li id="post-4">Item 4</li>
    <li id="post-5">Item 5</li>
    <li id="post-6">Item 6</li>
  </ul>
  <div id="msg">
  <script>
    var msg = document.getElementById('msg');

    document.getElementById('parent-list').addEventListener('click', function (e) {
      console.log('[target]: ' + e.target);
      console.log('[target.nodeName]: ' + e.target.nodeName);

      // li 요소 이외의 요소에서 발생한 이벤트는 대응하지 않는다.
      if (e.target && e.target.nodeName == 'LI') {
        msg.innerHTML = 'li#' + e.target.id + ' was clicked!';
      }
    });
  </script>
</body>
</html>
```
- 브라우저는 단일 쓰레드(single-thread)에서 이벤트 드리븐(event-driven) 방식으로 동작한다.
- 단일 쓰레드는 쓰레드가 하나뿐이라는 의미이며 이말은 곧 하나의 작업(task)만을 처리할 수 있다는 것을 의미한다.
- 하지만 실제로 동작하는 웹 애플리케이션은 많은 task가 동시에 처리되는 것처럼 느껴진다.
- 이처럼 자바스크립트의 동시성(Concurrency)을 지원하는 것이 바로 이벤트 루프(Event Loop)이다.
- Call stack : 작업이 요청되면 요청된 작업은 순차 적으로 call stack 에 쌓이고 실행된다. 자바스크립트는 단 하나의 call stack 을 처리한다. (single thread 임)
- Heap : 동적으로 생성된 객체 인스텀스가 할당되는 영역
- Event Queue : 비동기 처리 함수가 보관 되는 영역으로 이벤트 루프에 의해 특정시점 (call stack이 비어있을때) 순차적으로 call stack으로 이동되어 진다.
- Event Loop : 브라우저 (혹은 Node.js) 가 처리  call stack 내에서 현재 실행중인 task가 있는지 그리고 Event Queue에 task가 있는지 반복 확인 한다. 만약 call stack이 비어 있다면 Event Queue 내의 task가 call stack 으로 이동하고 실행 시킨다.
- 자바스크립트 엔진 영역 : call stack, Heap
- 브라우저, 노드 영역 : Event Loop, Event Queue
- 자바스크립트 엔진은 단순히 작업이 요청되면 Call Stack을 사용하여 요청된 작업을 순차적으로 실행할 뿐이다.
- 동시성(Concurrency)을 지원하기 위해 필요한 비동기 요청(이벤트를 포함) 처리는 자바스크립트 엔진을 구동하는 환경 즉 브라우저(또는 Node.js)가 담당한다.

## 2. event bubbling ?
## 3. this는 JavaScript에서 어떻게 작동하는지 설명해주세요.
## 4. prototype 기반 상속은 어떻게 하는지 설명해주세요.
## 5. AMD와 CommonJS는 무엇이고, 이것들에 대해 어떻게 생각하시나요?
- https://d2.naver.com/helloworld/12864
## 6. null과 unedefined 그리고 undeclared의 차이점은 무엇인가요?
## 7. 두개를 구분하기 위해서는 어떻게 하면 될까요?
## 8. 익명함수(anonymous functions)는 주로 어떤 상황에서 사용하나요?
## 9. 당신의 코드를 어떻게 구성하는지? (모듈 패턴, 전통적 상속)
## 10. 호스트 객체(Host Objects)와 네이티브 객체(Native Objects)의 차이점은 무엇인가요?
## 11. 다음 코드의 차이점은 무엇인가요?
```
function Person(){} var person = Person() var person = new Person()
```
## 12. .call과 .apply의 차이점은 무엇인가요?
## 13. Function.prototype.bind을 설명하세요.
## 14. document.write()는 언제 사용하나요?
## 15. UA 문자열을 이용하여 기능 검출(feature detection)과 기능 추론(feature inference)의 차이점을 설명하세요.
## 16. AJAX에 관해 가능한 한 자세히 설명하세요.
## 17. AJAX를 사용했을 때의 장단점에 대해 설명해주세요.
## 18. JSON이 어떻게 동작 되는지 설명하세요. (그리고 AJAX와 어떻게 다른지 설명하세요.)
## 19. 기존에 JavaScript 템플릿을 사용한 적이 있나요? 만약에 있다면, 어떠한 방식으로 사용했는지 말씀해주세요.
## 20. 이벤트 버블링(Event Bubbling)에 대해서 설명하세요.
## 21. "속성(Attribute)"와 "요소(property)"의 차이가 무엇인가요?
## 22. 내장된 JavaScript 객체를 확장하는 것이 좋지 않은 이유는 무엇인가요?
## 23. document load event와 DOMContentLoaded event의 차이점은 무엇인가요?
## 24. ==와 ===의 차이점은 무엇인가요?
## 25. JavaScript의 "동일출처정책(the same-origin policy)"에 대해서 설명하세요.
## 26. 다음 코드를 동작하게 만드세요.
```
duplicate([1,2,3,4,5]); // [1,2,3,4,5,1,2,3,4,5]
```
## 27. 삼항식(Ternary statement)을 사용하는 이유는 무엇이고, 그것을 표현하기 위한 연산자 단어는 무엇인가요?
## 28. use strict;은 무엇이고, 사용했을 때 장단점에 관해서 설명해주세요.
#### [user strict 란]
- Strict Mode는 ECMAScript5 버전에 있는 새로운 기능으로써, 당신의 프로그램 또는 함수를 엄격한 운용 콘텍스트 안에서 실행시킬 수 있게끔 합니다. 
#### [장점]
- 흔히 발생하는 코딩 실수를 잡아내서 예외를 발생시킵니다.
- 상대적으로 안전하지 않은 액션이 발생하는 것을 방지하거나 그럴 때 예외를 발생시킵니다. 예를 들자면 전역객체들에 접근하려 한다거나 하는 것들이겠지요.
- 혼란스럽거나 제대로 고려되지 않은 기능들을 비활성화시킵니다.
#### [단점]
IE 10이상에서만 가능합니다 
그러나 strict mode를 지금 당장 활성화 시켜야 한다는 것을 의미하고, 이전 브라우저에서는 최악의 경우에라도 아무런 부작용이 없습니다.
#### [참조]
https://johnresig.com/blog/ecmascript-5-strict-mode-json-and-more/

## 29. 100번 반복되는 반복문이 있습니다. 3의 배수일 때는 fizz, 5의 배수일 때는 buzz, 3과 5의 공배수일 때는 fizzbuzz가 출력되는 코드를 작성해보세요.
## 30. 전역 scope를 사용했을 때 장단점에 관해 설명해주세요.
## 31. 때때로 load event를 사용하는 이유에 관해 설명해주세요. 또 단점이 있다면 대안에 대해서도 설명해주세요.
## 32. SPA에서 SEO에 유리하도록 만들기 위한 방법에 대해 설명해주세요.
## 33. Promise를 사용해 본 경험이 있나요?
## 34. Promise가 콜백 대비 장/단점은 무엇인지 설명해주세요.
## 35. JavaScript의 작동방식의 장단점에 관해 설명해주세요.
## 36. JavaScript를 디버깅할 때 사용하는 도구가 있으면 설명해주세요.
## 37. 객체 안의 속성과 배열의 아이템을 순회할 때 사용하는 문법에 관해 설명해주세요.
## 38. mutable object와 immutable object에 관해 설명해주세요.
## 39. JavaScript에서 immutable 객체의 예를 들어보세요.
## 40. immutability의 장/단점은 무엇인가요?
- https://poiemaweb.com/js-immutability
## 41. 자신의 코드에서 불변성(immutability를) 어떻게 달성할 수 있나요?
## 42. 동기방식과 비동기 방식 함수의 차이에 관해서 설명해주세요.
## 43. event loop이란 무엇인가요?
## 44. call stack과 task queue에 관해 설명해주세요.
![Alt text](https://poiemaweb.com/img/event-loop.png)

## 45. 클로져(Closure)는 무엇이며, 어떻게/왜 사용하는지 설명해주세요.

## 46. 클로져를 만들 때 선호하는 패턴은 무엇인가요?

## 47. 다음 코드가 즉시 호출 함수 표현식(IIFE)로 동작하지 않는 이유에 관해서 설명해보세요:
```javascript
function foo(){ }();
```
 괄호가 빠져있습니다
```javascript
(function foo(){
     console.log("Hello JS")
 })();
```

## 48. IIFE(Immediately Invoked Function Expressions)로 만들기 위해서는 어떻게 해야 하나요?
```javascript
(foo = function(){
    }
) ();
```
```javascript
(showName = function (name) {
  console.log(name || "No Name")
  }
) (); // No Name
showName("Rich"); // Rich
showName(); // No Name
```
- 두 개의 괄호는 JS컴파일러에게 이 익명 함수를 바로 호출하라고 말합니다. 이것을 IIFE라고 부릅니다.
- IIFE를 사용하는 주된 이유는 변수를 전역(global scope)으로 선언하는 것을 피하기 위해서 입니다
- ES5 이하에서는 var 변수를 선언하면 전역변수가 되기 떄문에 전역을 오염시키지 않기 위해 사용되었으나
- ES6에서 제공하는 let, const 선언은 블록 단위의 지역변수이므로, 블록으로 묶어주기만 하면 IIFE패턴을 쓰지 않고도 전역을 오염시키지 않게 됩니다.
```javascript
// ES5
(function(){
    var a = 5;
})();

// ES6
{
    const a = 5;
    let b = 10;
}
```

## 49. function foo() {}와 var foo = function() {}에서 foo 의 차이가 무엇인지 설명해보세요.
- 첫번째는 함수 선언식이고 두번째는 함수 표현식으로 작성이 되었다.

## 50. 함수선언식 vs 함수표현식
- 함수 선언(declaration)은 미리 자바 스크립트의 실행 컨텍스트(execution context)에 로딩 되어 있으므로 언제든지 호출할 수 있지만, 표현식(Expression)은 인터프리터가 해당 라인에 도달 하였을때만 실행이 됩니다.
- 즉, 함수 선언을 조건에 따라 '할당'하거나 '생성' 또는 '괄호' 연산자로 그루핑하여 표현식으로 나타낼 수 있습니다.
- 함수 선언식은 호이스팅에 영향을 받지만, 함수 표현식은 호이스팅에 영향을 받지 않는다.
- 함수 표현식은 클로져로 사용되고 콜백으로 사용이 가능하다.
```javascript
foo(); // success!
// 함수 선언식
function foo() {
    alert('foo');
}

foo(); // "foo" is not defined.
// 함수 표현식 (함수 선언 할당)
var foo = function() {
    alert('foo');
};

// 함수 표현식 (함수 선언 괄호로 그루핑)
alert(foo); // "foo" is not defined.
(function foo () {});
alert(foo); // "foo" is not defined.
```

## 51. "호이스팅(Hoisting)"에 대해서 설명하세요.
 - 변수 범위 (Variable Scope) : JS는 함수 수준의 범위를 가지고 있습니다. 지역변수 > 전역변수 우선권을 가집니다.
 - 호이스팅 (Hoisting) :  변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것을 의미합니다.
호이스트 되었을때, 함수 선언은 변수선언을 덮어 씁니다.
```javascript
// 다음 두 변수와 함수는 myName으로 이름이 같습니다.
var myName; // string
function myName() {
     console.log("Rich");
}
// 함수 선언은 변수명을 덮어 씁니다.
console.log(typeof myName); // function
```
```javascript
// 하지만, 변수에 값이 할당될 경우에는 반대로 변수가 함수선언을 덮어 씁니다.
var myName = "Richard";
function myName() {
     console.log("Rich");
}
console.log(typeof myName); //string
```
- “strict mode”에서 최초의 선언없이 변수에 값을 할당하려 한다면 오류가 발생합니다

## 52. let, var, const의 차이점에 관해서 설명해주세요.
- var : function-scoped로 hoisting 된다.
```javascript
// 이미 만들어진 변수이름으로 재선언했는데 아무런 문제가 발생하지 않는다.
var a = 'test'
var a = 'test2'

// hoisting으로 인해 ReferenceError에러가 안난다.
c = 'test'
var c
```
- let, const : block-scoped 단위로 hoisting이 된다. ES5에서 생겨났다.
```javascript
// immutable 여부에 따라 let은 변수에 재할당이 가능하지만, const는 변수 재선언, 재할당 모두 불가능하다.
// let
let a = 'test'
let a = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
a = 'test3'     // 가능

// const
const b = 'test'
const b = 'test2' // Uncaught SyntaxError: Identifier 'a' has already been declared
b = 'test3'    // Uncaught TypeError:Assignment to constant variable.

// tdz(temporal dead zone)
// let은 값을 할당하기전에 변수가 선언 되어있어야 하는데 그렇지 않기 때문에 에러가 난다.
c = 'test' // ReferenceError: c is not defined
let c

// const 선언과 동시에 값을 할당 해야한다.
const aa // Missing initializer in const declaration
```
- var가 전역변수 혹은 var 없이 선언을 하면 Window 객체의 속성이 되지만, let 과 const 는 Window 객체의 속성이 
- javascript에 tdz가 필요한 이유는 동적언어이다 보니깐 runtime type check 가 필요해서이다.
- TDZ: 변수 선언(호이스팅에 의해 스코프 상단으로 끌어올려진 부분)부터 변수의 할당을 만나기 전 부분까지 형성이 되는 구간
---------------------------------------------------------------------------------------------
## 참고
- https://poiemaweb.com/js-event
- http://chanlee.github.io/2013/12/10/javascript-variable-scope-and-hoisting/
- https://github.com/airbnb/javascript
- https://www.sitepoint.com/optimization-auditing-a-deep-dive-into-chromes-dev-console/
