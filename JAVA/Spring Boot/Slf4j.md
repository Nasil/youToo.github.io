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

### Log4j2
