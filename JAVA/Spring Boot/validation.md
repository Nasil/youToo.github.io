
## javax.validation
```
implementation('org.hibernate.validator:hibernate-validator:6.1.2.Final')
implementation('org.glassfish:jakarta.el:3.0.3')
```

### 예제
```
@NotEmpty(message = "회원 이름은 필수 입니다")
private String name;
```
