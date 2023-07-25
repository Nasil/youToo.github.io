# RESTful API

- models.py
```python
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Question(Base):
    __tablename__ = "question"

    id = Column(Integer, primary_key=True)
    subject = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False, default=datetime.utcnow)


class Answer(Base):
    __tablename__ = "answer"

    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    create_date = Column(DateTime, nullable=False, default=datetime.utcnow)
    question_id = Column(Integer, ForeignKey("question.id"))
    question = relationship("Question", backref="answers")
```

- database.py
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./myapi.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

- routers/quetion_router.py
```python
from typing import List
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Question
from schemas import QuestionBase
from database import get_db
from typing import Union, Optional
from fastapi.responses import JSONResponse

router = APIRouter()

# @router.get("/question/", response_model=list[QuestionBase])
# async def list_question(db: Session = Depends(get_db)):
#     db_question = db.query(Question).order_by(Question.create_date.desc()).all()
#     return db_question


@router.get("/question/", response_model=List[QuestionBase])
def read_questions(skip: Union[int, None] = 0, limit: Union[int, None] = 20, db: Session = Depends(get_db)):
    db_questions = db.query(Question).offset(skip).limit(limit).all()
    return db_questions


@router.post("/question/", response_model=QuestionBase)
async def create_question(question: QuestionBase, db: Session = Depends(get_db)):
    db_question = Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


@router.get("/question/{question_id}", response_model=QuestionBase)
async def read_question(
    question_id: int,
    q: str | None = Query(None, max_length=10, title="Sample query string", description="This is a sample query string.", deprecated=True, alias="q-str"),
    show: bool = False,
    type: str | None = Query(None, include_in_schema=False),
    db: Session = Depends(get_db)
):
    """
        - path_param & query_param mixed
        - bool 타입은 : 0, True, true, Yes, On & 1, False, false, No, Off
        - Validation use Query
        - 필수 & 유효성 : q: str = Query(..., max_length = 10)
        - Python only snake case, but api use Kebab Case usint alias.
        - hidden query 가 숨겨져 있습니다 type을 넣으면 됩니다.
    """
    if type:
        print(f'@type={type}');
    if q:
        print(f'@q = {q}')
    if (show == False):
        raise HTTPException(status_code=404, detail="No show. If you want view then add type show true.")
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question


@router.get("/question2/{question_id}", response_model=QuestionBase)
async def read_question2(question_id: int, q: list[str] | None = Query(None), db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question


@router.put("/question/{question_id}", response_model=QuestionBase)
async def update_question(question_id: int, question: QuestionBase, db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    for key, value in question.dict().items():
        setattr(db_question, key, value)
    db.commit()
    db.refresh(db_question)
    return db_question


@router.delete("/question/{question_id}")
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(db_question)
    db.commit()
    return {"detail": "Question deleted"}

```

- routers/answer_router.py
```python
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Answer
from schemas import AnswerBase, AnswerQuestionBase
from database import get_db
from sqlalchemy.orm import joinedload

router = APIRouter()

@router.get("/answer/", response_model=list[AnswerQuestionBase])
def list_answer(db: Session = Depends(get_db)):
    # db_question = db.query(Answer).order_by(Answer.create_date.desc()).all()
    db_answers = db.query(Answer).options(joinedload(Answer.question)).all()
    return db_answers

@router.post("/answer/", response_model=AnswerBase)
def create_answer(answer: AnswerBase, db: Session = Depends(get_db)):
    db_answer = Answer(**answer.dict())
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

```

- main.py
```python
from fastapi import FastAPI
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware
from routers import question_router, answer_router

from errors.http_error import http_error_handler
from errors.validation_error import http422_error_handler

def get_application() -> FastAPI:
    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # application.add_event_handler(
    #     "startup",
    #     create_start_app_handler(application, settings),
    # )
    # application.add_event_handler(
    #     "shutdown",
    #     create_stop_app_handler(application),
    # )

    application.add_exception_handler(HTTPException, http_error_handler)
    application.add_exception_handler(RequestValidationError, http422_error_handler)
    
    application.include_router(question_router.router)
    application.include_router(answer_router.router)

    return application


app = get_application()

```
