# JAVA 환경 

- JVM  : 소스파일(.jvav) ===컴파일===> 바이트코드파일(.class) ===JVM구동(OS별)====> 기계어
- JRE(JAVA Runtime Environment) 설치되어 있는 OS 에서는 실행 가능
- JDK = JRE (JVM + 표준 클래스 라이브러리) + 개발 도구

## OOP 객체지향 프로그래밍
- 추상화(Abstraction) : 공통 특성 추출
- 캡슐화(Encapsulation)
- 일반화 관계(Generalization)
- 다형성(Polymorphism) : 상속관계

## 자바 파일 실행 순서
1. 컴파일 : javac Hello.java (java 소스 파일 컴파일)
2. 실행 : java Hello (바이트 코드 파일 jvm 으로 실행)

## 자파 패키기 실행
1. 컴파일 : javac -d .Application.java
2. 실행 : java Application

// 오버로딩 : 함수명은 같고 매개변수 갯수, 타입, 순서가 다름, 매개변수명만 다른것은 해당 안됨

// JVM 은 길이가 0인 String 배열을 먼저 생성하고 main 호출시 매개값으로 전달함
// 자바 프로그램 실행시 매개변수를 입력 받을수 있음

// 기본타입 : byte, char, short, int, long, float, double, boolean
// 참조타입 : 배열, 열거, 클래스, 인터페이스 ..

// JVM 사용하는 메모리 영역
// 메소드 영역 : JVM 이 시작할때 생성되고 모든 스레드가 공유하는 영역. 클래스별 상수풀 & 필드/메소드 & 생성자 등을 분류해서 저장됨.
// 힙 영역: 객체와 배열이 생성되는 영역, 참조하는 변수나 필드가 없다면 가비지 컬렉터를 싱행시켜서 자동 제거.
// 스택 영역: 각 스레드마다 하나씩 존재하며 스레드가 시작할때 할당. 자바에서 추가하지 않는 다면 main 스레드만 있는 상태. 기본타입변수와 참조타입 변수 push&pop

// 가비지 컬렉터
String a = "aaa";
a = null; // 참조 타입 초기화, heap 메모리에서 자동 제거됨
System.gc(); // 가비지컬렉터 호출 -> finalize() 함수 호출됨, 순서 보장 안됨, 전부 소멸안됨, CPU가 한가하거나 메모리가 부족할때 실행됨
// ㄴ JVM 에게 가능한한 빨리 실행해달라고 요청

// Stack : 변수명, 타입, 기본타입은 값도 저장되지만 참조타입은 포인터만 저장됨
// Heap :

// API (Application Programming Interface)
// java.lang : 기본 클래스, import 없이 사용 가능
// java.util : Arrays, Calendar, Date, Objects, String Tokenizer, Random
// java.lang.object : 기본적으로 상속 되어 있는 lib ex) equals, hashCode, toString(), getClass()
// java.util.object :

// Object 는 최상위 타입

// JVM 이 시작할때 자동 설정되는 시스템의 속성값
Properties props = System.getProperties();
Set keys = props.keySet();
for(Object objKey : keys) {
    String key = (String)objKey;
    String value = System.getProperty(key);
    System.out.println("[" + key + "] " + value);
}

// 환경 변수 조회
String javaHome = System.getenv("JAVA_HOME");
System.out.println(javaHome); // D:\Java\jdk-11

System.exit(0); // 강제 종료 (정상종료 : 0), checkExit() 메소드 호출됨
