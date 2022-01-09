## JPQL

```
TypedQuery<Member> query =  em.createQuery("SELECT m FROM Member m", Member.class); // 반환 타입이 명확할 때 사용

Member result = query.query.getResultList(); // 결과가 하나 이상일 때 리스트 반환, 결과가 없으면 빈 리스트 반환
Member result = query,getSingleResult(); // 결과가 정확히 하나일 때 단일 객체 반환, **결과가 없으면 에러, 둘 이상이면 에러, Spring JPA 에서는 null 일경우 에러처리 되어 있음

Query query = em.createQuery("SELECT m.username, m.age from Member m"); // 반환 타입이 명확하지 않을 때 사용
```

- SELECT m FROM Member m -> 엔티티 프로젝션
```
Lint<Member> result = em.createQuery("select m from Member m", Member.class).getResultList();
```
- SELECT m.team FROM Member m -> 엔티티 프로젝션
```
// 묵시적말고 명시적 조인 사용할것
```
- SELECT m.address FROM Member m -> 임베디드 타입 프로젝션
```
List<Address> result = em.createQuery("select m.address from Member m", Address.class).getResultList();
```
- SELECT m.username, m.age FROM Member m -> 스칼라 타입 프로젝션
```
List<MemberDTO> result = em.createQuery("select new jpql.MemberDTO(m.username, m.age) from Member m", MemberDTO.class).getResultList();
MemberDTO memberDTO = result.get(0);
System.out.println(memberDTO.getUsername());
System.out.println(memberDTO.getAge());
```

  

## QueryDSL 
- 오픈소스
```
JPAFactoryQuery query = new JPAQueryFactory(em);
QMember m = QMember.member; 
List<Member> list = 
  query.selectFrom(m)
 .where(m.age.gt(18)) 
 .orderBy(m.name.desc())
 .fetch();
```
