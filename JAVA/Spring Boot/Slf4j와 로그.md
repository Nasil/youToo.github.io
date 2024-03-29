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
- slf4j는 로깅에 대한 추상 레이어로 logback, log4j2 같은 로깅 프레임워크의 인터페이스 역할을 하며, slf4j를 이용하면 코드를 일정하게 유지하면서 구현체의 전환 (다른 프레임워크로의 전환)을 쉽고 간단하게 할 수 있습니다.
- logback, log4j2는 slf4j의 구현체

# 로그라이브러리 : Log4j vs Logback vs Log4j2

### Log4j 
- 콘솔로 출력하는 stdout 외에도 파일 출력도 제공합니다. 
- 하지만 2015년에 개발이 중단되었기 때문에 기존 시스템이 아니라면 사용할 이유가 없습니다.

### Logback
- logback은 log4j와 유사하면서도 향상된 성능과 필터링 옵션을 제공하며, slf4j도 지원합니다. 자동 리로드 기능도 지원합니다.
-  자동 리로드 : Linux 서버 내에서 log4j를 사용할 시 log level을 변경하게 되면, 서버를 재가동하여 변경 사항을 적용해줘야 하는 반면에 logback은 서버를 재가동할 필요 없이 즉각 자동 리로드를 지원해줍니다.
-  spring boot 환경의 경우 spring-boot-starter-web > spring-boot-starter-logging에 기본적으로 logback 구현체가 포함되어 있습니다. 그렇기 때문에 spring boot 환경에서 로깅 프레임워크를 따로 설정하지 않으면 logback이 기본으로 적용됩니다.

### Log4j2
- log4j2는 logback 이후에 나온 만큼 logback과 마찬가지로 필터링 기능과 자동 리로드 기능을 가지고 있습니다.
- logback과의 가장 큰 차이점은 Multi Thread 환경에서 비동기 로거(Async Logger)의 경우 log4j, logback 보다 처리량이 더 높고, 대기 시간이 훨씬 짧습니다. 
- 추가적으로 람다 표현식과 사용자 정의 로그 레벨도 지원합니다.
- spring boot에서 log4j2를 사용하기 위해서는 dependency에서 logback을 제거해주는 작업이 필요합니다. 스프링 부트는 기본 설정으로 logback을 사용하기 때문에 log4j2 의존성을 추가하더라도 기본 설정으로 잡힌 logback이 동작하게 됩니다.


### 주의
- System.out.println 은 사용 금지 : CPU 점유율이 높아 성능 저하 발생 시킴
- System.out.format JDK 5.0 추가됨. prinln 보다 성능이 높으며 디버깅 시에 사용 권장. 단 운영시에는 사용 하지 말것.
```java
System.out.format("Name=%s long value=%d float value=%f\n", "Format", 1, 2.2); // C 프린트 방식과 비슷
```

## Exception Log
```java
try {

} catch (Exception e) {
    // e.printStackTrace(); // Exception 클래스 외에도 여러 로그 섞여 있어 알아보기 힘들고, 해당 정보를 모두 콘솔에 보여주는데 성능 저하 발생됨
    StackTraceElement[] ste = e.getstackTrace();
    String className = ste[0].getClassName();
    String methodNamae = ste[0].getMethodName();
    int lineNumber = ste[0].getLineNumber();
    String fileName = ste[0].getFileName();
    logger.severe("Exception : " + e.getMessage());
    logger.severe(className + "." + methodName + " " + fileName + " " + lineNumber + "line");
}
```

### 참조
- jpa 공부할때 사용하면 좋음 sql ? 에 뭐가 들어가는지 알수 있음 https://github.com/gavlyukovskiy/spring-boot-data-source-decorator
