```python
from dataclasses import dataclass

@dataclass
class UserDTO:
    name: str
    email: str
```

```python
user = UserDTO(name='John Doe', email='john@example.com')
print(user.name)  # 'John Doe'
```
