# 클로저란?
- 클로저는 독립적인 (자유)변수를 가리키는 함수이다. 또는, 클로저 안에 정의된 함수는 만들어진 환경을 ‘기억한다’.

- 클로저를 사용하여 외부에서 변수에 직접 접근하는 것을 제한할 수 있다.
- 클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않는다. 
- 따라서 클로저 사용이 끝나면 참조를 제거하는 것이 좋다.
```javascript
function hello(name) {
  var _name = name;
  return function() {
    console.log('Hello, ' + _name);
  };
}

var hello1 = hello('12');
var hello2 = hello('34');
var hello3 = hello('56');

hello1(); // 'Hello, 12'
hello2(); // 'Hello, 34'
hello3(); // 'Hello, 56'

// 여기서 메모리를 release 시키기 클로저의 참조를 제거해야 한다.
hello1 = null;
hello2 = null;
hello3 = null;
```

-중간에 IIFE(즉시실행함수)를 덧붙여 setTimeout()에 걸린 익명함수를 클로저로 만들었다. 
- 앞서 말한대로 클로저는 만들어진 환경을 기억한다. 
- 이 코드에서 i는 IIFE내에 j라는 형태로 주입되고, 클로저에 의해 각기 다른 환경속에 포함된다. 
- 반복문은 10회 반복되므로 10개의 환경이 생길 것이고, 10개의 서로 다른 환경에 10개의 서로 다른 j가 생긴다.
```javascript
var i;
for (i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 100);
  })(i);
}
```



## 참조
- https://hyunseob.github.io/2016/02/21/how-to-become-a-great-frontend-engineer/
