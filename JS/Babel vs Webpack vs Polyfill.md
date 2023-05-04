## Babel
- ES6/7 코드를 ES5 코드로 Transpiling 해주는 Transpiler
- ES5 이전까지는 표준이 없었고, jquery 가 브라우저 호환성을 해결해줄 수 있기 때문에 필요 없었음
- Babel 은 스크립트 자체가 수정되어야 하는 상황으로 새로운 컴파일이 필요할 때 사용함 
- 자바스크립트 스펙으로 아직 확정되지 않은 Proposal 스펙이 5개의 Stage 로 구분되어 존재하는데, Babel 은 각각의 Stage 에 대해 Preset 을 제공함
아래의 Arrow Function (=>) 은 ES6 에서 추가된 함수 표현식으로, 화살표 표현식 (=>) 은 Javascript 의 Syntax 가 아니기 때문에 Javscript 가 읽을 수 있는 스크립트로 재 작성 되어 새로 컴파일 되어야 한다.


## Polyfill
- 새로 추가된 전역 객체들(Promise, Map, Set)을 사용가능한 객체로 바꾸어주는 개념 
- 브라우저 파편화를 해결하기 위해 지원하지 않는 공백을 매꾸는 스크립트나 기타 코드를 끼워넣어줌
Bable 과 Polyfill 은 구분되어야 하는 개념인데, Babel 이 Javascript 의 Syntax 가 아닌 것들을 Javascript 에서 사용할 수 있게 만들어 준다면, Polyfill 은 Javascript 의 Syntax 로 읽히지만 정의되어 있지 않은 객체들을 정의해주는 개념을 말한다.
예를들어 Promise 객체는 기존에 존재하지 않는 ES6 에서 추가된 객체로, ES6 이전에서 new Promise() 를 하는 경우 Javascript 의 Syntax 이지만 정의되지 않는 function 이라는 의미에서 'Promise is not a function' 의 결과를 보여준다. Polyfill 개념을 이용해 Promise 를 사용할 수 있도록 정의해주는 것을 Babel-Polyfill 이 해줄 수 있다.
