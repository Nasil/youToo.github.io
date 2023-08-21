

# https://github.com/pydantic/pydantic/issues/710
- pydantic.dataclasses.dataclass는 유효성 검사 기능이 있는 dataclasses.dataclass의 드롭인 대체품이지 pydantic.BaseModel을 대체하는 것이 아닙니다(초기화 훅 작동 방식에 약간의 차이가 있음).
- pydantic.BaseModel을 서브 클래싱하는 것이 더 나은 선택인 경우가 있습니다.


```python
from pydantic import BaseModel
from pydantic.dataclasses import dataclass
from typing import List

@dataclass
class A:
    x: List[int] = []

# Above definition with a default of `[]` will result in:
#   ValueError: mutable default <class 'list'> for field x is not allowed: use default_factory
# If you resolve this, the output will read as in the comments below.

class B(BaseModel):
    x: List[int] = []

print(A(x=[1, 2]), A(x=[3, 4])) # Output: A(x=[1, 2]) A(x=[3, 4])
print(B(x=[1, 2]), B(x=[3, 4])) # Output: x=[1, 2] x=[3, 4]
```
