# Cloud 설정
- server
```java
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(DiscoveryserviceApplication.class, args);
	}
}
```
- client
```java
@SpringBootApplication
@EnableDiscoveryClient
public class UserserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserserviceApplication.class, args);
	}
}
```


# application.yml
- server yml
```
server:
  port: 8761

spring:
  application:
    name: discoveryservice

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```

- client yml
```
server:
  port: 0 # 랜덤포트 생성하여 client가 여러개 실행 가능하도록 설정


spring:
  application:
    name: user-service

eureka:
  instance:
    instance-id: ${spring.cloud.client.hostname}:${spring.application.instance_id:${random.value}} # 실행시마다 실행될 instance
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://127.0.0.1:8761/eureka
```

# 패키지 1개로 java 프로세스 여러개 실행하기
#### 방안1) intellij vm option
```
intellij > edit configuration > Modify options > add Vm options > -Dserver.port=9091 입력
```
#### 방안2) command 실행
```
mvn clean compile package
java -jar -Dserver.port=9092 ./target/{}.jar
```
```
intellij > gradle > Tasks > build > clean
intellij > gradle > Tasks > build > bootJar // build > libs > {}.jar 파일 생성됨
java -jar -Dserver.port=9092 ./target/{}.jar
```


```
./gradlew bootRun
./mvnw spring-boot:run
```
