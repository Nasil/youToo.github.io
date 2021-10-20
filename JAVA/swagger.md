```
implementation "io.springfox:springfox-boot-starter:3.0.0"
```

API 자동으로 문서 만들어짐
- http://localhost:8088/swagger-ui.html
- http://localhost:8088/api-docs


```
package com.example.firstproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api(){
        return new Docket(DocumentationType.SWAGGER_2);
    }
}
```
