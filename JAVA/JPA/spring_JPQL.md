# 스프링 데이터 JPA

```java
public interface MemberRepository extends JpaRepository<Member, Long> {
  // 쿼리 메소드 필터 조건
  // 스프링 데이터 JPA 공식 문서 참고: (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
  List<Member> findByUsernameAndAgeGreaterThan(String username, int age);
}
```
