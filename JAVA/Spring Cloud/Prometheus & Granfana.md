```
implementation 'io.micrometer:micrometer-registry-prometheus'
```

# Prometheus
- Metrics 를 수집하고 모니터링 및 알람에 사용되는 오픈소스 어플리케이션
- 2016년 부터 CNCF에서 관리하는 2번째 공식 
- pull 방식의 구조와 다양한 metric ecpoter 제공
- 시계열 DB 에 Metrics 저장 -> 조회 가능 (query)


# Granfana
- 데이터 시각화, 모니터링 및 분석을 위한 오픈소스 애플리케이션
- 시계열 데이터를 시각화하기 위한 대시보드 제공


prometheus > prometheus.yml
```
- job_name: 'user-service'  # 생성할 job의 이름
  scrape_interval: 15s      # 15초 마다 정보 파싱
  metrics_path: '/user-service/actuator/prometheus' # 정보를 파싱해올 url
  static_configs:
    - targets: ['localhost:8000'] # url host
- job_name: 'order-service'
  scrape_interval: 15s
  metrics_path: '/order-service/actuator/prometheus' # 정보를 파싱해올 url
  static_configs:
    - targets: ['localhost:8000'] # url host
- job_name: 'gateway'
  scrape_interval: 15s
  metrics_path: '/actuator/prometheus' # 정보를 파싱해올 url
  static_configs:
    - targets: ['localhost:8000'] # url host
```
