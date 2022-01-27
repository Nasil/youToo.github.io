- exception
- Junit5
- java <T> class
```java
@GetMapping("/v2/members")
public Result membersV2() {
    List<Member> findMembers = memberService.findMembers();

    // JAVA8
    // Entity 내에서 필요한것만 노출
    List<MemberDto> collect = findMembers.stream()
            .map(m -> new MemberDto(m.getName()))
            .collect(Collectors.toList());

    return new Result(collect, collect.size());
}
  
@Data
@AllArgsConstructor
static class Result<T> {
    private T data; // data 밑에 리스트가 나옴
    private int count;
}
```
