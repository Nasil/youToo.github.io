# Spring cloud config 란?
- Spring Cloud Config는 분산 시스템에서 외부화된 설정 정보를 서버 및 클라이언트에게 제공하는 시스템이다. 
- 설정 서버는(Config Server)는 외부에서 모든 환경에 대한 정보들을 관리해주는 중앙 서버이다. 
- 기본적으로 설정 정보 저장을 위해 git을 사용하도록 되어있어서 손쉽게 외부 도구들로 접근 가능하고, 버전 관리도 가능하다.

# Spring cloud config 특성
- Spring Cloud Config 는 분산 시스템에서 설정파일을 외부로 분리하는 것을 지원한다.
- Spring Cloud Config 를 사용하면 외부 속성을 중앙에서 관리할 수 있다.
- 스프링 애플리케이션은 물론, 다양한 애플리케이션에서 동일하게 설정파일을 사용할 수 있다.
- 설정파일 구성의 기본은 git 을 사용한다.
- 요약하면 스프링 프로젝트의 설정파일을 외부로 분리하여 다양한 환경에서 사용하도록 할 수 있고, 설정이 변경되었을 때 애플리케이션의 재배포 없이 적용가능하다 정도로 받아들였다. MSA 에서는 수많은 애플리케이션들이 생겨나게 되는데, 수많은 애플리케이션들의 설정파일을 한곳에서 중앙집중관리를 할 수 있도록 해주는 것이 장점인 것 같다.

# Spring cloud config 구성
- Spring Cloud Config Server(설정 서버): 버전 관리 레포지토리로 백업된 중앙 집중식 구성 노출을 지원한다.
- Spring Cloud Config Client(설정 클라이언트) : 애플리케이션이 설정 서버에 연결하도록 지원한다.

# Spring Cloud Config 설정 파일 우선 순위
- 설정 파일은 크게 다음의 위치에 존재할 수 있으며 다음의 순서대로 읽어진다. 나중에 읽어지는 것이 우선순위가 높다.
1. 프로젝트의 application.yaml
2. 설정 저장소의 application.yaml
3. 프로젝트의 application-{profile}.yaml
4. 설정 저장소의 {application name}/{application name}-{profile}
