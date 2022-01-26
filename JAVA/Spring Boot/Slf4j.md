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

# Slf4j 란?
- Logger 추상체로 slf4j는 logback이나 log4j2와 같은 프레임워크의 인터페이스의 역할을 해주기 때문에  로깅 구현체가 바뀌더라도 생각보다 어렵지않게 변경할 수 있습니다. 기능이 너무 단순하여 실제로는 사용할 필요가 없긴합니다. 

# 로그라이브러리 : Log4j vs Logback vs Log4j2

### Log4j 
- 콘솔로 출력하는 stdout 외에도 파일 출력도 제공합니다. 
- 하지만 2015년에 개발이 중단되었기 때문에 기존 시스템이 아니라면 사용할 이유가 없습니다.

### Logback
- log4j2 전에 개발된 로깅프로그램으로 log4j에서 향상된 성능과 필터링 옵션을 제공합니다. 
- slf4j도 지원합니다. 그리고 자동 리로드도 가능합니다.
-  자동 리로드 : Linux 서버 내에서 log4j를 사용할 시 log level을 변경하게 되면, 서버를 재가동하여 변경 사항을 적용해줘야 하는 반면에 logback은 서버를 재가동할 필요 없이 즉각 자동 리로드를 지원해줍니다.
-  spring boot 환경의 경우 spring-boot-starter-web > spring-boot-starter-logging에 기본적으로 logback 구현체가 포함되어 있습니다. 그렇기 때문에 spring boot 환경에서 로깅 프레임워크를 따로 설정하지 않으면 logback이 기본으로 적용됩니다.

### Log4j2
- log4j2는 logback 이후에 나온 만큼 logback과 마찬가지로 필터링 기능과 자동 리로드 기능을 가지고 있습니다.
- logback과의 가장 큰 차이점은 Multi Thread 환경에서 비동기 로거(Async Logger)의 경우 log4j, logback 보다 처리량이 더 높고, 대기 시간이 훨씬 짧습니다. 
- 추가적으로 람다 표현식과 사용자 정의 로그 레벨도 지원합니다.
- spring boot에서 log4j2를 사용하기 위해서는 dependency에서 logback을 제거해주는 작업이 필요합니다. 스프링 부트는 기본 설정으로 logback을 사용하기 때문에 log4j2 의존성을 추가하더라도 기본 설정으로 잡힌 logback이 동작하게 됩니다.
