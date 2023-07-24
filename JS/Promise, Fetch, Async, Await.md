# Promise
- Promise 는 JavaScript의 비동기 처리에 사용되는 객체로써 비동기로 처리되는 결과를 동기처럼 반환한다. 
- 실제로 동기처럼 처리되는 것이 아니라 미래의 데이터 처리가 완료된 시점에 결과를 제공하겠다는 ‘약속(프로미스)’를 반환한다.
```js
function getData() {
    return new Promise((resolve, reject) => {
	    // 비동기작업
      fetch('데이터url', (response) => {
        resolve(response)
      })
    })
  }

 getData()
 .then(data => {
    console.log(data)
  })
.catch(err => {
    console.log(err)
  })
```

# Fetch
- Fetch는 JavaScript 내장 API로 비동기 통신 네트워크를 가능하게 하는 기술이다. 
- jQuery.ajax()와도 비슷하지만 요즘 jQuery를 잘 안 쓰는 추세이므로, Fetch가 훨씬 많이 쓰이는 것 같다.
- 위의 Promise 예제처럼 new Promise 객체를 만들기보다 아래 예제와 같이 사용되는 사례가 많다. fetch 함수는 url로 요청을 보낸 결과로 Promise 객체를 반환한다.
- Fetch로 반환되는 Promise 객체는 error를 reject 하지 않는다. 대신 ok 상태가 false인 resolve가 반환된다. 그러므로 reject를 이용하지 않고, 별도로 에러처리를 해주어야 한다.
- Fetch는 쿠키를 보내거나 받지 않는다. 쿠키를 전송하기 위해서는 자격증명(credentials) 옵션을 설정해주어야 한다.
```js
fetch('데이터url')
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
```
 

# Async Await
```js
async function callAsync() {
    const data = await fetch('데이터url');

    if(data.id === 1) {
      console.log(data.name);
    }
  }
```
```js
async function callAsync() {
    try{
      const data = await fetch('데이터url');

      if(data.id === 1) {
        console.log(data.name);
      }
    } catch (err) {
      console.log(err)
    }
  }



```


# 비교
1. Promise 객체는 비동기 작업의 결과로 메소드 체이닝을 통해 then() / catch()를 이어붙여서 콜백함수를 대신할 수 있다.
2. async & await은 아예 비동기 작업을 동기적인 것처럼 만들어서 콜백함수 대신 동기적으로 코드를 작성할 수 있다.
3. 상황에 따라 맞는 방법을 택하자.


참조 ) https://babycoder05.tistory.com/entry/Promise-Fetch-Async-Await-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90

