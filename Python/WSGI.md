# WSGI ? (web server gateway interface)
- 웹서버 (apache, nginx) 에 동적 요청이 발생하면 웹서버가 wsgi를 호출하고 wsgi 서버는 파이썬 프로그램을 호출하여 동적 페이지 요청을 대신 한다.

## WSGI 어플리케이션?
- 장고(Django), 플라스크(Flask) 등이 있음

## Gunicorn vs uWSGI
- 요새는 Gunicorn 도 빨라져서 많이 사용



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
