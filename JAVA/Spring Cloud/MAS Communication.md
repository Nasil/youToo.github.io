# MSA간 통신

1. restTemplate 을 이용한 통신
- user-service 에 bean 등록
```java
@Bean
@LoadBalanced
public RestTemplate getRestTemplate() {
	return new RestTemplate();
}
```
- 호출할 MSA 주소
```java
UserDto userDto = new ModelMapper().map(userEntity, UserDto.class);
String envOrderUrl = env.getProperty("order-service.url"); // http://order-service/order-service/%s/orders
String orderUrl = String.format(envOrderUrl, userId);
ResponseEntity<List<ResponseOrder>> orders = restTemplate.exchange(orderUrl, HttpMethod.GET, null,
	new ParameterizedTypeReference<List<ResponseOrder>>() {
});

List<ResponseOrder> orderList = orders.getBody();
```
