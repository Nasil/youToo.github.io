## String 연산

```java
String data = "ABC";
data += "DEF"; // 주의!!! ABCDEF 라는 새로운 객체가 생성됨, +를 많이 쓰면 String 객체가 그만큼 늘어남.
System.out.println(data);

// java.lang 의 StringBuffer, StringBuilder 사용
// 내부 버퍼 (데이터를 임시로 저장 하는 메모리)에 문자열을 저장해두고 연산
// StringBuffer : 멀티 스레드 환경에서 사용 가능함
// StringBuilder : 단일 스레드에서만 사용 가능

StringBuilder sb = new StringBuilder();
sb.append("JAVA");
sb.append("Programming");
System.out.println(sb.toString());

sb.insert(4, " ");
System.out.println(sb.toString());

sb.setCharAt(4, '6');
System.out.println(sb.toString());

sb.replace(6, 13, "BOOK");
System.out.println(sb.toString());

System.out.println(sb.length());

sb.delete(6, 13);
System.out.println(sb.length());
```

## String explode
```java
 String str = "문자1|문자2|문자3";

// 방법1
StringTokenizer st = new StringTokenizer(str, "|");
int maxLength = st.countTokens();
for (int i = 0; i < maxLength; i++) {
    System.out.println(st.nextToken());
}

// 방법2
st = new StringTokenizer(str, "|");
while (st.hasMoreElements()) {
    System.out.println(st.nextToken());
}
```
