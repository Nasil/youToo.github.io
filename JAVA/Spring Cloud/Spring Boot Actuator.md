# Actuator?
- 액추에이터는 실행 중인 애플리케이션의 내부를 볼 수 있게 하고, 어느 정도까지는 애플리케이션의 작동 방법을 제어할 수 있게 한다. 예를 들면, 다음과 같다.
- 애플리케이션 환경에서 사용할 수 있는 구성 속성들
- 애플리케이션에 포함된 다양한 패키지의 로깅 레벨(logging level)
- 애플리케이션이 사용 중인 메모리
- 지정된 엔드포인트가 받은 요청 횟수
- 애플리케이션의 건강 상태 정보

스프링 부트 애플리케이션에 액추에이터를 활성화하려면 의존성을 빌드에 추가해야 한다.
```
implementation("org.springframework.boot:spring-boot-starter-actuator")
```


http://172.30.1.61:8888/user-service/native
