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
    with get_db() as db:
        _question_list = db.query(Question).order_by(Question.create_date.desc()).all()
    return _question_list
```
