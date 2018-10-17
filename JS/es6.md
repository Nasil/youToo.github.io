## let, var, const의 차이점에 관해서 설명해주세요.
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
