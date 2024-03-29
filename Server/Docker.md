# 도커란?
- 도커는 컨테이너 기반의 오픈소스 가상화 플랫폼이다.
- 컨테이너란? ‘애플리케이션’과 ‘애플리케이션을 구동하는 환경’을, ‘Host OS’ 로부터 격리한 공간을 의미합니다.
- 컨테이너는 보통 마이크로서비스로 사용됩니다.
    - 마이크로서비스란, 거대한 어플리케이션을 기능별로 나누어, 변경/조합이 가능하게 서비스를 의미하며,
    - 컨테이너를 사용하면, 하나의 큰 어플을 서비스 단위로 잘라 빠르게 배포할 수 있기 때문에, 마이크로서비스라고 설명됩니다.
    - 또한, 각각 분리해서 사용하므로, 개별 변경사항이 분리된 다른 기능들에 영향을 미치지 않습니다.

# vm vs docker 
- 도커는 가상머신이 아니고 격리만 해주기 떄문에 성능상 하락이 없다. (성능 하락이 큰 VM과 다르다.)
### 기존의 가상머신(VM) 서버 [Server → Host OS → Hypervisor → 각각의 Guest OS 가 설치된 VM 구동] 
- 장점 : Host OS 가 Window 여도, Guest OS 로 Linux 를 사용할 수 있습니다. 보안적으로, Guest OS 가 뚫렸을 경우, 다른 Guest OS 와 Host OS 가 완벽하게 분리되어 있기 때문에, 각각의 VM 에 피해가 가지 않습니다.
- 단점 : VM 마다 무거운 Guest OS 를 띄우기 때문에, Container 에 비해 속도가 느립니다.
### 컨테이너 서버 [Server → Host OS → Docker Engine → Container 구동]
- 장점 : 하나의 Host OS 를 공유하기 때문에, Container 별로 무거운 OS 를 띄우지 않아, Container 의 속도가 훨씬 빠릅니다.
- 단점 : Host OS 가 Window 라면, Guest OS 로 Linux 를 사용할 수 없습니다. 보안적으로, Container 가 뚫렸을 경우, 다른 Container 와 Host OS 가 위험해질 수 있습니다.


# kubernetes vs docker
- 쿠버네티스는 '컨테이너 오케스트레이션 툴' 입니다.
- 오케스트레이션이란?
    - 컨테이너 역시 그 수가 많아지게 되면, 관리와 운영에 있어서 어려움이 따릅니다.
    - 컨테이너 오케스트레이션은, 이러한 다수의 컨테이너 실행을 관리 및 조율하는 시스템입니다.
    - 오케스트레이션 엔진을 통해, 컨테이너의 생성과 소멸, 시작 및 중단 시점 제어, 스케줄링, 로드 밸런싱, 클러스터링 등
    - 컨테이너로 어플리케이션을 구성하는 모든 과정을 관리할 수 있습니다.
    - 다른 컨테이너 오케스트레이션 툴로는 '도커 스웜', 'ECS', 'Nomad'등이 있습니다.

## 쿠버네티스와 도커(컨테이너) 관리
### kubernetes
- 다수의 서버와 다수의 서비스를 관리하기 쉽게하기 위한 컨테이너 관리 툴이다.
- 쿠버네티스에서 여러개의 실행되고있는 도커를 관리한다고 생각하면 된다.
### 스케줄링
- 컨테이너를 적당한 서버에 배포해 주는 작업
- 여러 대의 서버 중 가장 트래픽이 적은 서버에 배포하거나, 순차적으로 배포 또는 랜덤 배포 등 설정이 가능
- 컨테이너 개수를 여러 개로 늘리면 적당히 나눠 배포하고, 서버가 죽으면 실행 중이던 컨테이너를 자동으로 다른 서버에 띄워줌
### 클러스터링
- 여러 개의 서버를 하나의 서버처럼 사용
- 작게는 몇 개 안되는 서버부터 많게는 수천 대의 서버를 하나의 클러스터로
- 여기저기 흩어져 있는 컨테이너도 가상 네트워크를 이용하여 마치 같은 서버에 있는 것처럼 쉽게 통신
### 서비스 디스커버리
- 서비스를 찾아주는 기능(서버끼리의 연결을 하려면 해당 서버가 어디 떠있는지 알아야 하고, 이를 도커 컨테이너 이름으로 손쉽게 찾아줌)
- 클러스터 환경에서 컨테이너는 어느 서버에 생성될지 알 수 없고, 다른 서버로 이동 할 수도 있음
- 따라서 컨테이너와 통신을 하기 위해서 어느 서버에서 실행중인지 알아야 하고, 컨테이너가 생성되고 중지될 때 어딘가에 IP와 Port 같은 정보를 업데이트 해줘야 함
- key-value 스토리지에 정보를 저장할 수 있고, 내부 DNS 서버를 이용


# 명령어
```
docker run --rm -it centos:8 /bin/sh
docker run --rm -it ubuntu:20.04 /bin/sh
// 컨테이너 내부에 들어가기 위해 sh를 실행하고 키보드 입력을 위해 -it 옵션을 줍니다. 
// 추가적으로 프로세스가 종료되면 컨테이너가 자동으로 삭제되도록 --rm 옵션도 추가
// --rm 옵션이 없다면 컨테이너가 종료되더라도 삭제되지 않고 남아 있어 수동으로 삭제 해야 합니다
```
```
docker run --rm -p 1234:6379 redis
docker run --rm -p 5555:5678 hashicorp/http-echo -text="hello world"
// detached mode(백그라운드 모드)로 실행하기 위해 -d 옵션을 추가하고 -p 옵션을 추가하여 컨테이너 포트를 호스트의 포트로 연결하였습니다. 
// 브라우저를 열고 localhost:5555 접속하면 메시지를 볼 수 있습니다
```
```
docker run -d -p 3306:3306 \ 
 -e MYSQL_ALLOW_EMPTY_PASSWORD=true \ 
 --name mysql \ 
 mysql:5.7
 
docker exec -it mysql mysql // exec 명령어는 run 명령어와 달리 실행중인 도커 컨테이너에 접속할 때 사용하며 컨테이너 안에 ssh server등을 설치하지 않고 exec 명령어로 접속합니다

create database wp CHARACTER SET utf8; 
grant all privileges on wp.* to wp@'%' identified by 'wp'; 
flush privileges; 
quit

```
```
docker ps // 실행중인 컨테이너 목록을 확인하는 명령어 입니다
docker ps -a // 중지된 컨테이너도 확인하려면 -a 옵션을 붙입니다
docker stop [OPTIONS] CONTAINER [CONTAINER...] // 실행중인 컨테이너를 하나 또는 여러개 (띄어쓰기) 중지
docker rm [OPTIONS] CONTAINER [CONTAINER...] // 종료된 컨테이너를 완전히 제거하는 명령어
docker logs [OPTIONS] CONTAINER // 로그보기 ex) docker logs -f b8b3eac725c6 // tail
docker images [OPTIONS] [REPOSITORY[:TAG]] // 다운로드 받은 이미지 보기
docker pull [OPTIONS] NAME[:TAG|@DIGEST] // 이미지 다운로드 하기
docker rmi [OPTIONS] IMAGE [IMAGE...] // 이미지 삭제하기 (images 명령어를 통해 얻는 이미지 목록에서 이미지 ID를 입력. 컨테이너가 실행중인 이미지는 삭제 안됨)
```
```
docker network create [OPTIONS] NETWORK // 도커 컨테이너끼리 이름으로 통신할 수 있는 가상 네트워크 ex) docker network create app-network
docker network connect [OPTIONS] NETWORK CONTAINER // 기존에 생성된 컨테이너에 네트워크를 추가 ex) docker network connect app-network mysql

docker run -d -p 8080:80 \ 
 --network=app-network \ 
 -e WORDPRESS_DB_HOST=mysql \ 
 -e WORDPRESS_DB_NAME=wp \ 
 -e WORDPRESS_DB_USER=wp \ 
 -e WORDPRESS_DB_PASSWORD=wp \ 
 wordpress
워드프레스를 app-network에 속하게 하고 mysql을 이름으로 접근
```

# 이미지 만들기
```
docker run -it --name git ubuntu:latest bash // 우분트 이미지 실행

apt-get install -y git // git 다운로드

docker commit git ubuntu:git // git 이 있는 ububtu 이미지 만들기

docker run -it --name git2 ubuntu:git bash // 이미지 실행 
```
