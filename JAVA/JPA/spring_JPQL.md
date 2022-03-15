# 스프링 데이터 JPA

## 메소드 이름으로 쿼리 생성
- 너무 길어지는 경우 비추. 두개 and 조건 정도만
```java
public interface MemberRepository extends JpaRepository<Member, Long> {
  // 쿼리 메소드 필터 조건
  // 스프링 데이터 JPA 공식 문서 참고: (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
  List<Member> findByUsernameAndAgeGreaterThan(String username, int age);
}
```

### JPA NamedQuery
- 실무에서는 잘 안씀
```java
@Entity
@NamedQuery(
  name="Member.findByUsername",
  query="select m from Member m where m.username = :username")
  public class Member {
...
}
```
