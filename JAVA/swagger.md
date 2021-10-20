```
implementation "io.springfox:springfox-boot-starter:3.0.0"
```

API 자동으로 문서 만들어짐
- http://localhost:8088/swagger-ui.html
- http://localhost:8088/api-docs


```
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30); // open api spec 3.0
    }
}
```
