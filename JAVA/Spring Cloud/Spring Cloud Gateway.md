# API Gateway Service
#### Gateway?
- 인증 및 권한 부여
- 서비스 검색 통합
- 응답 캐싱
- 정책, 회로 차단기 및 QoS 다시 시도
- 속도 제한
- 부하 분산
- 로깅, 추적, 상관 관계
- 헤더, 쿼리 문자열 및 청구 변환
- IP 허용 목록에 추가

#### Spring Cloud 에서의 MSA 간 통신
1) Rest Template
2) Feign client
- 버전 따라 Netflix ribbon -> zuul -> spring cloud gateway
- https://velog.io/@jifrozen/Microservice-%EA%B0%84-%ED%86%B5%EC%8B%A0-resttemplate-vs-feign-client


# Spring Cloud Gateway 활용

#### Filter 방법1) application.yml에 설정을 안하고 직접 자바 소스로 개발
```java
@Configuration
public class FilterConfig {

    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(r -> r.path("/first-service/**") // router
                        .filters(f -> f.addRequestHeader("first-request", "first-request-header") // pre filter
                                .addResponseHeader("first-response", "first-response-header"))    // post filter
                        .uri("http://localhost:8081")
                )
                .route(r -> r.path("/second-service/**")
                        .filters(f -> f.addRequestHeader("second-request", "second-request-header")
                                .addResponseHeader("second-response", "second-response-header"))
                        .uri("http://localhost:8082")
                )
                .build();

    }
}
```

#### Filter 방법2) application.yml에 설정 custom filter
```java
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;

@Component
@Slf4j
public class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config> {
    public CustomFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // Custom pre Filter
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            log.info("@Custom PRE filter : request id -> {}", request.getId());

            // Custom post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                log.info("@Custom POST filter : response code -> {}", response.getStatusCode());
            }));
        };
    }

    @Data
    public static class Config {

    }
}
```

#### Filter 방법3) application.yml에 설정 global filter
```java
@Slf4j
@Component
public class GlobalFilter extends AbstractGatewayFilterFactory<GlobalFilter.Config> {
    public GlobalFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // Custom pre Filter
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            log.info("@Global Filter baseMessage: {}", config.getBaseMessage());
            if (config.isPreLogger()) {
                log.info("@Global Filter Start: request id -> {}", request.getId());
            }

            // Custom post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                if (config.postLogger) {
                    log.info("@Global Filter End : response code -> {}", response.getStatusCode());
                }
            }));
        };
    }

    @Data
    public static class Config {
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;

    }
}
```

#### Filter 방법4) application.yml에 설정 custom filter > logging filter
```java
@Slf4j
@Component
public class LoggingFilter extends AbstractGatewayFilterFactory<LoggingFilter.Config> {
    public LoggingFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        GatewayFilter filter = new OrderedGatewayFilter((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            log.info("@Logging Filter baseMessage: {}", config.getBaseMessage());
            if (config.isPreLogger()) {
                log.info("@Logging PRE Filter: request id -> {}", request.getId());
            }
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                if (config.postLogger) {
                    log.info("@Logging POST Filter : response code -> {}", response.getStatusCode());
                }
            }));
        }, Ordered.HIGHEST_PRECEDENCE); // 순서 조정

        return filter;

    }

    @Data
    public static class Config {
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;

    }
}
```
```JAVA
@Logging Filter baseMessage: Spring Cloud Gateway Logging // 제일먼저 실행
@Logging PRE Filter: request id -> c4083c43-3
@Global Filter baseMessage: Spring Cloud Gateway GlobalFilter
@Global Filter Start: request id -> c4083c43-3
@Custom PRE filter : request id -> c4083c43-3
@Custom POST filter : response code -> 200 OK
@Global Filter End : response code -> 200 OK
@Logging POST Filter : response code -> 200 OK // 제일 마지막 실행
```



#### api-gateway yml
```
server:
  port: 8000

eureka:
  client:
    register-with-eureka: true
    fetch-registry: true
    service-url:
      defaultZone: http://localhost:8761/eureka

spring:
  application:
    name: apigateway-service
  cloud:
    gateway:
      default-filters:
        - name: GlobalFilter
          args:
            baseMessage: Spring Cloud Gateway GlobalFilter
            preLogger: true
            postLogger: true
      routes:
        - id: first-service
          uri: lb://MY-FIST-SERVICE
          predicates:
            - Path=/first-service/**
          filters:
            - CustomFilter
#            - AddRequestHeader=first-request, first-requests-header2
#            - AddResponseHeader=first-response, first-response-header2
        - id: second-service
          uri: lb://MY-SECOND-SERVICE
          predicates:
            - Path=/second-service/**
          filters:
            - name: CustomFilter
            - name: LoggingFilter
              args:
                baseMessage: Spring Cloud Gateway Logging
                preLogger: true
                postLogger: true
#            - AddRequestHeader=second-request, second-requests-header2
#            - AddResponseHeader=second-response, second-response-header2
```

#### Cloud Client service yml
```
server:
  port: 0

spring:
  application:
    name: my-first-service
eureka:
  instance:
    instance-id: ${spring.cloud.client.hostname}:${spring.application.instance_id:${random.value}}
  client:
    fetch-registry: true
    register-with-eureka: true
    service-url:
      defaultZone: http://localhost:8761/eureka
```

### Cloud Server yml
```
server:
  port: 8761

spring:
  application:
    name: discoveryservice

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
```


- Load balance : https://happycloud-lee.tistory.com/221
