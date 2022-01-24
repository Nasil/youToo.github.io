# 사용법
```java
@Controller
@Slf4j
public class TestController {
    @GetMapping("/")
    public String String(String str){
        try {
            str.toString();
        } catch (NullPointerException e){
            log.trace("가장 디테일한 로그");
            log.warn("경고");
            log.info("정보성 로그");
            log.debug("디버깅용 로그");
            log.error("에러",e);
        }
        return "test";
    }
}
```

# Spring boot jpa 를 사용중이라면 안에 있음
```
org.springframework.boot:spring-boot-starter-data-jpa:2.6.3
org.springframework.boot:spring-boot-starter-aop:2.6.3
org.springframework.boot:spring-boot-starter-logging:2.6.3
org.apache.logging.log4j:log4j-to-slf4j:2.17.1
```
