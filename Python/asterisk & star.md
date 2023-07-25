# 임의의 파라미터 허용

## *grgs
- 모든 function 파라미터를 tuple로 제공
```python
def foo(*args):
  for a in args:
    print(a)
```

## Python double asterisk operator (dictionary unpacking).
- 키워드 인수를 dict 로 제공
```python
def bar(**kwargs):
  print(kwargs)
```
