# Apach VS Nginx
- Apache 서버는 요청 하나 당 프로세스(또는 쓰레드)가 처리하는 구조
- Nginx는 프로그램의 흐름이 이벤트에 의해 결정이 되는 Event Driven 방식의 웹 서버입니다.

출처: http://victorydntmd.tistory.com/231 [victolee]

# NGINX 재시작
- 아래 4가지 하나 실행하면 됨

```
/etc/init.d/nginx restart
```
```
/etc/init.d/nginx reload
```
```
service nginx restart
```
```
service nginx reload
```
