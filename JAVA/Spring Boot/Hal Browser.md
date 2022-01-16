## HAL(Hypertext Application Language) Browser

- REST API 설계시 Response 메시지에 부가 정보들을 담아서 함께 제공하는 방식. 
- 즉, HAL을 API Response 메시지에 적용하면 그 메시지가 JSON 포맷이건 XML 포맷이건 API를 쉽게 (검색)찾을 수 있는 메타 정보들을 포함시킬 수 있다는 것이다. 

```
implementation 'org.springframework.data:spring-data-rest-hal-browser:3.3.7.RELEASE'
```

http://localhost:8088/browser/index.html#/
