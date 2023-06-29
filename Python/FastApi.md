# FastAPI?
- 데이터 타입을 엔드포인트로 명시하지 않아도 된다(알아서 알맞게 바꾸어 준다)
- Uvicorn ASGI Server 를 사용한다
- 파이썬은 프로세스 기반
- [ASGI Framework] FAST API - starlette - [ASGI Server] uvicorn - uvloop(cython) - libuv(cpp)
- 파이썬은 race condition 문제가 발생하는것을 방지하기 위해 GIL을 이용. 멀티쓰레드 환경을 정상적으로 지원 못함.
    - Race conditioin ? 여러 프로세스들이 동시에 공유 데이터를 접근하는 상황에서 발생하는 문제.
    - GIL (Global Interpreter Lock) ? 여러개의 스레드가 파이썬 바이트코드를 한번에 하나만 사용할수 있게 락을 거는 것. 하나의 스레드만 파이썬 인터프리터를 제어할수 있는 뮤텍스라 보면됨.
    - 파이썬은 특정 시점에 오직 하나의 스레드만 실행됨. 멀티 스레드 프로그램에서 멀티 스레드가 싱글 스레드처럼 동작하는 성능 병목 현상 발견. 


- 실행
```
uvicorn main:app --reload
```



## CGI(Common Gateway Interface)
- 요청 -> 웹서버(nginx, apache) -> CGI -> 프로그램 실행 (프로세스 생성)

## WAS(Web Application Server)
- 요청 -> WAS(tomcat) -> 프로그램 실행 (쓰레드 생성)

## WSGI(Web Server Gateway Interface)
- 요청 -> 웹서버(nginx, apache) -> WSGI -> WSGI 를 지원하는 웹 프레임워크(django, flask)
- WSGI 비동기 처리 힘듬

## ASGI(Asyncronous Server Gateway Interface)
- Asynchronous Server Gateway Interface의 약자
- 비동기 web server를 의미함
    - async / await 구문을 사용
