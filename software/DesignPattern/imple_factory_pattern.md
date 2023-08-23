https://kurular4.medium.com/spring-boot-implementing-factory-pattern-45796f31f36c
https://github.com/kurular4/medium-spring-factory
```java
@Component
public class ViewerFactory {
    private final Map<ViewerType, Viewer> viewerMap;

    @Autowired // 생략 가능 (생성자 한개)
    private ViewerFactory(List<Viewer> viewers) {
        viewerMap = viewers.stream().collect(Collectors.toUnmodifiableMap(Viewer::getType, Function.identity()));
    }

    public Viewer getViewer(ViewerType viewerType) {
        return   Optional.ofNullable(viewerMap.get(viewerType)).orElseThrow(IllegalArgumentException::new);
    }
}
```



https://medium.com/p/71449bceecef
```java
class LoggerFactory {
    private static final Map<String, Class<? extends LoggingOperation>> instances = new HashMap<>();

    public static void register(String loggerMedium, Class<? extends LoggingOperation> instance) {
        if (loggerMedium != null && instance != null) {
            instances.put(loggerMedium, instance);
        }
    }

    public static LoggingOperation getInstance(ApplicationContext context, String loggerMedium) {
        if (instances.containsKey(loggerMedium)) {
            return context.getBean(instances.get(loggerMedium));
        }
        return null;
    }
}
```
```java
import org.springframework.stereotype.Component;

@Component
class RemoteServiceLog implements LoggingOperation {
    static {
        LoggerFactory.register("REMOTE", RemoteServiceLog.class);
    }

    public void log(String message) {
        // Implementation
    }
}
```
