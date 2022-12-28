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



# 패키지 1개로 java Client 여러개 실행하기
#### 방안1) intellij vm option
```
intellij > edit configuration > Modify options > add Vm options > -Dserver.port=9091 입력
```
#### 방안2) jar 생성 및 실행
- maven
```
mvn clean compile package // target 폴더에 {}.jar 파일 생성됨
java -jar -Dserver.port=9092 {}.jar
```
- gradle
```
intellij > gradle > Tasks > build > clean
intellij > gradle > Tasks > build > bootJar // build > libs > {}.jar 파일 생성됨
java -jar -Dserver.port=9092 {}.jar
```
#### 방안3) command 로 포트 지정하여 실행
- maven
```
mvn spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=9003'
```
- gradle
```
./gradlew bootRun --args='--server.port=9092'
```
#### 방안4) 랜덤 포트 
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
- COMMAND 실행
```
mvn spring-boot:run
./gradlew bootRun
```
