
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

### 데이터베이스 스키마 자동 생성
- DDL을 애플리케이션 실행 시점에 자동 생성
- 데이터베이스 방언을 활용해서 데이터베이스에 맞는 적절한 DDL 생성
- 이렇게 생성된 DDL은 개발 장비에서만 사용 (운영에서는 사용하지 말것!!)
- 생성된 DDL은 운영서버에서는 사용하지 않거나, 적절히 다듬 은 후 사용
- 운영 장비에는 절대 create, create-drop, update 사용하면 안된다.
- 개발 초기 단계는 create 또는 update // 이것도 권장은 안함
- 테스트 서버는 update 또는 validate
- 스테이징과 운영 서버는 validate 또는 none
