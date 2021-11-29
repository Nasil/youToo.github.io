## JPA
- JAVA persistence API
- 자바 ORM 기술에 대한 API 표준 명세
- 자바 어플리케이션에서 관계형 데이터베이스를 사용하는 방식을 정의한 인터페이스
- EntityManager 를 통해 CRUD 처리
- JPA는 인터페이스의 모음 
- JPA 2.1 표준 명세를 구현한 3가지 구현체가 있음 : 하이버네이트, EclipseLink, DataNucleus


## ORM?
- Object-relational mapping(객체 관계 매핑)
- 객체는 객체대로 설계
- 관계형 데이터베이스는 관계형 데이터베이스대로 설계
- ORM 프레임워크가 중간에서 매핑
- 대중적인 언어에는 대부분 ORM 기술이 존재


## Hibernate
- JPA의 구현체, 인터페이스를 직접 구현한 라이브러리
- EJB - 엔티티 빈(자바 표준) --망--> 하이버네이트 (오픈 소스) --개선--> JPA(자바 표준)

## Spring Data JPA
- Spring module 을 이용하여 JPA 구현 
- JPA 를 추상화한 Repository 인터페이스 제공 


## CRUD
- 저장: jpa.persist(member)
- 조회: Member member = jpa.find(memberId)
- 수정: member.setName(“변경할 이름”)
- 삭제: jpa.remove(member)

## 같은 트랜잭션 안에서는 같은 엔티티를 반환
```
String memberId = "100";
Member member1 = jpa.find(Member.class, memberId); // SQL
Member member2 = jpa.find(Member.class, memberId); // 캐시 (1차 캐시와 동일(identity)성 보장)

pringln(m1 == m2) // true -> same
```

## JPA 성능 최적화
- DB Isolation Level 이 Read Commit 이어도 애플리케이션에서 Repeatable Read 보장

