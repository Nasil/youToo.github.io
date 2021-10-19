번역

```java
@Bean // SpringBootApplication 에 bean 을 등록시 해당 값이 초기화시 실행됨
public LocaleResolver localeResolver() {
    SessionLocaleResolver localeResolver = new SessionLocaleResolver();
    localeResolver.setDefaultLocale(Locale.KOREA);
    return localeResolver;
}
```

```
@Autowired
private MessageSource messageSource;

@GetMapping("/hello-world-internationalized")
public String helloWorldInternationalized(@RequestHeader(name="Accept-Language", required = false) Locale locale) {
    return messageSource.getMessage("greeting.message", null, locale);
}

```
