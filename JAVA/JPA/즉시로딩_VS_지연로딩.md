## 즉시 로딩 vs 지연 로딩 
- fetch = FetchType.LAZY
    - 실제 사용할때 프록시 초기화 (실제 DB조회) 가 이루어짐
- fetch = FetchType.EAGER

## 특징 
- 가급적 지연 로딩만 사용(특히 실무에서) 
- 즉시 로딩을 적용하면 예상하지 못한 SQL이 발생
- 즉시 로딩은 JPQL에서 N+1 문제를 일으킨다. 
- @ManyToOne, @OneToOne은 기본이 즉시 로딩 -> LAZY로 설정
- @OneToMany, @ManyToMany는 기본이 지연 로딩
