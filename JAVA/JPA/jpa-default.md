
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
