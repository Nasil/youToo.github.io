# javascript promise
https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

- Promise 함수
```js
function getData() {
  return new Promise(function (resolve, reject) {
    $.get('url 주소/products/1', function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// Fulfilled 또는 Rejected의 결과 값 출력
getData().then(function (data) {
  console.log(data); // response 값 출력
}).catch(function (err) {
  console.error(err); // Error 출력
});
```

- Promis 체인
```js
getData(userInfo)
  .then(parseValue)
  .then(auth)
  .then(diaplay);
  
var userInfo = {
  id: 'test@abc.com',
  pw: '****'
};

function parseValue() {
  return new Promise({
    // ...
  });
}
function auth() {
  return new Promise({
    // ...
  });
}
function display() {
  return new Promise({
    // ...
  });
}

```

- Primis 에러 처리
```js
// catch()로 오류를 감지하는 코드
function getData() {
  return new Promise(function (resolve, reject) {
    resolve('hi');
  });
}

getData().then(function (result) {
  console.log(result); // hi
  throw new Error("Error in then()");
}).catch(function (err) {
  console.log('then error : ', err); // then error :  Error: Error in then()
});
```


Asynchronous stack traces: why await beats .then()

- promises를 직접 사용하는 것과 비교할 때 비동기식으로 개발자가 코드를 읽을 수있을뿐만 아니라 JavaScript 엔진에서도 흥미로운 최적화가 가능합니다! 
- 이 업적은 비동기 코드에 대한 스택 추적을 포함하는 최적화 중 하나입니다.
- await과 vanilla promises의 근본적인 차이점은 await X ()가 현재 함수의 실행을 일시 중단하는 반면 promise.then (X)는 콜백 체인에 X 호출을 추가 한 후에 현재 함수를 계속 실행한다는 것입니다. 스택 트레이스와 관련해서는이 차이가 매우 중요합니다.
- promise chain (desugared 또는 not)이 어느 지점에서 처리되지 않은 예외를 throw하면 JavaScript 엔진은 오류 메시지와 유용한 스택 추적을 표시합니다. - 개발자라면 vanilla promises을 사용하든 비동기 및 약속을 사용하든 관계없이이 기능을 기대할 수 있습니다.

# vanilla promises
- 비동기 함수 b에 대한 호출이 해결 될 때 함수 c가 호출되는 시나리오를 상상해보십시오.
```javascript
const a = () => {
	b().then(() => c());
};
```
- a가 호출되면 다음과 같이 동 기적으로 발생합니다.
```
b가 호출되고 미래의 어느 시점에서 해결 될 약속을 반환합니다.
.then 콜백 (실제로는 c ()를 호출)은 콜백 체인에 추가됩니다 (또는 V8에서 [...]가 해결 핸들러로 추가됨).
```
- 그런 다음, 함수 a의 본문에서 코드를 실행했습니다. 
- a는 결코 일시 중지되지 않으며 b에 대한 비동기 호출이 해결 될 때까지 컨텍스트가 사라집니다. 
- b (또는 c)가 비동기 적으로 예외를 throw하면 어떻게되는지 상상해보십시오. 
- 스택 추적에는 a가 포함되어야합니다. b (또는 c)가 호출 된 곳이기 때문입니다. 
- 이제 우리는 더 이상 참조가 없다는 것이 어떻게 가능합니까?
- 자바 스크립트 엔진을 작동 시키려면 위의 단계 외에 뭔가를해야합니다. 
- 스택 추적을 캡처하여 잠시 동안 저장합니다. 
- V8에서 스택 추적은 b가 반환하는 약속에 첨부됩니다. 
- promises가 이루어지면 스택 추적이 전달되어 c가 필요에 따라 사용할 수있게됩니다.
- 스택 트레이스 캡처에는 시간이 걸립니다 (즉, 성능이 저하됩니다). 이러한 스택 트레이스를 저장하려면 메모리가 필요합니다. 🐌

# async/await
- async / await를 사용하여 작성된 동일한 프로그램이 있습니다.
```javascript
const a = async () => {
	await b();
	c();
};
```
- 기다리는 동안 현재 스택 추적을 저장할 필요가 없습니다. 
- b에서 a로 포인터를 저장하는 것으로 충분합니다. 
- b를 실행하는 동안 a가 일시 중단되므로 해당 컨텍스트를 계속 사용할 수 있습니다. 
- b가 예외를 throw하면 스택 추적은 이러한 포인터를 탐색하여 요청시 재구성 될 수 있습니다. 
- c가 예외를 던지면 스택 트레이스는 동기 함수와 마찬가지로 구성 될 수 있습니다. 
- 왜냐하면 우리는 여전히 그 시간 내에 있기 때문입니다. 
- 어느 쪽이든 스택 추적 캡처는 더 이상 필요하지 않습니다. 대신 스택 추적은 필요한 경우에만 구성됩니다. 
- 포인터를 저장하는 것은 전체 스택 추적을 저장하는 것보다 적은 메모리를 필요로합니다. 🚀👍

# 권장사항
- 겉보기에는 "just syntax sugar"인 대부분의 ECMAScript 기능과 마찬가지로 async / await는 그 이상입니다.
- 다음 권장 사항을 따르면 JavaScript 엔진을 사용하여보다 효율적이고 메모리 효율적인 방식으로 스택 추적을 처리 할 수 있습니다.
- async / desugared 약속을 기다립니다.
- babel-preset-env를 사용하면 불필요한 비동기 / 기다리기를 피할 수 있습니다.
- V8은 아직이 최적화를 구현하지 않지만이 권고를 따르면 우리 (또는 다른 자바 스크립트 엔진)가 수행 할 때 최적의 성능을 보장합니다.
- 일반적으로 절대 필요하지 않는 한 코드를 번역하지 마십시오! 
- 예를 들어, 서비스 작업자를 지원하는 모든 최신 브라우저는 비동기 / 대기를 지원합니다. 
- 결과적으로 서비스 종사자 별 코드를 바닐라 약속으로 변경할 필요가 없습니다. 
- ES 모듈을 지원하는 브라우저에도 동일한 인수가 적용됩니다. 

번역 : https://mathiasbynens.be/notes/async-stack-traces
참고 : https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
