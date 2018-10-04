http://mobicon.tistory.com/86

# Gearman
- Gearman 기반 애플리케이션은 클라이언트, 작업자 및 작업 서버의 세 부분으로 구성됩니다. 
- 클라이언트는 실행할 작업을 작성하여 작업 서버로 보내는 작업을 담당합니다. 
- 작업 서버는 작업을 실행하고 작업을 전달할 수있는 적합한 작업자를 찾습니다. 
- 작업자는 클라이언트가 요청한 작업을 수행하고 작업 서버를 통해 클라이언트에 응답을 보냅니다. 
- Gearman은 응용 프로그램이 Gearman 작업 서버 (gearmand라고도 함)와 대화하기 위해 호출하는 
클라이언트 및 작업자 API를 제공하므로 네트워킹 또는 작업 매핑을 처리 할 필요가 없습니다. 
- 내부적으로 gearman 클라이언트 및 작업자 API는 TCP 소켓을 사용하여 작업 서버와 통신합니다. 
- Gearman이 어떻게 작동하는지 자세히 설명하기 위해 문자열에서 문자의 순서를 반대로 바꿀 간단한 애플리케이션을 살펴 보겠습니다. 
- 이 예제는 PHP로 제공되지만 다른 API는 매우 유사하게 보일 것입니다.
- 먼저 작업을 보냈고 결과를 기다리는 클라이언트 응용 프로그램을 작성하여 인쇄 할 수 있습니다. 
- Gearman 클라이언트 API를 사용하여 함수 이름과 연관된 일부 데이터를 송신함으로써이를 수행합니다.
- 이 경우 reverse 함수입니다. 이 코드는 다음과 같습니다 (간결하게하기 위해 오류 처리가 생략되었습니다).

![기어맨](http://gearman.org/img/stack.png)


```php
<?php
// Reverse Client Code
$client = new GearmanClient();
$client->addServer();
print $client->do("reverse", "Hello World!");
```

- 이 코드는 클라이언트 클래스를 초기화하고 add_server가있는 작업 서버를 사용하도록 구성하고 (인수가 없으면 127.0.0.1을 기본 포트로 사용함) 클라이언트 API에 워크로드가 "Hello world!"인 역방향 함수를 실행하도록 지시합니다. 
- Gearman에 관한 한 함수 이름과 인수는 완전히 임의적이므로 응용 프로그램 (텍스트 또는 바이너리)에 적합한 데이터 구조를 보낼 수 있습니다. 
- 이 시점에서 Gearman 클라이언트 API는 작업을 Gearman 프로토콜 패킷으로 패키징하고 작업 서버로 전송하여 역 기능을 실행할 수있는 적절한 작업자를 찾습니다. 

```php
<?php
// Reverse Worker Code
$worker = new GearmanWorker();
$worker->addServer();
$worker->addFunction("reverse", function ($job) {
  return strrev($job->workload());
});
while ($worker->work());
```
- 이 코드는 문자열을 가져 와서 그 문자열의 역을 반환하는 함수 my_reverse_function을 정의합니다. 
- 이는 작업자 객체가 클라이언트와 동일한 로컬 작업 서버에 연결하기 위해 설정 한 후 reverse라는 함수를 등록하는 데 사용됩니다. 
- 작업 서버는 실행할 작업을 수신하면 함수 이름을 역순으로 등록한 작업자 목록을보고 작업을 무료 작업자 중 하나에게 전달합니다. 
- Gearman 작업자 API는이 요청을 받아서 함수 my_reverse_function을 실행하고 해당 기능의 결과를 작업 서버를 통해 다시 클라이언트로 보냅니다.
- 보시다시피, 클라이언트 및 작업자 API (작업 서버와 함께)는 작업 관리 및 네트워크 통신을 처리하므로 응용 프로그램 부분에 집중할 수 있습니다. 
- 비동기 처리 및 우선 순위 작업을위한 백그라운드를 포함하여 Gearman에서 작업을 실행할 수있는 몇 가지 방법이 있습니다. 

![이미지](http://gearman.org/img/flow.png)

## 참조
- http://gearman.org/
