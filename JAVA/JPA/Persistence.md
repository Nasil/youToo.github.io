## JPA 영속성 컨텍스트 (persistence)
```
    /**
     * JPA 원래 호출방법 (spring framework 를 이용하지 않고)
     *
     * @param args
     */
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");
        EntityManager em = emf.createEntityManager();
        EntityTransaction tx = em.getTransaction();
        tx.begin();

        try {
            // Insert
            Member memberA = new Member();
            Member memberB = new Member();
            memberA.setName("HelloA");
            memberB.setName("HelloB:);
            em.persist(memberA); // 영속됨, 1차 캐시 저장 & 쓰기지연 SQL 저장소에 저장
            em.persist(memberB); // 영속됨, 1차 캐시 저장 & 쓰기지연 SQL 저장소에 저장

            // Fine list
            List<Member> findMembers = em.createQuery("select m from Member as m", Member.class) 
                    .setFirstResult(0)
                    .setMaxResults(10)
                    .getResultList(); // JPQL 쿼리
            for (Member m : findMembers) {
                System.out.println(m);
            }


            // Find one
            Member findMember = em.find(Member.class, 1L);
            System.out.println("find id : " + findMember.getId());
            System.out.println("find name : " + findMember.getName());

            // Modify
            findMember.setName("HelloJPA"); // Dirty Checking, 1차 캐시에서 스냅샷 비교 후 쓰기지연 SQL 저장소에 저장

            // Delete
            em.remove(findMember);
            
            tx.commit(); // 쓰기지연 SQL 저장소에 한번에 반영 flush

        } catch (Exception e) {
            tx.rollback();
        } finally {
            em.close();
        }
        emf.close();

    }

```

## flush (쓰기지연 SQL 저장소 -> JDBC 에 반영)
- em.flush() : 직접 호출 
- 트랜잭션 커밋 : 플러시 자동 호출 
- JPQL 쿼리 실행 : 플러시 자동 호출
```
em.setFlushMode(FlushModeType.COMMIT)
```
- FlushModeType.AUTO : 커밋이나 쿼리를 실행할 때 플러시 (기본값) 
- FlushModeType.COMMIT : 커밋할 때만 플러시

## 준영속
- em.detach(entity) : 특정 엔티티만 준영속 상태로 전환 
- em.clear() : 영속성 컨텍스트를 완전히 초기화 
- em.close() : 영속성 컨텍스트를 종료


##  
- em.flush
- em.clear

