
# 컨테이너 vs 가상머신
- 가상머신 : Infrastructure > Hypervisor(ex, vmware) > Virture Machine 여러개 (Host Operating system + Application) 
- 컨테이너 : Infrastructure > Host Operating system > Docker > Application 여러개
- VM은 하이퍼바이저 위에 Guest OS 가 올라가는데 그 위에 Binary, 라이브러리 등을 모두 구성해야 하기에 무겁고 성능저하가 발생
- 스케일 업 -> 스케일 아웃

## 멀티 호스트 도커 플랫폼
- Doker 시스템을 여러개 두어서 분산 처리하여서 시스템이 다운 되었을때에도 서비스가 유지되도록 함
- 단, 유지보수 관리가 너무 어려워서 컨테이너 오케스트레이션 (ex 쿠버네티스) 사용

## 컨테이너 오케스트레이션
- Physical Infrastructure > Virtual Infrastructure (ex ec2, azure) > OS > Orchestration Service Model (ex, Kubernetes) > Development Workflow Opinionated Containers (ex Docker)
 
# 모니터링
- Prometheus 로 모니터링 하면서 Grafana 같은 대시보드 시스템에서 그래프로 만들어서 표현
- PromQL 쿼리 언어를 사용하여 간단하게 경고와 Ruleset을 정의 가능
