# DI (의존성 주입)
- 의존성 주입(Dependency Injection, DI)은 코드의 유연성, 테스트 용이성, 결합도 감소 등을 위한 소프트웨어 개발 패턴
- injector는 파이썬에서 사용하는 의존성 주입 프레임워크 중 하나
```python
from injector import inject, Module, provider, singleton

class MyService:
    def __init__(self, dependency):
        self.dependency = dependency

class MyModule(Module):
    @singleton
    @provider
    def provide_my_service(self) -> MyService:
        return MyService(dependency)
```
```python
from injector import inject

class MyController:
    @inject
    def __init__(self, my_service: MyService):
        self.my_service = my_service
```
- MyController 클래스의 인스턴스가 생성될 때, MyService 인스턴스가 자동으로 주입
- 의존성 주입? 객체가 필요로 하는 의존성을 직접 생성하지 않고, 외부에서 주입 받는 디자인 패턴. 코드의 재사용성과 테스트 용이성을 높인다.
