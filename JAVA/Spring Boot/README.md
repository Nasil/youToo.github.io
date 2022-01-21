- thymeleaf 공식 사이트: https://www.thymeleaf.org/
- 스프링 공식 튜토리얼: https://spring.io/guides/gs/serving-web-content/
- 스프링부트 메뉴얼: https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-template-engines


# Spring Framework 
- 자바 플랫폼을 위한 오픈 소스 애플리케이션 프레임워크. 
- EJB(Enterprise Java Beans:시스템 구현을 위한 서버측 컴포넌트 모델) 컨테이너 사용으로 인한 개발 생선성과 유지 보수성 저하와 테스트와 배포의 어려움을 해결하기 위해 개발되었다. 
- Spring은 자바 객체와 라이브러리들을 관리해주며, 톰캣과 같은 WAS 가 내장되어 있어 자바 웹 어플리케이션을 구동할 수 있습니다.
- Spring은 경량 컨테이너로 자바 객체를 직접 Spring 안에서 관리합니다. 객체의 생성 및 소멸과 같은 생명 주기(Life cycle)을 관리하며, Spring 컨테이너에서 필요한 객체를 가져와 사용합니다.


# Spring Boot
- CoC: Convention over Configuration : 일일히 관련 라이브러리를 찾아 추가할 필요 없이 spring-boot-starter-web을 추가하면 관련 라이브러리를 받아온다.
- 내장 Tomcat, Jetty, Undertow: Tomcat, Jetty, Undertow와 같은 서버를 내장하고 있어 특별한 설정 없이 Web Starter의 의존성만 추가해주면 @SpringBootApplication 어노테이션이 선언되어 있는 클래스의 main() 메소드를 실행하는 것만으로 서버를 구동시킬 수 있다. 
- 설정의 자동화: 어노테이션을 선언하여 스프링에서 자주 사용했던 설정들을 자동으로 등록한다. 초기에는 @EnableAutoConfiguration 어노테이션, 현재는 @EnableAutiConfiguration + @SpringBootConfiguration + @ComponentScan으로 구성되어 있는 @SpringApplication 어노테이션을 사용한다.
- 라이브러리 버전 자동 관리: pom.xml에 스프링 부트 버전을 입력하면 스프링 라이브러리뿐만 아니라 서드 파티 라이브러리들도 호환되는 버전으로 자동으로 다운된다.
- 단독으로 실행이 가능한 JAR: WAR 파일로 패키징 해야하는 웹 프로젝트와 달리, 내장 Tomcat을 지원하기 때문에 JAR파일로 패키징 하여 웹 애플리케이션 실행 가능하다. 

 
![](http://melonicedlatte.com/assets/images/2021_3Q/spring_architect.png)
