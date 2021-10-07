- 스프링 부트 스타터(https://start.spring.io/)
- 사용 기능: web, thymeleaf, jpa, h2, lombok, validation


## 다른 프로젝트 import
- File -> Open -> 해당 프로젝트의 build.gradle을 선택해주세요. 그 다음에 선택창이 뜨는데, Open as Project를 선택해주세요

## lombok 플러그인 다운로드 후 
1. Prefrences plugin lombok 검색 실행 (재시작)
2. Prefrences Annotation Processors 검색 Enable annotation processing 체크 (재시작)
3. 임의의 테스트 클래스를 만들고 @Getter, @Setter 확인

## 자동 컴파일
- implementation 'org.springframework.boot:spring-boot-devtools'
- restartedMain 으로 컴파일 실행시 로그에 뜨는 지 확인
- Build Recompile

## @Slf4j
```java
log.info(article.toString());
```

## IntelliJ
- 최근 IntelliJ 버전은 Gradle로 실행을 하는 것이 기본 설정이다. 이렇게 하면 실행속도가 느리다. 다음과
- 같이 변경하면 자바로 바로 실행해서 실행속도가 더 빠르다.
```
Preferences Build, Execution, Deployment Build Tools Gradle
Build and run using: Gradle IntelliJ IDEA
Run tests using: Gradle IntelliJ IDEA
```
