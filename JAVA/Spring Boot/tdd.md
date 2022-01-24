## intellij tdd 설정 방법
https://velog.io/@max9106/IntelliJ-Live-Template

- Live Template
```java
@Test
public void $methodName$() throws Exception { 
    //given 
    $END$ 
    //when 
     
    //then 
}
```

## Gradle 
```
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-devtools'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'com.github.gavlyukovskiy:p6spy-spring-boot-starter:1.7.1'
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'com.h2database:h2'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'

    //JUnit4 로 동작하게 하려면
    testImplementation("org.junit.vintage:junit-vintage-engine") {
        exclude group: "org.hamcrest", module: "hamcrest-core"
    }
}

test {
    useJUnitPlatform()
}

```

# intellij TDD 파일 생성 단축키
- ctrl + shift + t

# Junit5 예제
```java
@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;


    @Test
    @Rollback(false) // 직접 실행
    public void save() throws Exception {
        //given
        Member member = new Member();
        member.setName("memberA");

        //when
        Long savedId = memberRepository.save(member);
        Member findMember = memberRepository.find(savedId);

        //then
        assertEquals(member, memberRepository.find(savedId));
    }
}
```
