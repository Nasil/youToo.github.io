# Dependency Injection

- database.py
```python
import contextlib

@contextlib.contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```


```python
from database import get_db

@router.get("/list")
def question_list():
    # 제너레이터 함수에 @contextlib.contextmanager 어노테이션을 적용했으므로 다음과 같이 with 문과 함께 사용
    # with 문을 벗어나는 순간 get_db 함수의 finally에 작성한 db.close() 함수가 자동으로 실행
    with get_db() as db:
        _question_list = db.query(Question).order_by(Question.create_date.desc()).all()
    return _question_list
```
