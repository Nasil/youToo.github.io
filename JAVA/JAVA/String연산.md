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

## String replace
```java
String str = "test programming";
str = str.replace("test", "java");
System.out.println(str); // java programming
```

## String 자르기
```java
str = str.substring(0, 4);
System.out.println(str); // java
```

## String 대소문자 변환 및 비교
```java
String str = "java";
String upperStr = str.toUpperCase();
System.out.println(upperStr);
String lowerStr = str.toLowerCase();
System.out.println(lowerStr);
if (upperStr.equalsIgnoreCase(lowerStr)) {
    System.out.println("대소문자 구분안하고 동일");
}
```

## String 찾기
```java
String str = "자바 프로그래밍";
int location = str.indexOf("프로그래밍"); // 0~ 찾은 첫번째 수
System.out.println(location); // 3
int locationEmpty = str.indexOf("없음");
System.out.println(locationEmpty); // -1
```

## String 위치로 찾기
```java
String subject = "자바 프로그래밍";
char charValue = subject.charAt(3); // 0~
System.out.println(charValue); // 프
```

## trim
```java
System.out.println(" test ".trim());
```

## 정규식
```java
String req = "^[0-9]+$";
String data = "23423523";
boolean result = Pattern.matches(req, data);
if (result) {
    System.out.println("숫자만 있음");
}
```

## Byte -> String
```java
byte[] bytes = {72, 101, 108, 108, 111, 13, 10};
String str1 = new String(bytes);
System.out.println(str1); // Hello

String str2 = new String(bytes, 2, 2);
System.out.println(str2); // ll
```
