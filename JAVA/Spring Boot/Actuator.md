- springboot 어플리케이션에 대해 모니터링 할 수 있는 라이브러리인 Actuator

```application.yml
# actuator
management:
  endpoints:
    web:
      exposure:
        include: "*"
      base-path: /application
```

```
"org.springframework.boot:spring-boot-starter-actuator"
```
