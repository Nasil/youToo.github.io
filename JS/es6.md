## ES6?


# 왜 써야하는가?

### History
- 자바스크립트는 1995년 넷스케이프(Netscape) 웹 브라우져에서 웹페이지에 동적인 요소를 구현하기 위해서 발명 되었습니다.
- 브라우저마다 다른 문법을 지원하고 있었고 이것을 통일시키기가 어려웠습니다 (그래서 jquery를 사용을 많이 했었음)
- 다양한 웹 브라우져에서 자바스크립트(Javascript)가 공통되게 잘 작동하기 위해서 표준 규격이 필요해졌는데, 이 때문에, ECMA 국제 기구에서 “ECMAScript Standard”라 불리는 스크립트 표준이 만들어지게 되었습니다.
- ECMAS 를 es라 줄여서 말하고 es5는 2009년에 es6는 2015년에 만들어졌습니다.
- ECMAScript는 자바 스크립트를 이루는 코어(Core) 스크립트 언어로, 웹 환경에서만 호스트 되는 언어가 아닙니다
- 웹 환경은 ECMA 스크립트가 호스트되는 환경들 중 하나일 뿐이다. ECMA 스크립트 호스트 환경은 ECMA 스크립트 실행 환경이 구현되있고, 각각 그 환경에 알맞는 확장성을 가지고 있다. 예를들어 웹 브라우져 환경에서는 BOM(Browser Object Model)과 DOM(Document Object Model) 입니다. 이러한 확장성들은 ECMA 스크립트의 문법과 기능에 맞춰 기능의 확장을 가능게 합니다.
- 앞으로도 쭉 웹 표준을 지켜서 브라우저들이 자바스크립트를 지원하고 있습니다
- es6가 호환되지 않는 문법은 babel 이라는 트랜스파일러(혹은 컴파일러)가 브라우저가 해석할수 있도록 변환을 해주는 기술이 나왔습니다.
```
ES6 호환성 테이블(ECMAScript 6 compatibility table)(2018년 3월 기준)에서는 최신 데스크톱 브라우저와 모바일 브라우저의 ES6 지원율이 90% 이상이다. 이는 사용자가 업데이트하지 않아도 자동으로 업데이트되는 브라우저('에버그린 브라우저'라고 부른다)의 사용자를 대상으로 개발할 때는 별도의 트랜스파일 과정이 필요 없음을 의미한다
```
- jquery와 같은 무거운 프레임워크 없이 자바스크립트 만으로 개발을 할 수 있을것입니다. jquery와 같이 편한 기능들을 es에 담고 개발자들의 요구사항들을 받아들여 발전해가고 있습니다. (Promise, Arrows ... )

# JavaScript Engines
```
V8 - Google, Opera
Rhino - Mozilla
JavascriptCore - Safari
```
### Engine vs Runtime
- Engine: Javascript Engine은 JavaScript로 작성된 코드를 해석하고 실행하는 인터프리터 이다. 구문 분석 및 JIT 컴파일
- Runtime : 실행 중 프로그램에서 사용할 수 있는 기본 라이브러리를 제공 (브라우저에서는 window 객체를 지원, 노드JS에서는 global 객체를 지원)

### Beautiful Code?
- Short, Simple, Small and Stupid 
- 아름다운 코드는 짧고 간결해야 한다. (함수형 프로그래밍에 빠진 이유) 
- 함수는 최대한 독립적으로 만들어서 책임 범위를 작게 하고 관심사를 분리해야 한다. 
- 하지만, 이런 코딩은 정말 어렵다…



# 달라진 문법은?

1. use strict
- strict 모드는 ES5(ECMA Script 5)에 추가된 키워드입니다. 
- strict 모드는 자바스크립트가 묵인했던 에러들의 에러 메시지를 발생시킵니다. 엄격하게 문법 검사를 하겠다.. 로 이해하면 될 것 같습니다.
- http://beomy.tistory.com/13


2. let, var 추가
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


# 참고
- 출처: http://sanghaklee.tistory.com/54 [이상학의 개발블로그]
