https://mathiasbynens.be/notes/shapes-ics

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
