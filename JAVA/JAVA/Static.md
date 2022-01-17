# Static 
- 클래스 로더가 클래스(바이트코드)를 로딩해서 메소드 메모리 영역에 적재할때 클래스 별로 관리. 클래스 로딩되면 바로 사용 가능
- 외부에서 사용시 클래스명. 으로 호출
```java
static double pi = 3.14159; // 정적 필드 초기화
static int field1; // 정적필드
static void method1(); // 정적메소드
int field2;
void method2();
static { // 정적 블록
    field1 = 10; 
    mothod1(); 
    field2 = 10; // static 이 아닌 필드 초기화 불가
    method2(); // static 이 아닌 메소드 호출 불가
}
```
