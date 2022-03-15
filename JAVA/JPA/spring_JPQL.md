# 스프링 데이터 JPA

### 메소드 이름으로 쿼리 생성
- 너무 길어지는 경우 비추. 두개 and 조건 정도만
```java
public interface MemberRepository extends JpaRepository<Member, Long> {
  // 쿼리 메소드 필터 조건
  // 스프링 데이터 JPA 공식 문서 참고: (https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation)
  List<Member> findByUsernameAndAgeGreaterThan(String username, int age);
}
```

### JPA NamedQuery
- 참고: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#repositories.query-methods.query-lookup-strategies
```java
// 필요하면 전략을 변경할 수 있지만 권장하지 않는 방법
@Entity
@NamedQuery(
  name="Member.findByUsername",
  query="select m from Member m where m.username = :username")
public class Member {

}
```

### @Query, 리포지토리 메소드에 쿼리 정의하기
```java
// 메서드에 JPQL 쿼리 작성
// 
@Query("select m from Staff m where m.username= :username and m.age = :age")
List<Staff> findUser(@Param("username") String username, @Param("age") int age);
```

