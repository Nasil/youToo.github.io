```
implementation 'org.springframework.boot:spring-boot-starter-security'
```

# spring security 6.0
```java
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurity {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .requestMatchers("/users/**", "/h2-console/**").permitAll()
            .and()
            .csrf().disable()
            .headers().frameOptions().disable(); // h2-console 화면 깨짐

        return http.build();
    }

    //passwordEncoder
    @Bean
    public BCryptPasswordEncoder encodePassword() {
        return new BCryptPasswordEncoder();
    }
}
```


https://mangkyu.tistory.com/76
https://blog.jiniworld.me/113
