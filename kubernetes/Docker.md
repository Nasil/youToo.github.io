# 도커 파일 작성하기
- Dockerfile
```
FROM node:18-alpine

# 현재 경로로 이동 (복사해다 넣을)
WORKDIR /app

# 대상 파일을 WORKDIR 에 선언한 경로에 복사
COPY package.json package-lock.json ./

# npm install 실행, ci는 버전 그대로 설치하도록 함
RUN npm ci

COPY index.js .

# node 실행하기
ENTRYPOINT [ "node", "index.js" ]
```

# 도커 실행하기
```
1. 도커 데몬 띄우기
2. 빌드 : docker build -f Dockerfile -t ns-docker .      
   -f 로 도커 파일 지정
   -t 로 도커 이미지 name 지정
2.확인하기 : docker images
3.실행 : docker run -d -p 8080:8081 --name my-node-app ns-docker
  -p 포트로 로컬포트와 도커의 포트로 연결해줌
```

# 도커 명령어
```
# 실행 중인 컨테이너만 출력 : docker ps
# 모든 컨테이너 출력(정지 컨테이너 포함) : docker ps -a
# 도커 로그 확인 : docker logs 531a82b041f1
# 재시작 : docker restart a00f4f3a898a
# 프로세스 중지 : docker stop a00f4f3a898a
# 삭제 : docker rm a00f4f3a898a
# 강제삭제 : docker rm -f a00f4f3a898a
# 이미지 확인 : docker images
# 이미지 삭제 : docker rmi 531a82b041f1
# 컨테이너 접속 : docker exec -it c83827ab44f9 /bin/bash
# 컨테이너 접속 : docker exec -it c83827ab44f9 /bin/ash 
```
