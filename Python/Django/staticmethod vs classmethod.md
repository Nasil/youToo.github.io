# Instance method ?
- 가장 기본이 되는 클래스의 메서드
- 첫번째 인자로는 항상 self가온다. 해당 클래스의 인스턴스 값이 넘어오게 됨
```python
class Blog:
  def __init__(self, name="My Blog"):
    self.name = name
  def print_name(self):
    print(self.name)

blog = Blog()
blog.print_name()
```

# staticmethod (정적 메소드) ? 
- 유틸리티성 함수임에도 클래스와 연관이 높은 함수라면 @staticmethod 를 활용해 클래스 내에 위치시켜서 연관이 깊다고 의미부여 가능
- 인스턴스 메서드와 달리 self 같은 인자가 필요하지 않음
- 인스턴스 속성에도 접근할수 없음
```python
class Blog:
  def __init__(self, name="My blog"):
    self.name = name

  @staticmethod
  def to_uppper(text: str):
    print(text.upper())

blog = Blog()
print(blog.name)
Blog.to_uppper(blog.name)
```

## util 함수를 모듈 형으로 개발
- 유틸리티 함수를 작성할 때는 해당 함수가 어디서든 재사용 가능하도록 일반적인 로직을 구현하고,
- 프로젝트 전반에 걸쳐 동일한 패턴이 반복되는 경우 이를 줄이는데 주로 사용
- 이렇게 하면 코드의 중복성을 줄이고 유지보수성을 높일 수 있음
```python
# utils.py
def custom_utility_function(arg1, arg2):
    # 구현...
    return result
```
```python
from .utils import custom_utility_function

def some_view(request):
    # ...
    result = custom_utility_function(arg1, arg2)
    # ...
```

# static 
