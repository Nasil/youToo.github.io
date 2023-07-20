
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

## K8s 특징
- 워크로드 분리
- 어디서나 실행 가능 - 온프레미스, 퍼블릭 클라우드
- 선언적 API : 간단한 실행 명령으로 도커 운영

## 모니터링
- Prometheus 로 모니터링 하면서 Grafana 같은 대시보드 시스템에서 그래프로 만들어서 표현
- PromQL 쿼리 언어를 사용하여 간단하게 경고와 Ruleset을 정의 가능

## 주요 
1. Master Node: 클러스터의 제어 플레인을 담당. Pod와 같은 리소스들의 상태를 감시하고, 스케줄링 결정을 하며, 클러스터 상태를 관리.
2. Worker Node: 애플리케이션 컨테이너들이 실행되는 노드. 워커 노드는 마스터 노드의 지시에 따라 컨테이너를 실행하고 상태를 보고.
3. Pod: 하나 이상의 컨테이너 그룹. 같은 Pod에 속한 컨테이너들은 동일한 호스트에서 실행되며, 서로 간에 네트워크와 파일 시스템을 공유할 수 있음.
4. ReplicaSet: 원하는 수의 Pod 복제본을 유지하도록 관리하는 컨트롤러. ReplicaSet은 애플리케이션의 가용성과 확장성을 보장.
5. Deployment: 애플리케이션 업데이트 및 롤백과 같은 배포 전략을 관리하는 리소스. Deployment는 새로운 ReplicaSet을 생성하고 이전 버전의 ReplicaSet을 제거하는 등의 작업을 처리.
6. Service: 클러스터 내부 또는 외부에서 Pod에 접근하기 위한 로드 밸런싱을 제공하는 추상화된 리소스. 서비스는 Pod의 IP와 포트를 유지하며, Pod의 동적인 변화에도 안정적인 접근을 가능하게 함.
7. Namespace: 클러스터의 가상 클러스터를 생성하는데 사용되며, 리소스의 범위를 제한하는 데 도움을 줌.
8. ConfigMap과 Secret: 환경 변수, 설정 파일, 비밀 정보 등을 관리하는 리소스.


## 실행
```bash
# 서비스 실행
kubectl apply -f web-app-service.yaml
# 웹 애플리케이션 확인
kubectl get services
```
