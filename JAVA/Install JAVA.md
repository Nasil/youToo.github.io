## OpenJDK 다운로드 
- https://www.azul.com/downloads/?os=macos&architecture=arm-64-bit&package=jdk
- .msi 를 다운로드 받아 설치 (.zip파일 받아서 압축해제 후, 해당 경로에 붙여넣기 해도 무방합니다)
- Tip → 드라이브에 Java 폴더를 생성하여, 해당 폴더에 설치하면, 버전별로 관리하기가 쉽니다.

## JDK를 해당 PC에서 Global하게 사용하기 위한 셋팅
- 시스템 변수 → 새로만들기 → 새 시스템 변수 → 변수 이름 : JAVA_HOME → 변수 값 : (JDK가 설치된 경로) → 확인
- 시스템 변수 → Path → 편집 → 변수 값 : 맨 앞에 %JAVA_HOME%\bin; 입력 → 확인
- cmd창에서 java -version 를 입력해보면 설치된 JDK 버전이 출력 및 확인이 가능합니다.
