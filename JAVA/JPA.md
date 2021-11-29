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

## 트랜잭션을 지원하는 쓰기 지연(transactional write-behind)
- 트랜잭션을 커밋할때까지 insert sql 을 모음
- JDBC BATCH SQL 기능을 이용하여 한번에 sql 전송
```
transaction.begin(); // 시작

em.persist(memberA);
em.persist(memberB);
em.persist(memberC);

transaction.commit(); // 커밋
```

## 즉시로딩 vs 지연로딩
- 지연로딩 : 객체가 실제 사용될 때 로딩 
```
Memeber member = memberDAO.find(memberId); // select * from memeber;
Team team = member.getTeam();
String teanName = team.getName(); // select * from team
```
- 즉시로딩 : JOIN SQL 로 한번에 연관된 객체까지 미리 조회
```
Memeber member = memberDAO.find(memberId); // select * from memeber as m join team as t on ...
Team team = member.getTeam();
String teanName = team.getName(); 
```

## Dialect : 하이버네이트는 40가지 이상의 데이터베이스 방언(특이성) 지원
- H2 : org.hibernate.dialect.H2Dialect 
- Oracle 10g : org.hibernate.dialect.Oracle10gDialect 
- MySQL : org.hibernate.dialect.MySQL5InnoDBDialect 
 
