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
```JAVA
```
