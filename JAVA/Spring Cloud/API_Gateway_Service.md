# API Gateway Service
- 인증 및 권한 부여
- 서비스 검색 통합
- 응답 캐싱
- 정책, 회로 차단기 및 QoS 다시 시도
- 속도 제한
- 부하 분산
- 로깅, 추적, 상관 관계
- 헤더, 쿼리 문자열 및 청구 변환
- IP 허용 목록에 추가

## Spring Cloud 에서의 MSA 간 통신
1) RetRemplate
2) Feign client
- 버전 따라 Netflix ribbon -> zuul -> spring cloud gateway


# Spring Cloud Gateway 활용

#### filter 방법1) application.yml에 설정을 안하고 직접 자바 소스로 개발
```java
package com.example.apigatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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

#### filter 방법2) application.yml에 설정
