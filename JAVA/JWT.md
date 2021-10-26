# JWT ? 
- https://jwt.io/

- HEADER : SIGNATURE 해싱하기 위한 알고리즘 
- PAYLOAD : 시스템에서 사용될 정보
- SIGNATURE : 토큰의 유효성 검증 

## 장점 : 
- 중앙의 인증서버, 데이터 스토어에 대한 의존성 없음, 
- 시스템 수평 확장 유리, 
- Base64 URL Safe Encoding > URL, Cookie, Header 모두 사용 가능 

## 단점 : 
- Payload의 정보가 많아지면 네트워크 사용량 증사, 데이터 설계 고려 필요
- 토큰이 클라이언트에 저장, 서버에서 클라이언트의 토큰을 조작 할 수 없음 


```
implementation 'org.springframework.boot:spring-boot-starter-security'
```

```
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/hello-world").permitAll()
                .anyRequest().authenticated();
    }
}

```
