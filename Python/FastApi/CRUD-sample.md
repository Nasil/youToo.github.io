# RESTful API

- routers.question_router.py
``` python
import httpx

from enum import Enum
from uuid import UUID
from datetime import datetime, time, timedelta

from typing import List
from fastapi import APIRouter, HTTPException, Depends, Query, Path, Body, Cookie, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Question
from schemas import QuestionBase, User
from database import get_db
from typing import Union, Literal, Annotated


router = APIRouter()


async def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def verify_key(x_key: str = Header(...)):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key


@router.get("/questions/", response_model=List[QuestionBase])
def read_questions(
    skip: Union[int, None] = 0,
    limit: Union[int, None] = 20,
    db: Session = Depends(get_db),
):
    db_questions = db.query(Question).offset(skip).limit(limit).all()
    return db_questions


class PagingParams:
    def __init__(self, q: str | None = None, page: Union[int, None] = 1, limit: Union[int, None] = 100):
        self.q = q
        self.limit: int = limit
        self.skip: int = (page - 1) * limit


@router.get("/questions2/", response_model=List[QuestionBase])
async def read_questions2(params: Annotated[PagingParams, Depends()], db: Session = Depends(get_db)):
    """
        - Class DI
    """
    print(params)
    db_questions = db.query(Question).offset(
        params.skip).limit(params.limit).all()
    return db_questions


async def paging_parameters(q: str | None = None, page: Union[int, None] = 1, limit: Union[int, None] = 100):
    skip: int = (page - 1) * limit
    return {"q": q, "skip": skip, "limit": limit}

PagingDep = Annotated[dict, Depends(paging_parameters)]


@router.get("/questions3/", response_model=List[QuestionBase])
async def read_questions3(params: PagingDep, db: Session = Depends(get_db)):
    """
        - Param DI
    """
    print(params)
    db_questions = db.query(Question).offset(
        params["skip"]).limit(params["limit"]).all()
    return db_questions


@router.post("/question/", response_model=QuestionBase)
async def create_question(question: QuestionBase, importance: int = Body(...), db: Session = Depends(get_db)):
    # async def create_question(question: QuestionBase, db: Session = Depends(get_db)):
    # async def create_question(question: QuestionBase = Body(..., embed=True), db: Session = Depends(get_db)):
    """
        - importance 는 schama로 만들지 않고 body 안에 넣을수 있다. 단 question 이 parent key 로 잡히게됨
        - question 만 있는 경우 parent key 만들고 싶으면 embed=True 넣으면 됨
    """
    if importance:
        print(f'@importance = {importance}')
    db_question = Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question


@router.get("/question/{question_id}", response_model=QuestionBase, response_model_exclude={"id"})
async def read_question(
    question_id: int,
    q: str | None = Query(None, max_length=10, title="Sample query string",
                          description="This is a sample query string.", deprecated=True, alias="q-str"),
    show: bool = False,
    type: str | None = Query(None, include_in_schema=False),
    db: Session = Depends(get_db)
):
    """
        - response_model_include 결과에 포함
        - response_model_exclude 결과에 제외
        - path_param & query_param mixed
        - bool 타입은 : 0, True, true, Yes, On & 1, False, false, No, Off
        - Validation use Query
        - 필수 & 유효성 : q: str = Query(..., max_length = 10)
        - Python only snake case, but api use Kebab Case usint alias.
        - hidden query 가 숨겨져 있습니다 type을 넣으면 됩니다.
    """
    if type:
        print(f'@type={type}')
    if q:
        print(f'@q = {q}')
    if (show == False):
        raise HTTPException(
            status_code=404, detail="No show. If you want view then add type show true.")
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    return db_question


@router.get("/question2/{question_id}", response_model=QuestionBase)
async def read_question2(question_id: int = Path(..., lt=10000, title="This is question_id", description="This is a question_id"), q: list[str] | None = Query(None), db: Session = Depends(get_db)):
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


@router.put("/user/{user_id}")
async def update_user(user_id: int, user: User = Body(..., embed=True), db: Session = Depends(get_db)):
    results = {"user": User}
    return results


@router.delete("/question/{question_id}")
async def delete_question(question_id: int, db: Session = Depends(get_db)):
    db_question = db.query(Question).filter(Question.id == question_id).first()
    if db_question is None:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(db_question)
    db.commit()
    return {"detail": "Question deleted"}


@router.get("/call_other_api")
async def call_other_api():
    other_api_url = "https://api.example.com/endpoint"  # 다른 서버의 API 엔드포인트 URL
    async with httpx.AsyncClient() as client:
        response = await client.get(other_api_url)
        response.raise_for_status()  # 요청이 성공적으로 완료되었는지 확인
        return response.json()


@router.get("/exptra_data_type/{item_id}/{type}")
async def extra_data_type(
    item_id: UUID,  # 68cae0c4-bfc4-44d4-9439-62e3ff2fb9ab
    type: Literal["aaa", "bbb"],
    start_date: datetime | None = Body(None),
    end_date: datetime | None = Body(None),
    repeat_at: time | None = Body(None),
    process_after: timedelta | None = Body(None),
):
    """
        - 여러가지 타입
    """
    start_process = start_date + process_after
    duration = end_date - start_process
    return {
        "item_id": item_id,
        "type": type,
        "start_date": start_date,
        "end_date": end_date,
        "repeat_at": repeat_at,
        "process_after": process_after,
        "start_process": start_process,
        "duration": duration,
    }


@router.get("/headers")
async def read_items(
    cookie_id: str | None = Cookie(None),
    accept_encoding: str | None = Header(None),
    sec_ch_ua: str | None = Header(None),
    user_agent: str | None = Header(None),
    x_token: list[str] | None = Header(None),
):
    return {
        "cookie_id": cookie_id,
        "Accept-Encoding": accept_encoding,
        "sec-ch-ua": sec_ch_ua,
        "User-Agent": user_agent,
        "X-Token values": x_token,
    }

```

- routers.answer_router.py
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

- schemas.py
```python
import datetime
from typing import List
from pydantic import BaseModel, Field, HttpUrl

class QuestionBase(BaseModel):
    # description : docs 의 스키마 항목에 상세설명 노출됨
    id: int = Field(..., gt=0, example="2", description="Question Id must be greater than zero.")
    subject: str | None = None
    content: str
    create_date: datetime.datetime

    # Config 클래스 내부에서 orm_mode = True로 설정하면 Pydantic 모델이 "ORM 모드"가 활성화
    # - 모델에 직접 정의되지 않은 추가 데이터를 전달할 수 있으며, Pydantic은 알려지지 않은 필드에 대해 오류를 발생시키지 않습니다
    # - ORM(예: SQLAlchemy)에서 데이터를 가져와 Pydantic 모델로 변환할 때 Pydantic이 자동으로 일치하는 속성 이름을 가진 ORM 객체를 Pydantic 모델로 변환
    class Config:
        orm_mode = True

class AnswerQuestionBase(BaseModel):
    id: int
    content: str
    create_date: datetime.datetime
    question: QuestionBase

    class Config:
        orm_mode = True

class AnswerBase(BaseModel):
    question_id: int
    content: str

    class Config:
        orm_mode = True

class Image(BaseModel):
    url: HttpUrl # url 타입
    name: str


class User(BaseModel):
    name: str
    tag: set[str] = [] # 중복 불가
    image: Image | None = None
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

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

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

    __add_middleware(application)

    __add_exception_handler(application)

    # application.add_event_handler(
    #     "startup",
    #     create_start_app_handler(application, settings),
    # )
    # application.add_event_handler(
    #     "shutdown",
    #     create_stop_app_handler(application),
    # )

    __add_router(application)


    return application

def __add_middleware(application):
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
def __add_exception_handler(application):
    application.add_exception_handler(HTTPException, http_error_handler)
    application.add_exception_handler(RequestValidationError, http422_error_handler)

def __add_router(application):
    application.include_router(question_router.router)
    application.include_router(answer_router.router)

app = get_application()
```
