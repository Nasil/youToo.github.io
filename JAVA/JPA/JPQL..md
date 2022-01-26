## JPQL

```java
TypedQuery<Member> query =  em.createQuery("SELECT m FROM Member m", Member.class); // 반환 타입이 명확할 때 사용

Member result = query.query.getResultList(); // 결과가 하나 이상일 때 리스트 반환, 결과가 없으면 빈 리스트 반환
Member result = query,getSingleResult(); // 결과가 정확히 하나일 때 단일 객체 반환, **결과가 없으면 에러, 둘 이상이면 에러, Spring JPA 에서는 null 일경우 에러처리 되어 있음

Query query = em.createQuery("SELECT m.username, m.age from Member m"); // 반환 타입이 명확하지 않을 때 사용
```

### Select
```java
// SELECT m FROM Member m -> 엔티티 프로젝션
Lint<Member> result = em.createQuery("select m from Member m", Member.class).getResultList();

// SELECT m.team FROM Member m -> 엔티티 프로젝션
// 묵시적말고 명시적 조인 사용할것

// SELECT m.address FROM Member m -> 임베디드 타입 프로젝션
List<Address> result = em.createQuery("select m.address from Member m", Address.class).getResultList();

// SELECT m.username, m.age FROM Member m -> 스칼라 타입 프로젝션
List<MemberDTO> result = em.createQuery("select new {패키지명}.MemberDTO(m.username, m.age) from Member m", MemberDTO.class).getResultList();
MemberDTO memberDTO = result.get(0);
System.out.println(memberDTO.getUsername());
System.out.println(memberDTO.getAge());
```

### Paging
```java
String jpql = "select m from Member m order by m.name desc";
 List<Member> resultList = em.createQuery(jpql, Member.class)
 .setFirstResult(10)
 .setMaxResults(20)
 .getResultList();
```

### Join
```
JPQL: SELECT m, t FROM Member m JOIN m.team t on t.name = 'A' 
SQL: SELECT m.*, t.* FROM Member m JOIN Team t ON m.TEAM_ID=t.id and t.name='A'
```
### 연관관계 없는 엔티티 외부 조인
```
JPQL: SELECT m, t FROM Member m JOIN Team t on m.username = t.name
SQL: SELECT m.*, t.* FROM Member m JOIN Team t ON m.username = t.name
```
### 패치 조인
```
JPQL: SELECT m from Member m join fetch m.team 
SQL: SELECT M.*, T.* FROM MEMBER M INNER JOIN TEAM T ON M.TEAM_ID=T.ID
```
- 페치 조인을 사용할 때만 연관된 엔티티도 함께 조회(즉시 로딩) 
- 페치 조인은 객체 그래프를 SQL 한번에 조회하는 개념


### 서브쿼리
```
//팀A 소속인 회원 
select m from Member m where exists (select t from m.team t where t.name = ‘팀A');
//전체 상품 각각의 재고보다 주문량이 많은 주문들
select o from Order o where o.orderAmount > ALL (select p.stockAmount from Product p);
// 어떤 팀이든 팀에 소속된 회원
select m from Member m where m.team = ANY (select t from Team t);
```
- JPA는 WHERE, HAVING 절에서만 서브 쿼리 사용 가능
- SELECT 절(스칼라서브쿼리)도 가능 - 하이버네이트에서 지원
- FROM 절의 서브 쿼리(인라인뷰)는 현재 JPQL에서 불가능,  조인으로 풀 수 있으면 풀어서 해결


### 묵시적 조인 vs 명시적 조인
- 명시적 조인 쓸것.
```
//상태필드

//연관 필드
//단일 값 연관 경로: 묵시적 내부 조인(inner join) 발생, 탐색O, @ManyToOne, @OneToOne 
// Oerder N : Member 1 
select o.member from Order o; // sql : select m.* from Orders o inner join Member m on o.member_id = m.id
//컬렉션 값 연관 경로: 묵시적 내부 조인 발생, 탐색X, @OneToMany, @ManyToMany 
```

### 타입
- ENUM: jpabook.MemberType.Admin (패키지명 포함) 

