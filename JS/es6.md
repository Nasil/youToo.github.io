# History
- 자바스크립트는 1995년 넷스케이프(Netscape) 웹 브라우져에서 웹페이지에 동적인 요소를 구현하기 위해서 발명 되었습니다.
- 브라우저마다 다른 문법을 지원하고 있었고 이것을 통일시키기가 어려웠습니다 (그래서 jquery를 사용을 많이 했었음)
- 다양한 웹 브라우져에서 자바스크립트(Javascript)가 공통되게 잘 작동하기 위해서 표준 규격이 필요해졌는데, 이 때문에, ECMA 국제 기구에서 “ECMAScript Standard”라 불리는 스크립트 표준이 만들어지게 되었습니다.
- ECMAS 를 es라 줄여서 말하고 es5는 2009년에 es6는 2015년에 만들어졌습니다.

# ECMAScript ? 
- 우리가 친숙하게 사용하고 있는 자바스크립트는 ECMAScript + BOM(Browser Object Model) + DOM(Document Object Model)라는 1개의 코어와 2개의 모델로 이루어져있습니다.
- ECMAScript는 자바 스크립트를 이루는 코어(Core) 스크립트 언어로, 웹 환경에서만 호스트 되는 언어가 아닙니다. 
- 웹 환경은 ECMA 스크립트가 호스트되는 환경들 중 하나일 뿐입니다다. 
- ECMA 스크립트 호스트 환경은 ECMA 스크립트 실행 환경이 구현되있고, 각각 그 환경에 알맞는 확장성을 가지고 있습니다. 
- 예를들어 웹 브라우져 환경에서는 BOM(Browser Object Model)과 DOM(Document Object Model) 입니다. 이러한 확장성들은 ECMA 스크립트의 문법과 기능에 맞춰 기능의 확장을 가능게 합니다.

# ES6 왜 써야하는가?
- 앞으로도 쭉 웹 표준을 지켜서 브라우저들이 자바스크립트를 지원하고 있습니다.
```
ES6 호환성 테이블(ECMAScript 6 compatibility table)(2018년 3월 기준)에서는 
최신 데스크톱 브라우저와 모바일 브라우저의 ES6 지원율이 90% 이상이다. 
이는 사용자가 업데이트하지 않아도 자동으로 업데이트되는 
브라우저('에버그린 브라우저'라고 부른다)의 사용자를 대상으로 개발할 때는 
별도의 트랜스파일 과정이 필요 없음을 의미한다
IE8에서는 ES3 스펙을 준수한 거고, IE9에서는 ES5 스펙을 준수하였다.
```
- jquery와 같은 무거운 프레임워크 없이 자바스크립트 만으로 개발을 할 수 있을것입니다. jquery와 같이 편한 기능들을 es에 담고 개발자들의 요구사항들을 받아들여 발전해가고 있습니다.

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

### ES3 (1999)
- 대중적으로 알고있는 그냥 자바스크립트라고 보면 된다. 
- 함수 단위의 스코프, 호이스팅, 클로저, 프로토타입 등… 우리가 익히 알고있는 자바스크립트의 기본적인 특징들을 갖고있다. 
- 대부분의 브라우저에서 지원하며, IE8까지 크로스브라우징을 지원하는 환경이라면 ES3을 쓰고 있다고 보면 된다.

### ES5 (2009)
- ES4는 너무 시대의 흐름을 앞서갔는지 거절되고, 그 후에 점진적인 개선을 목표로 ES5가 나왔다고 한다. 아무리 그래도 10년만에 버전업이라니 너무한것 같지만 편리한 기능이 추가되었다.
- 배열 배열과 관련하여 편리한 메소드들이 다수 생겼다. forEach, map, reduce, filter, some, every와 같은 순환 메소드들이 생겼다. 이 메소드들은 개발 시 불필요한 중복 코드를 줄여주어서 가독성은 높이고 버그율은 낮추는 효과가 있다.
- 객체 객체는 프로퍼티에 대한 설정을 할 수 있게 되었다. 객체를 생성, 수정, 복사하는 표준 메소드 Object.Create(), Object.defineProperty(), Object.freeze(), Object.assign() 등 과 getter, setter 등이 추가되었으며, Object.keys() 메소드를 이용하면 for in 메소드도 대체할 수 있게 되었다.
- strict 모드 문법을 좀 더 깐깐하게 체크하는 모드이다. 너무 자유분방하였던 기존 ES를 안전하고, 개발자가 인지할 수 있는 범위 안에서 개발할 수 있도록 사용하기 위해 등장했다. http://beomy.tistory.com/13
- bind() 메소드 this를 강제로 바인딩 시켜주는 메소드이다. 좀 더 명확하게 this 스코프를 지정 할 수 있게 되었다.

### ES6 (ES2015)
ES6보다 ES2015라고 많이 불리우며, ES6 Harmony라고도 불리운다고 한다. ES2015에서 다음과 같은 문제점들이 해결되었다.
- 호이스팅이 사라진 것 같은 효과
- 함수 단위 스코프에서 블록 단위 스코프로 변경
- this를 동적으로 바인딩하지 않는 화살표 함수
- 모듈화 지원
- 콜백 지옥에서 구원해줄 Promise
- Default, Rest 파라미터
- 해체 할당, Spread 연산자
- 템플릿 리터럴
- 이 외에도 추가된점이 너무 많아서 이부분에서 사람들이 진입장벽을 느끼는 것 같다. 브라우저(특히 MS 계열)에서 지원해주지 않는 경우가 많아 바벨(Babel)이라는 트랜스파일러를 써야하는데 이 바벨은 웹브라우저가 아닌 Node.js 위에서 돌아가고… Node.js를 설치하려면 NPM을 알아야하고… 또 모듈화를 사용하려면 웹팩(WebPack)같은 모듈 번들러를 알아야하고… 이런 다양한 장벽 때문에 사람들이 ES2015를 쉽게 접근하지 못하는 경향이 있는 것 같다. 하지만 우리는 언제나처럼 도전할 것이다!

# 주요 포인트
### 함수단위 vs 블록 단위의 스코프
- ES5는 함수 단위의 스코프이고, ES6는 블록 단위의 스코프 이다.


### let, var 추가
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


#### 참고
- http://sanghaklee.tistory.com/54 [이상학의 개발블로그]
- https://blog.perfectacle.com/2016/11/10/es6-scope/#TDZ
