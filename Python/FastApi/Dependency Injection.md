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

- 공식문서 : https://fastapi.tiangolo.com/tutorial/dependencies/


# Class DI
```python
class PagingParams:
    def __init__(self, q: str | None = None, page: Union[int, None] = 1, limit: Union[int, None] = 100):
        self.q = q
        self.limit: int = limit
        self.skip: int = (page - 1) * limit

# Class DI Annotated[PagingParams, Depends(PagingParams)] -> Annotated[PagingParams, Depends()]
@router.get("/question2/", response_model=List[QuestionBase])
async def read_questions2(params: Annotated[PagingParams, Depends()], db: Session = Depends(get_db)):
    print(params)
    db_questions = db.query(Question).offset(
        params.skip).limit(params.limit).all()
    return db_questions
```

# Param DI
```python
async def paging_parameters(q: str | None = None, page: Union[int, None] = 1, limit: Union[int, None] = 100):
    skip: int = (page - 1) * limit
    return {"q": q, "skip": skip, "limit": limit}

PagingDep = Annotated[dict, Depends(paging_parameters)]

# Param DI
@router.get("/question/", response_model=List[QuestionBase])
async def read_questions(params: PagingDep, db: Session = Depends(get_db)):
    print(params)
    db_questions = db.query(Question).offset(
        params["skip"]).limit(params["limit"]).all()
    return db_questions
```
