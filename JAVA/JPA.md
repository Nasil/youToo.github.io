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
