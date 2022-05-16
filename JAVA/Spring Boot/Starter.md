## Start
- 스프링 부트 스타터(https://start.spring.io/)
- intellij 에서 build.gradle import

## Java 가 안잡힐 경우
- File > Project structure > Project 에 SDK 잘 잡혔는지 확인
- File > Project structure > SDKs 에 SDK 잘 잡혔는지 확인 


## 다른 프로젝트 import
- File -> Open -> 해당 프로젝트의 build.gradle을 선택해주세요. 그 다음에 선택창이 뜨는데, Open as Project를 선택해주세요

## 자동 컴파일
- implementation 'org.springframework.boot:spring-boot-devtools'
- spring-boot-devtools 라이브러리를 추가하면, html 파일을 컴파일만 해주면 서버 재시작 없이 View 파일 변경이 가능하다.
- 인텔리J 컴파일 방법: 메뉴 build Recompile
- restartedMain 으로 컴파일 실행시 로그에 뜨는 지 확인

## IntelliJ
- 최근 IntelliJ 버전은 Gradle로 실행을 하는 것이 기본 설정이다. 이렇게 하면 실행속도가 느리다. 다음과 같이 변경하면 자바로 바로 실행해서 실행속도가 더 빠르다.
```
Preferences > Build, Execution, Deployment > Build Tools > Gradle

Build and run using: Gradle IntelliJ IDEA
Run tests using: Gradle IntelliJ IDEA
```

## Compile 방법
1. 프로젝트 경로로 이동
2. ll 혹은 ls -al 입력
3. [macOS] : ./gradlew build
   [window] : ./gradlew.bat build
* 혹시 에러가 난다면 ./gradlew clean build, ./gradlew.bat clean build (빌드된 파일 지웠다가 다시 빌드 실행)
4. cd build로 빌드 폴더로 이동
5. cd libs -> ll -> {}.jar 파일 확인
6. java -var {}.jar 로 자바 실행
* 서버 중지: ls -arlth


## 많이 쓰는 Dependencies
- web, thymeleaf, jpa, h2, lombok, validation, devtools, log4j2
- build.gradle 참조

## 실행
- 확인(`http://localhost:8080')

## 포트변경
application.yml
```
server:
  port: 8088
```

## 리컴파일 (서버 재시작 않하고 view 파일 변경)
- spring-boot-devtools 라이브러리를 추가하면, html 파일을 컴파일만 해주면 서버 재시작 없이 View 파일 변경이 가능하다.
- 인텔리J 컴파일 방법: 메뉴 build Recompile


## Gradlew 빌드 실행
```
./gradlew clean build
java -jar ~.jar // 실행
```
