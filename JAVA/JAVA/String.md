
# String은 클래스 선언에 따라 메모리에 저장되는 방식이 다르다

- 상수 풀에 저장된 데이터는 같은 값을 선언하면 같은 메모리를 공유
- 힙메모리에 생성된 데이터는 같은 값을 선언하더라도 서로 다른 인스턴스에 저장
```java
public class StringTest
{
    public static void main(String[] args)
    {
        String str1 = new String("abc");
        String str2 = new String("abc");
        
        System.out.println(str1 == str2);
        
        String str3 = "abc";
        String str4 = "abc";
        
        System.out.println(str3 == str4);
    }
}
```

# String은 immutable(불변)하다. 

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fm4MpE%2FbtqC3PuPn8x%2FvcwkJ2X2MKWrpwiy2zKyg1%2Fimg.png)
- String 클래스는 불변하기 때문에 멀티 쓰레드 환경에서 동기화를 신경 쓰지 않아도 된다는 장점이 있다. 
- 하지만 문자열이 계속 변하는 상황에서 concat() 메서드 혹은 "+"을 계속 이용하면 1. 새로운 문자열을 만드는 오버헤드, 2. 기존 문자열이 가비지 컬렉터에 의해 제거되는 오버헤드가 추가적으로 발생하여 비효율적이다.
- 이럴 때는 StringBuilder와 StringBuffer를 사용할 수 있다.

### String
- 짧은 문자열을 더할 경우만 사용 
### StringBuffer
- StringBuffer는 StringBuilder와 다르게 멀티 쓰레드프로그래밍에서 동기화(Synchronization)가 보장된다.
- 클래스에 static으로 선언한 문자열을 변경하거나, singleton으로 선언된 클래스에 선언되 문자열일 경우 사용 
### StringBuilder
- StringBuilder는 oracle 문서(https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html)에서 따르면 대부분의 환경에서 StringBuffer보다 빠르기 때문에 멀티 쓰레드 환경이 아니라면 해당 클래스를 사용하는 것이 좋다.

