## OpenJDK 다운로드
- https://www.azul.com/downloads/?os=macos&architecture=arm-64-bit&package=jdk
- JDK 8, 11, 16 필요하신거 다운로드(되도록이면 JDK 8, 11, 16 추천) → Spring Boot가 아직 JDK-8, 11, 16에 최적화 되어 있음
1) 해당 사이트에서 OpenJDK를 받는 이유 : 다양한 Java Version, OS를 지원하는 JDK를 한곳에서 다운로드 가능
2) 오라클 JDK를 다운 받지 않는 이유 : 비쌈(돈)

## OpenJDK 설치
- .msi 를 다운로드 받아 설치 (.zip파일 받아서 압축해제 후, 해당 경로에 붙여넣기 해도 무방합니다)
- Tip → Java 폴더를 생성하여, 해당 폴더에 설치하면, 버전별로 관리하기가 쉽니다.


## OpenJDK 환경설정
- 시스템 변수 → 새로만들기 → 새 시스템 변수 → 변수 이름 : JAVA_HOME → 변수 값 : (JDK가 설치된 경로) → 확인
- 시스템 변수 → Path → 편집 → 변수 값 : 맨 앞에 %JAVA_HOME%\bin; 입력 → 확인

## OpenJDK 설치 확인
- cmd창에서 java -version 를 입력해보면 설치된 JDK 버전이 출력 및 확인이 가능합니다.
- 위 과정을 거치는 이유는 JDK를 해당 PC에서 Global하게 사용하기 위함.

## 개발 Tool / IDEA
- Intellij : https://www.jetbrains.com/idea/download/#section=windows (Community 버전으로 다운로드)
- Spring boot 내장 톰켓을 사용할 경우 : Community 버전으로 사용
- Spring boot 외장 톰켓을 사용할 경우 : Ultimate 버전으로 사용 (비쌈)

## Spring boot
https://start.spring.io/ 설정후 GNERATE
