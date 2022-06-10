## spring-boot-starter-test
- junit: 테스트 프레임워크, 스프링 부트 2.2부터 junit5( jupiter ) 사용
    - 과거 버전은 vintage
    - https://www.jetbrains.com/ko-kr/lp/devecosystem-2021/java/ 
- mockito: 목 라이브러리
- assertj: 테스트 코드를 좀 더 편하게 작성하게 도와주는 라이브러리
    - https://joel-costigliola.github.io/assertj/index.html
- spring-test: 스프링 통합 테스트 지원


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
- ctrl + shift + t (go to test)

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
        assertEquals(savedId, findMember.getId());
        assertEquals(member, findMember); // 중요! 같음 영속성 컨텍스트이기 때문에 (1차캐시), select skip 함
    }
}
```

# cont tdd
```java

@Slf4j
@Transactional
@SpringBootTest
@RunWith(SpringRunner.class)
class UserContTest {

    private MockHttpSession session;
    private MockHttpServletRequest request;

    @Autowired
    private UserController userController;

    @Before
    public void setUp() throws Exception {
    }

    @Test
    public void findMallConfig() throws Exception {
        session = new MockHttpSession();
        session.setAttribute("user", "aaa");


        // mockMvc 생성
        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        MockHttpServletRequestBuilder builder = MockMvcRequestBuilders.get("/user/front").session(session);
        mockMvc.perform(builder).andDo(print());

        //mockMvc.perform(MockMvcRequestBuilders.get("/front/config").session(session)).andDo(print());
    }

    @After
    public void clean() {
        session.clearAttributes();
    }

}
```
