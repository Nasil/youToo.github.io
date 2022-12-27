# Cloud 설정
- server
```
@SpringBootApplication
@EnableEurekaServer
public class DiscoveryserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(DiscoveryserviceApplication.class, args);
	}
}
```
- client
```
@SpringBootApplication
@EnableDiscoveryClient
public class UserserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserserviceApplication.class, args);
	}
}
```


# application.yml
- port: 0 // 랜덤포트 생성하여 client가 여러개 실행 가능하도록 설정
- instance-id: ${spring.cloud.client.hostname}:${spring.application.instance_id:${random.value}} # 실행시마다 실행될 instance

# 실행
```
./gradlew bootRun
./mvnw spring-boot:run
```
 
```yml
server:
  port: 0


spring:
  application:
    name: user-service

eureka:
  instance:
    instance-id: ${spring.cloud.client.hostname}:${spring.application.instance_id:${random.value}}
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://127.0.0.1:8761/eureka
```
