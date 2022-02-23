# DI(Dependency Injection)이란? 
- DI(Dependency Injection)란 의존 관계 주입 기능으로, 객체를 직접 생성하는 게 아니라 외부에서 생성한 후 주입 시켜주는 방식이다.

# Ioc(Inversion of Control) 란?
- IoC(Inversion of Control)란 "제어의 역전" 이라는 의미로, 말 그대로 메소드나 객체의 호출작업을 개발자가 결정하는 것이 아니라, 외부에서 결정되는 것을 의미한다.
- IoC는 제어의 역전이라고 말하며, 간단히 말해 "제어의 흐름을 바꾼다"라고 한다.
- 객체의 의존성을 역전시켜 객체 간의 결합도를 줄이고 유연한 코드를 작성할 수 있게 하여 가독성 및 코드 중복, 유지 보수를 편하게 할 수 있게 한다.

- IOC 가 적용된 경우 객체의 생성을 특별한 관리 위임 주체에게 맡김. 사용자는 객체를 직접 생성하지 않고, 객체의 생명주기를 컨트롤 하는 주체는 다른 주체가 됨.
- 즉, 사용자의 제어권을 다른 주체에게 넘기는 것을 IOC(제어의 역전) 이라고 함
- 클래스 내부의 객체 생성 -> 의존성 객체의 메소드 호출이 아닌, 스프링에게 제어를 위임하여 스프링이 만든 객체를 주입 -> 의존성 객체의 메소드 호출 구조입니다. 스프링에서는 모든 의존성 객체를 스프링이 실행될때 만들어주고 필요한 곳에 주입해줍니다.

# 스프링 IoC 컨테이너란?
- 스프링에서는 객체를 Bean이라고 부르며, 프로젝트가 실행될때 사용자가 Bean으로 관리하는 객체들의 생성과 소멸에 관련된 작업을 자동적으로 수행해주는데 객체가 생성되는 곳을 스프링에서는 Bean 컨테이너라고 부른다.
- 스프링이 모든 의존성 객체를 스프링이 실행될때 다 만들어주고 필요한곳에 주입시켜줌으로써 Bean들은 싱글턴 패턴의 특징을 가지며, 
- 제어의 흐름을 사용자가 컨트롤 하는 것이 아니라 스프링에게 맡겨 작업을 처리하게 된다.

### BeanFactory
- 스프링 빈 컨테이너에 접근하기 위한 최상위 인터페이스이다.
- Bean 객체를 생성하고 관리하는 인터페이스이다. 디자인패턴의 일종인 팩토리 패턴을 구현한 것이다. BeanFactory 컨테이너는 구동될 때 Bean 객체를 생성하는 것이 아니라. 클라이언트의 요청이 있을 때(getBean()) 객체를 생성한다.

### ApplicationContext
- ListableBeanFactory(BeanFactory에 하위 인터페이스이며, Bean을 Listable하게 보관하는 인터페이스를 말한다. 대표적으로 DefaultListableBeanFactory 클래스)를 상속하고 있으며,
- 여러 기능(ResourceLoader, ApplicationEventPublisher, MessageSource, Bean Lifecycle)을 추가로 제공한다.
- BeanFactory를 상속받은 interface이며, ApplicationContext 컨테이너는 구동되는 시점에 등록된 Bean 객체들을 스캔하여 객체화한다

 
# 강한 결합 vs 느슨한 결합
- 객체 내부에서 다른 객체를 생성하는 것은 강한 결합도를 가지는 구조이다. A 클래스 내부에서 B 라는 객체를 직접 생성하고 있다면, B 객체를 C 객체로 바꾸고 싶은 경우에 A 클래스도 수정해야 하는 방식이기 때문에 강한 결합이다.
- 객체를 주입 받는다는 것은 외부에서 생성된 객체를 인터페이스를 통해서 넘겨받는 것이다. 이렇게 하면 결합도를 낮출 수 있고, 런타임시에 의존관계가 결정되기 때문에 유연한 구조를 가진다.
- SOLID 원칙에서 O 에 해당하는 Open Closed Principle 을 지키기 위해서 디자인 패턴 중 전략 패턴을 사용하게 되는데, 생성자 주입을 사용하게 되면 전략 패턴을 사용하게 된다.

# 의존성 주입 종류
- 의존성 주입의 종류로는 Field Injection, Setter Injection, Constructor Injection 방법이 있다.

### Field Injection
```java
@Component
public class SampleController {
    @Autowired
    private SampleService sampleService;
}
```
- Field Injection은 읽기 쉽고, 사용하기 편하다는 것 말고는 장점이 없다.

### Setter Injection
```java
@Component
public class SampleController {
    private SampleService sampleService;
 
    @Autowired
    public void setSampleService(SampleService sampleService) {
        this.sampleService = sampleService;
    }
}
```
- Setter Injection으로 의존관계 주입은 런타임시에 할 수 있도록 낮은 결합도를 가지게 구현되었다.
- 하지만 Setter Injection을 통해서 Service의 구현체를 주입해주지 않아도 Controller 객체는 생성이 가능하다.
- Controller 객체가 생성가능하다는 것은 내부에 있는 Service의 method 호출이 가능하다는 것인데, set을 통해 Service의 구현체를 주입해주지 않았으므로, NullPointerException 이 발생한다.
- 주입이 필요한 객체가 주입이 되지 않아도 얼마든지 객체를 생성할 수 있다는 것이 문제다.

### Constructor Injection
```java
@Component
public class SampleService {
    private SampleDAO sampleDAO;
 
    @Autowired
    public SampleService(SampleDAO sampleDAO) {
        this.sampleDAO = sampleDAO;
    }
}

@Component
public class SampleController {

	private final SampleService sampleService = new SampleService(new SampleDAO());
    
	...
}
```
- Spring Framework Reference에서 권장하는 방법은 생성자를 통한 주입이다.
- 생성자를 사용하는 방법이 좋은 이유는 필수적으로 사용해야하는 의존성 없이는 Instance를 만들지 못하도록 강제할 수 있기 때문이다.
- Spring 4.3버전부터는 Class를 완벽하게 DI Framework로부터 분리할 수 있다.
- 단일 생성자에 한해 @Autowired를 붙이지 않아도 된다.
- null을 주입하지 않는 한 NullPointerException 은 발생하지 않는다.
- 순환 의존성을 알 수 있다.

```java
@RequiredArgsConstructor
public class MemberApiController {

    private final MemberService memberService;

```
- final의 장점은 객체가 불변하도록 할 수 있는 점으로, 누군가가 Controller 내부에서 Service 객체를 바꿔치기 할 수 없다는 점이다.
- 어떠한 빈(Bean)에 생성자가 오직 하나만 있고, 생성자의 파라미터 타입이 빈으로 등록 가능한 존재라면 이 빈은 @Autowired 어노테이션 없이도 의존성 주입이 가능하기 때문에 위와 같이 소스가 간결해짐.
- RequiredArgsConstructor : 초기화 되지않은 final 필드나, @NonNull 이 붙은 필드에 대해 생성자를 생성해줌 (한생성자에 해당 변수 모두 몰아서)

참조 : https://velog.io/@gillog/Spring-DIDependency-Injection
