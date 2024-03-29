- 강의 요약 : https://intrepidgeeks.com/tutorial/springcloud-msa-introduction-to-microservice-and-springcloud
- 강의 자료 : https://github.com/joneconsulting/msa_with_spring_cloud/tree/main/pdf

# 스케일업 VS 스케일아웃
- Scale-up : 수직 스케일링(vertical scaling) 하드웨어 사양 높이는 것 (비용부담 큼)
- Scale-out : 수평 스케일링(horizontal scaling) 

# Cloud Native Application
## Container 가상화
hypervisor -> Container 
- 참조 ) https://velog.io/@yanghl98/%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%BB%B4%ED%93%A8%ED%8C%85-Virtualization-%EA%B0%80%EC%83%81%ED%99%94-%ED%95%98%EC%9D%B4%ED%8D%BC%EB%B0%94%EC%9D%B4%EC%A0%80-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88

## 12factors + 3
- SaaS 애플리케이션을 만들기 위한 방법론
- https://12factor.net/
- https://developer.ibm.com/articles/15-factor-applications/

# Monolithic vs MSA
### Monolithic
- 모든 업무 로직이 하나의 애플리케이션 형태로 패키징
- 애플리케이션에서 사용하는 데이터가 한곳에 모여 참조되어 서비스 되는 형태
### MSA
- The microservice architectural type is an approach to developing a single application as a suite of small service, each running in its own process and communicating with lightweight mechanisms, on an HTTP resource API. // 하나의 어플리케이션을 개발하되 그것은 작은 서비스 단위로 각 프로세스에서 동작되며 HTTP api로 통신 될수 있다. 
- These services are built aroud business capabilities and independently deployable by fully automatied deployment machinery // 독립적 배포
- There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies. // 최소 중앙 관리가 필요하며, 다른 언어 다른 storage 가 사용 될 수 있다.


![test](https://javatechonline.com/ezoimgfmt/i0.wp.com/javatechonline.com/wp-content/uploads/2022/04/SpringCloudAPIGateway-1.jpg?ezimgfmt=ng%3Awebp%2Fngcb2%2Frs%3Adevice%2Frscb2-1&ssl=1&w=740)
