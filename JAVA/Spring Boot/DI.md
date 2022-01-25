# DI(Dependency Injection)이란? 
- DI(Dependency Injection)란 스프링이 다른 프레임워크와 차별화되어 제공하는 의존 관계 주입 기능으로, 객체를 직접 생성하는 게 아니라 외부에서 생성한 후 주입 시켜주는 방식이다.
- Inversion of Control 이라고도 하는 의존 관계 주입(Dependency Injection)
- DI(의존성 주입)를 통해서 모듈 간의 결합도가 낮아지고 유연성이 높아진다.
- 어떤 객체가 사용하는 의존 객체를 직접 만들어 사용하는게 아니라, 주입 받아 사용하는 방법이다. (new 연산자를 이용해서 객체를 생성하는 것이라고 생각하면 된다)

# 스프링 IoC 컨테이너란?
- 가장 중요한 인터페이스는 BeanFactory, ApplicatonContext이다
- 애플리케이션 컴포넌트의 중앙 저장소이다.
- 빈 설정 소스로 부터 빈 정의를 읽어들이고, 빈을 구성하고 제공한다.
- 빈들의 의존 관계를 설정해준다.(객체의 생성을 책임지고, 의존성을 관리한다)
### BeanFactory
- 스프링 빈 컨테이너에 접근하기 위한 최상위 인터페이스이다.
- Bean 객체를 생성하고 관리하는 인터페이스이다. 디자인패턴의 일종인 팩토리 패턴을 구현한 것이다. BeanFactory 컨테이너는 구동될 때 Bean 객체를 생성하는 것이 아니라. 클라이언트의 요청이 있을 때(getBean()) 객체를 생성한다.

### ApplicationContext
- ListableBeanFactory(BeanFactory에 하위 인터페이스이며, Bean을 Listable하게 보관하는 인터페이스를 말한다. 대표적으로 DefaultListableBeanFactory 클래스)를 상속하고 있으며,
- 여러 기능(ResourceLoader, ApplicationEventPublisher, MessageSource, Bean Lifecycle)을 추가로 제공한다.
- BeanFactory를 상속받은 interface이며, ApplicationContext 컨테이너는 구동되는 시점에 등록된 Bean 객체들을 스캔하여 객체화한다

 
 

# 강한 결합 vs 느슨한 결합


# 

- BookService와 BookRepository가 둘다 Bean으로 등록되어 있을 때 
- BookService의 생성자만 만들어주면 스프링 IoC 컨테이너가 BookRepository에 의존성 주입을 알아서 해준다.
- 스프링 4.3 이후부터는 단일 생성자인 경우는 @Autowired를 사용하지 않아도 된다
