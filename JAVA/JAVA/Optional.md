

# Optional
- java8 에서 도입됨
```java
// null을 담고 있는, 한 마디로 비어있는 Optional 객체를 얻어옵니다. 이 비어있는 객체는 Optional 내부적으로 미리 생성해놓은 싱글턴 인스턴스입니다.
Optional<Member> maybeMember = Optional.empty();

/ /null이 아닌 객체를 담고 있는 Optional 객체를 생성합니다. null이 넘어올 경우, NPE를 던지기 때문에 주의해서 사용해야 합니다.
Optional<Member> maybeMember = Optional.of(aMember);

// null인지 아닌지 확신할 수 없는 객체를 담고 있는 Optional 객체를 생성합니다.
Optional<Member> maybeMember = Optional.ofNullable(aMember); 
Optional<Member> maybeNotMember = Optional.ofNullable(null);
```

### null 체크
```
String text = getText();
Optional<String> maybeText = Optional.ofNullable(text);
int length;
if (maybeText.isPresent()) {
	length = maybeText.get().length();
} else {
	length = 0;
}
```

### 함수형 null 체크
```java
int length = Optional.ofNullable(getText()).map(String::length).orElse(0);
```
