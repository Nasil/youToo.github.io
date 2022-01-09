## JPQL

```
TypedQuery<Member> query =  em.createQuery("SELECT m FROM Member m", Member.class); // 반환 타입이 명확할 때 사용

Member result = query.query.getResultList(); // 결과가 하나 이상일 때 리스트 반환, 결과가 없으면 빈 리스트 반환
Member result = query,getSingleResult(); // 결과가 정확히 하나일 때 단일 객체 반환, **결과가 없으면 에러, 둘 이상이면 에러, Spring JPA 에서는 null 일경우 에러처리 되어 있음

Query query = em.createQuery("SELECT m.username, m.age from Member m"); // 반환 타입이 명확하지 않을 때 사용
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
