https://kurular4.medium.com/spring-boot-implementing-factory-pattern-45796f31f36c


```java
@Component
public class ViewerFactory {
    private static final Map<ViewerType, Viewer> viewerMap;

    @Autowired // 생략 가능 (생성자 한개)
    private ViewerFactory(List<Viewer> viewers) {
        viewerMap = viewers.stream().collect(Collectors.toUnmodifiableMap(Viewer::getType, Function.identity()));
    }

    public static <T> Viewer<T> getViewer(ViewerType viewerType) {
        return   Optional.ofNullable(viewerMap.get(viewerType)).orElseThrow(IllegalArgumentException::new);
    }
}
```

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
