
# EntityManagerFactory
- 엔티티 매니저 팩토리는 하나만 생성해서 애플리케이션 전체에 서 공유
- 엔티티 매니저는 쓰레드간에 공유X (사용하고 버려야 한다). 
- JPA의 모든 데이터 변경은 트랜잭션 안에서 실행 (주요!!!!!!)


# jpa 기본 문법 
- 보통은 spring data jpa 를 쓰기 때문에 아래 코드는 참조.
```java
EntityManageFactory emf = persistence.createEntityManagerFactory("hello");
EntityManager em = emf.createEntityManager();
EntityTracsaction tx = em.getTransaction();
tx.begin();

try {
    Member member = new Member();
    member.setId(2L);
    member.setName("helloB");
    
    em.persist(member); // 저장됨
    
    Mamber findMember = em.find(Member.class, 1L); // 조회
    findMember.setName("helloC"); // 수정
    
    tx.commit(); // db 반영
} catch (Exception e) {
  tx.rollback();
} finally {
  em.close();
}

emf.close();
```

# jpql 
- JPA를 사용하면 엔티티 객체를 중심으로 개발 • 문제는 검색 쿼리
- 검색을 할 때도 테이블이 아닌 엔티티 객체를 대상으로 검색 모든 DB 데이터를 객체로 변환해서 검색하는 것은 불가능
- 애플리케이션이 필요한 데이터만 DB에서 불러오려면 결국 검 색 조건이 포함된 SQL이 필요
- SQL과 문법 유사, SELECT, FROM, WHERE, GROUP BY, HAVING, JOIN 지원
- JPQL은 엔티티 객체를 대상으로 쿼리 vs SQL은 데이터베이스 테이블을 대상으로 쿼리
- 테이블이 아닌 객체를 대상으로 검색하는 객체 지향 쿼리
- SQL을 추상화해서 특정 데이터베이스 SQL에 의존X

```
EntityManageFactory emf = persistence.createEntityManagerFactory("hello");
EntityManager em = emf.createEntityManager();
EntityTracsaction tx = em.getTransaction();
tx.begin();

try {
    Member member = new Member();
    member.setId(2L);
    member.setName("helloB");
    
    em.persist(member); // 저장됨
    
    List<Member> result = em.createQuery("select m from Member as m", Member.class).getFirstResult(5); // jpql
    
    tx.commit(); // db 반영
} catch (Exception e) {
  tx.rollback();
} finally {
  em.close();
}

emf.close();

```
