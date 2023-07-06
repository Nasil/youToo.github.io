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

# staticmethod ? 
```python
class Blog:
  def __init__(self, name="My blog"):
    self.name = name

  @staticmethod
  def to_uppper(text: str):
    print(text.upper())

blog = Blog()
print(blog.name)
print(Blog.to_upper(blog.name))
```
