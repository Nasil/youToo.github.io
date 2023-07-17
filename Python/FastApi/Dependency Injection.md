# Dependency Injection

- database.py
```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```


```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

@router.get("/list")
def question_list(db: Session = Depends(get_db)):
    _question_list = db.query(Question).order_by(Question.create_date.desc()).all()
    return _question_list
```
