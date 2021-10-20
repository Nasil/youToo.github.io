## HATEOAS 란?
- Hypermedia As The Engine Of Application State 의 약자로 서버가 클라이언트에게 하이퍼미디어를 통해 정보를 동적으로 제공해주는것을 말함.
- API 에서 리소스에 대해 어떠한 행동을 할 수 있는지 URL 을 전달하여 클라이언트가 참고하고 사용할 수 있도록 합니다. 이때, 해당 리소스의 상태에 따라 링크 정보가 바뀌며 동적으로 리소스를 구성합니다. 
- 예를 들어 예약의 상태에 따라 시술 완료가 가능하면 시술 완료 처리를 할수 있는 링크를 포함해 응답을 전달 합니다.

```
implementation 'org.springframework.boot:spring-boot-starter-hateoas'
```

강제 추가 필요
```
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;
```
```java
@GetMapping("/users/{id}")
public ResponseEntity<EntityModel<User>> retrieveUser(@PathVariable int id) {
    User user = userDaoService.findOne(id);
    if (user == null) {
        throw new UserNotFoundException(String.format("ID[%s] not found", id));
    }

    //SimpleBeanPropertyFilter filter = SimpleBeanPropertyFilter.filterOutAllExcept("id", "name", "joinDate", "password", "ssn");
    //FilterProvider filters = new SimpleFilterProvider().addFilter("UserInfo", filter);
    //MappingJacksonValue mapping = new MappingJacksonValue(user);
    //mapping.setFilters(filters);

    EntityModel entityModel = EntityModel.of(user);
    WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).retrieveAllUsers());
    entityModel.add(linkTo.withRel("all-users"));

    return ResponseEntity.ok(entityModel);
}
```
