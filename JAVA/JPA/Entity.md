
## @Entity
- @Entity가 붙은 클래스는 JPA가 관리, 엔티티라 한다. 
- JPA를 사용해서 테이블과 매핑할 클래스는 @Entity 필수
- 기본 생성자 필수(파라미터가 없는 public 또는 protected 생성자) 
- final 클래스, enum, interface, inner 클래스 사용X 
- 저장할 필드에 final 사용 X
- 외부에 제공하는 API에는 그대로 노출 하지 x 

## @Table 
- ibernate.hbm2ddl.auto 기능을 쓰면 스키마 자동 생성 (DDL 가능) // 개발 로컬서버에서만 사용할 것을 권장
- @Table(uniqueConstraints = {@UniqueConstraint( name = "NAME_AGE_UNIQUE", columnNames = {"NAME", "AGE"} )})
- @Column(nullable = false, length = 10)
- @Column(unique = true, length = 10)
- 기본 키 매핑: @Id
- 연관관계 매핑: @ManyToOne,@JoinColumn

## 자동 생성(@GeneratedValue) 
- IDENTITY: 데이터베이스에 위임, MYSQL 
- SEQUENCE: 데이터베이스 시퀀스 오브젝트 사용, ORACLE 
- @SequenceGenerator 필요
- TABLE: 키 생성용 테이블 사용, 모든 DB에서 사용
- @TableGenerator 필요
- AUTO: 방언에 따라 자동 지정, 기본값

