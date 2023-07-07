
# 데코레이터
- 파이썬에서 데코레이터를 사용하면 코드를 중복하지 않고도, 함수나 메소드의 동작을 쉽게 변경하거나 확장할수 잇음.
- 로깅(loggin), 타이밍(timeit), 유닛 테스팅(unit test), 웹 라우팅(web routing), 쓰레드(thread)나 프로세스(process) 안전성 등의 공통적인 패턴에서 유용하게 사용
- 데코레이터는 함수 뿐만 아니라 클래스에도 적용 가능
- 인자를 받는 데코레이터를 만드는 것도 가능
- 이렇게 복잡한 데코레이터를 만들기 위해서는 데코레이터 팩토리를 사용하는데, 이는 데코레이터를 반환하는 함수.

```python
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
```

```console
Something is happening before the function is called.
Hello!
Something is happening after the function is called.
```

- 이 데코레이터는 입력으로 func라는 함수를 받아서, func가 호출되기 전후로 메시지를 출력하는 wrapper 함수를 반환
- @my_decorator라는 표현은 say_hello 함수에 my_decorator 데코레이터를 적용하겠다는 의미
