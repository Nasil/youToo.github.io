
## Memory check
process.memoryUsage () 메소드는 Node.js 프로세스의 메모리 사용량을 바이트 단위로 설명하는 객체를 반환합니다.

```
console.log(process.memoryUsage());

//Dictionary 불러오기전
{ rss: 38039552,
heapTotal: 15192064,
heapUsed: 6823276,
external: 400428 }

//Dictionary 불러온 후
{ rss: 38039552,
heapTotal: 15192064,
heapUsed: 6825100,
external: 400428 }

//heapUsed : 1824 byte

```

- heapTotal 및 heapUsed는 V8의 메모리 사용량을 나타냅니다.
- external : V8에서 관리하는 JavaScript 객체에 바인딩 된 C ++ 객체의 메모리 사용량을 나타냅니다.
- rss, Resident Set Size : 힙, 코드 세그먼트 및 스택을 포함하는 프로세스의 주 메모리 장치 (총 할당 된 메모리의 하위 집합)에있는 공간의 양입니다.
