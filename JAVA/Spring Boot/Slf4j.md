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
