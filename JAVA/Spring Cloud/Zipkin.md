# Zipkin?
- Zipkin은 분산환경에서 로그 트레이싱을 제공해주는 오픈 소스입니다.

# zipkin의 구성 
1) Zipkin Client Library: 
- 정보수집을 담당하고, 수집한 것들을 Collector 모듈로 전송. 
- http를 사용하고 java, javascript, go 언어등을 지원.
2) Zipkin Server: 
- Collector -> Storage -> API -> Web UI (dashboard) 로 구성.
- Storage에는 in-memory방식과, ES 방식 등이 있는데, 규모가 커진다면 ES(ElasticSearch)방식이 더 적합.
- 
# Spring Cloud Sleuth 란 ?
- 여러 서비스를 거쳐서 호출이 일어나기 때문에 추적이 어렵다..! 그래서 추적을 위한 연관된 ID가 필요합니다.
- 이 ID를 생성해 주는 것이 바로 Spring Cloud Sleuth입니다.
- Spring에서 지원해주는 Zipkin Client Library이고, Spring 연동이 쉽다고 합니다.
예시)
* Trace ID : 클라이언트의 호출이 시작되는 시점 부터 그 호출이 끝날 때 까지 동일한 ID 사용
* Span ID : 마이크로서비스당 1개의 ID가 부여됨.

 
