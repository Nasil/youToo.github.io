# DI(Dependency Injection)이란? 
- Inversion of Control 이라고도 하는 의존 관계 주입(Dependency Injection)이라고도 하며, 
- 어떤 객체가 사용하는 의존 객체를 직접 만들어 사용하는게 아니라, 주입 받아 사용하는 방법이다. (new 연산자를 이용해서 객체를 생성하는 것이라고 생각하면 된다)

# 스프링 IoC 컨테이너란?
- 가장 중요한 인터페이스는 BeanFactory, ApplicatonContext이다
- 애플리케이션 컴포넌트의 중앙 저장소이다.
- 빈 설정 소스로 부터 빈 정의를 읽어들이고, 빈을 구성하고 제공한다.
- 빈들의 의존 관계를 설정해준다.(객체의 생성을 책임지고, 의존성을 관리한다)
 

# 강한 결합 vs 느슨한 결합


# 

- BookService와 BookRepository가 둘다 Bean으로 등록되어 있을 때 
- BookService의 생성자만 만들어주면 스프링 IoC 컨테이너가 BookRepository에 의존성 주입을 알아서 해준다.
- 스프링 4.3 이후부터는 단일 생성자인 경우는 @Autowired를 사용하지 않아도 된다
