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

# static 
