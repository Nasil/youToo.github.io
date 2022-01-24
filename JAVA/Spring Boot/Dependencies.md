# gradle 의존관계 보기
```
./gradlew dependencies —configuration compileClasspath
```


스프링 부트 라이브러리 살펴보기
- spring-boot-starter-web
   - spring-boot-starter-tomcat: 톰캣 (웹서버)
   - spring-webmvc: 스프링 웹 MVC
- spring-boot-starter-thymeleaf: 타임리프 템플릿 엔진(View)
- spring-boot-starter-data-jpa
    - spring-boot-starter-aop
    - spring-boot-starter-jdbc
    - ㄴ HikariCP 커넥션 풀 (부트 2.0 기본) **
    - hibernate + JPA: 하이버네이트 + JPA
    - spring-data-jpa: 스프링 데이터 JPA
- spring-boot-starter(공통): 스프링 부트 + 스프링 코어 + 로깅
    - spring-boot
    - ㄴ spring-core
    - spring-boot-starter-logging
    - ㄴ  logback, slf4j
