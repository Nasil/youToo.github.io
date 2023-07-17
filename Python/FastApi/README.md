# FastAPI?
- 데이터 타입을 엔드포인트로 명시하지 않아도 된다(알아서 알맞게 바꾸어 준다)
- Uvicorn ASGI Server 를 사용한다 (gunicorn (+Uvicorn))
- 파이썬은 프로세스 기반
- [ASGI Framework] FAST API - starlette - [ASGI Server] uvicorn - uvloop(cython) - libuv(cpp)
- 파이썬은 race condition 문제가 발생하는것을 방지하기 위해 GIL을 이용. 멀티쓰레드 환경을 정상적으로 지원 못함.
    - Race conditioin ? 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황에서 발생하는 문제.
    - GIL (Global Interpreter Lock) ? 여러개의 스레드가 파이썬 바이트코드를 한번에 하나만 사용할수 있게 락을 거는 것. 하나의 스레드만 파이썬 인터프리터를 제어할수 있는 뮤텍스라 보면됨.
- ASGI 서버와 프레임워크에서 비동기 처리가 가능한 이유 : GIL의 제약은 CPU-bound 작업에서만 크게 드러나며, I/O-bound 작업에는 비동기 프로그래밍을 통해 여러 작업을 병렬적으로 처리하는 것이 가능
- I/O-bound 작업의 예로는 HTTP 요청, 데이터베이스 쿼리, 파일 읽기/쓰기 등
- 즉, 파이썬의 GIL 때문에 동일한 시간에 여러 스레드가 CPU를 사용할 수는 없지만, 비동기 프로그래밍을 통해 I/O-bound 작업들이 병렬적으로 실행될 수 있도록 하는 것은 가능

- 실행
```
uvicorn main:app --reload
```
