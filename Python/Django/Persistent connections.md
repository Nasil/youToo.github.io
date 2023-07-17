# Django 에서 Connection


### CONN_MAX_AGE
- 장고는 기본적으로 모든 요청 (Request) 마다 커넥션을 맺고 끊는다.
- 'CONN_MAX_AGE'을 설정하면 커넥션을 지정한 시간 동안 재활용 가능
- 기본값은 0 ( 모든 요청마다 컨넥션을 맺고 끊는 것)

### Thread를 사용시 DB Connection 이 관리되는 방식
- API 호출이 아닌 배치등의 로직으로 맺어진 connection은 관리가 되지 않을 수 있다.
- Django는 request가 종료될때, request_finished signal을 발생시켜 지난 DB Connection들을 모두 닫는다.
- 즉, Thread에서 만들어진 DB Connnecion은 Thread를 실행시킨 **메인 프로세스**가 종료될 때 닫힌다.
- Thread Pool을 사용하는 경우, Connection을 재사용한다. ( Thread 자체가 재사용된다. 그래서 Connection도 재사용된다.)
- Thread 하나의 Connection을 생성하기 때문에 만약 멀티스레드를 생성하여 db를 호출하는 경우 thread 개수만큼 커멘션 생성됨.
- 배치 프로세스가 종료되면 연결이 끊키지만 여러가지 이유로 connection이 idle 상태로 남아 있을 수 있음.
- 배피 로직 마지막에는 무조건 connection close  권장

```python
from django import db
db.connections.close_all()
```
