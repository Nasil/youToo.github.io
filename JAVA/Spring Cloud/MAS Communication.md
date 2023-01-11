# MSA간 통신


- user-service 에 bean 등록
```
	@Bean
	@LoadBalanced
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
```
