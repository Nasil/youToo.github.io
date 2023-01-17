# resilience4j 사용 이유?
- msa 환경에서 서킷 브레이커는 다량의 오류를 감지하면 서킷을 열어 새 호출을 받지 않는다.
- 서킷 브레이커는 서킷이 열려 있을 때 빠른 실패 로직을 수행한다. 즉 이어지는 호출에서 시간 초과, 예외 발생 등 오류가 발생하지 않게, 폴백 메서드 호출을 리다디렉션을 한다. 폴백 메서드에서 다양한 비즈니스 로직을 적용하면 로컬 캐시의 데이터를 반환하거나 즉각적인 오류 메시지를 반환하는 등 최적화된 응답을 생성할 수 있다. 이로써 의존하는 서비스의 응답 중단 때문에 마이크로 서비스가 응답하지 못하게 되는 문제를 방지할 수 있는다.
- 시간이 지나면 서킷 브레이커는 반열림 상태로 전환돼 새로운 호출을 허용하며, 이를 통해 문제를 일으킨 원인이 사라졌는지 확인한다. 서킷 브레이커는 새로운 오류를 감지하면서 서킷을 다시 열고 빠른 실패 로직을 다시 수행하며, 오류가 사라졌으면 서킷을 닫고 정상 작동 상태로 돌아간다.
- Resilience4j는 런타임에 다양한 방법으로 서킷 브레이커의 정보를 공개한다.
- 서킷 브레이커의 현재 상태를 마이크로 서비스 액추에이터 상태 점검 엔드 포인트(/actuator/health)를 사용해 모니터링할 수 있다.
- 서킷 브레이커는 상태 전이 등의 이벤트 액추에이터 엔드 포인트(/actuator/citcuitbreakerevents)를 게시한다.
- 서킷 브레이커 스프링 부트의 매트릭스 시스템과 통합돼 있으며 이를 이용해 프로테우스와 같은 모니터링 도구에 메트릭을 게시할 수 있다.
- 공식문서 : https://resilience4j.readme.io/docs/circuitbreaker

```
implementation("org.springframework.cloud:spring-cloud-starter-circuitbreaker-resilience4j")
```
```
/*  MSA간 통신방법2 with Error decode) Using a feignClient with feign error decoder */
CircuitBreaker circuitBreaker = circuitBreakerFactory.create("circuitbreaker");
List<ResponseOrder> orderList = circuitBreaker.run(() -> orderServiceClient.getOrders(userId),
    throwable -> new ArrayList<>());
```

```
@Configuration
public class Resilience4JConfig {

    @Bean
    public Customizer<Resilience4JCircuitBreakerFactory> globalCustomConfiguration() {
        CircuitBreakerConfig circuitBreakerConfig = CircuitBreakerConfig.custom()
                .failureRateThreshold(4)
                .waitDurationInOpenState(Duration.ofMillis(1000))
                .slidingWindowType(CircuitBreakerConfig.SlidingWindowType.COUNT_BASED)
                .slidingWindowSize(2)
                .build();

        TimeLimiterConfig timeLimiterConfig = TimeLimiterConfig.custom()
                .timeoutDuration(Duration.ofSeconds(4))
                .build();

        return factory -> factory.configureDefault(id -> new Resilience4JConfigBuilder(id)
                //.circuitBreakerConfig(CircuitBreakerConfig.ofDefaults())
                .circuitBreakerConfig(circuitBreakerConfig)
                .timeLimiterConfig(timeLimiterConfig)
                .build()
        );
    }
}
```
