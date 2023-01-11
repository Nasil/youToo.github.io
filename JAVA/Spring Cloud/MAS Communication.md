# MSA간 통신

## 1. restTemplate 을 이용한 통신
- user-service 에 bean 등록
```java
@Bean
@LoadBalanced
public RestTemplate getRestTemplate() {
	return new RestTemplate();
}
```
- user-service의 service 단에 주문 호출 추가
```java
UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);
String envOrderUrl = env.getProperty("order-service.url"); // http://order-service/order-service/%s/orders
String orderUrl = String.format(envOrderUrl, userId);
ResponseEntity<List<ResponseOrder>> orders = restTemplate.exchange(orderUrl, HttpMethod.GET, null,
	new ParameterizedTypeReference<List<ResponseOrder>>() {
});
List<ResponseOrder> orderList = orders.getBody();
```
- config yml 에 설정
```java
order-service:
  url: http://ORDER-SERVICE/order-service/%s/orders
```

## 2. FeignClient -> HTTP Client
- REST Call 을 추상화 한 Spring Cloud Netflix 라이브러리
```JAVA
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class UserServiceApplication {
```
- user-service의 interface 
```JAVA
@FeignClient(name="order-service")
public interface OrderServiceClient {
    @GetMapping("/order-service/{userId}/orders")
    List<ResponseOrder> getOrders(@PathVariable String userId);
}
```
- user-service의 service 단에 주문 호출 추가
```java
/* MSA간 통신방법2)  Using a feignClient with feign exception handling */
List<ResponseOrder> orderList = null;
try {
    orderList = orderServiceClient.getOrders(userId);
} catch (FeignException.FeignClientException ex) {
    log.error(ex.getMessage());
}
userDto.setOrders(orderList);
```
- Feign logger setting
```java
@Bean
public Logger.Level feignLoggerLevel() {
	return Logger.Level.FULL;
}
```
```
logging:
  level:
    com.example.userservice.client: DEBUG
```


### Feign error decoder 사용 방법
- Exception handler
```
public class FeignErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {
        switch (response.status()) {
            case 400:
                break;
            case 404:
                if (methodKey.contains("getOrders")) {
                    return new ResponseStatusException(HttpStatusCode.valueOf(response.status()),
                    "User's order is empty.");
                }
                break;
            default:
                return new Exception(response.reason());
        }

        return null;
    }
}
```
- user-service의 service 단에 주문 호출 추가
```
/*  MSA간 통신방법2)  Using a feignClient with feign error decoder */
List<ResponseOrder> orderList = orderServiceClient.getOrders(userId);
```
